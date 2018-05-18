import React from 'react'
import Matters from './components/Matters.jsx'
import storage from './storage'

var App = React.createClass({
    render () {
        return (
            <template>
                <h1>TODOS</h1>
                <section className="todos-mn">
                    <div className="todos-input">
                        <input type="text" placeholder="请输入... 敲击回车添加待办事项" onKeyDown={this.addTodo} />
                    </div>
                    <Matters todos={this.state.todos} reRender={this.reRender} />
                </section>
                <section className="todos-ctrls">
                    <a href="javascript:;" onClick={this.clearDone}>clearDone</a>
                    <a href="javascript:;" onClick={this.clearAll}>clearAll</a>
                </section>
            </template>
        );
    },
    getInitialState () {
        return {
            todos: storage.get()
        }
    },
    reRender (data) {
        this.setState(data);
    },
    addTodo (obj) {
        var event = obj.nativeEvent;
        var target = event.target;
        var value = target.value;
        if (event.keyCode == 13 && value) {
            var todos = this.state.todos;
            todos.push({
                content: value,
                status: 'todo'
            });
            this.setState({
                todos: todos
            });
            storage.update(todos);
            target.value = '';
        }
    },
    clearAll () {
        this.setState({
            todos: []
        });
        storage.update([]);
    },
    clearDone () {
        var result = [];
        var todos = this.state.todos;
        for (let i = 0;i < todos.length;i++) {
            (todos[i].status == 'todo') && result.push(todos[i]);
        }
        this.setState({
            todos: result
        });
        storage.update(result);
    }
});

export default App;
