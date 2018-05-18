# React #

### #组件 ###

组件可复合

原生 html 标签首字母小写，自定义 react 组件首字母大写

```javascript
import React from 'react';

class Welcome extends React.Component {
    render () {
        return (
            <h1>学习如何使用 react</h1>
        );
    }
}

export default Welcome;
```

*****

### #状态 ###

+ __State__

    ```javascript
    import React from 'react';

    var Welcome = React.createClass({
        getInitialState () {
            return {
                status: true
            }
        },
        handleClick () {
            this.setState({
                status: !this.state.status
            });
        },
        render () {
            var text = this.state.status ? '是' : '否';
            return (
                <button onClick={this.handleClick}>{text}</button>
            );
        }
    });
    
    export default Welcome;
    ```

+ __Props__

    ```javascript
    import React from 'react';

    var Child = React.createClass({
        getDefaultProps () {
            return {
                name: 'sunmy'
            }
        },
        render () {
            return (
                <h4>Hello {this.props.name}</h4>
            );
        }
    });
    
    var Parent = React.createClass({
        getInitialState () {
            return {
                name: 'yaq'
            }
        },
        render () {
            return (
                <div>
                    <Child />
                    <Child name={this.state.name} />
                </div>
            );
        }
    });
    
    export default Parent;
    ```
    
*****

### #生命周期 ###

+ __componentWillMount__

+ __componentDidMount__

    组件已生成对应的 Dom 结构，可通过 this.getDOMNode() 或 this.refs 访问。
    
+ __componentWillReceiveProps__
    
+ __shouldComponentUpdate__
    
+ __componentWillUpdate__
    
+ __componentDidUpdate__
    
+ __componentWillUnmount__
    
    组件已从 Dom 中移除，可在期间取消未完成请求。

*****

#### *JSX ####

本质为 javascript