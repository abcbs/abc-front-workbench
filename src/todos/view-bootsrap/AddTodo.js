import React, { findDOMNode, Component, PropTypes } from 'react';

import TodoDetail from './TodoDetail'
import TodoEvent from '../view-bootsrap/TodoEvent'

//使用事件监听方式实现组件中的消息传递
var EventEmitter = require('events').EventEmitter;
var enentEmitter=new EventEmitter;
import info from '../../abc-framework/utils/logger'
export default class AddTodo extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const {todos ,onAddClick
             // ,onAddTodoVerfiy,verfiedResult,
            // submitResult,submmitTodo,...other
        } = this.props;
        return (
            <div>
                <TodoDetail  other
                             onAddClick={onAddClick}
                             formName="添加详细"
                             enentEmitter={enentEmitter}
                             // onAddTodoVerfiyClick={onAddTodoVerfiy}
                             // verfiedResult={verfiedResult}

                />
                <TodoEvent  onAddClick={onAddClick}
                            // onAddTodoVerfiyClick={onAddTodoVerfiy}
                            onAddBtnName="确定" enentEmitter={enentEmitter}
                            // submitResult={submitResult}  submmitTodo={submmitTodo}
                />
            </div>
        );
    }
}

AddTodo.propTypes = {
    onAddClick: PropTypes.func.isRequired,
    // onAddTodoVerfiy: PropTypes.func.isRequired,
    // verfiedResult:PropTypes.string,
    // submitResult:PropTypes.string,
    // submmitTodo:PropTypes.func

}