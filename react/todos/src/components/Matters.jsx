import React from 'react'
import storage from '../storage'

var Matters = React.createClass({
    render () {
        var _this = this;
        return (
            <ul className="todos-lst">
                {
                    _this.props.todos.map(function (info, index) {
                        return (
                            <li className={info.status} data-index={index}>
                                <span onClick={_this.switchStatus}></span>
                                {info.content}
                                <span className="c-hidden" onClick={_this.deleteTodo}>删除</span>
                            </li>
                        );
                    })
                }
            </ul>
        );
    },
    switchStatus (obj) {
        var target = obj.nativeEvent.target;
        var parent = target.parentElement;
        var index = parent.getAttribute('data-index');
        var todos = this.props.todos;
        var status =
            (todos[index].status == 'done')
                ? 'todo'
                : 'done';
        todos[index].status = status;
        this.props.reRender({
            todos: todos
        });
        storage.update(todos);
    },
    deleteTodo (obj) {
        var target = obj.nativeEvent.target;
        var parent = target.parentElement;
        var index = parent.getAttribute('data-index');
        var todos = this.props.todos;
        todos.splice(index, 1);
        this.props.reRender({
            todos: todos
        });
        storage.update(todos);
    }
});

export default Matters;
