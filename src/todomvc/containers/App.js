import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../reducers/todos'

import international from '../../abc-framework/international/internationalize'
import container from '../../abc-framework/ui/AbcContainerPage'
import { defineMessages }              from 'react-intl'
//
const messages = defineMessages
({
      title:
      {
        id             : 'main.title',
        description    : 'Todos',
        defaultMessage : 'product'
      },
      subTitle:
      {
        id             : 'main.subTitle',
        description    : 'Mvc',
        defaultMessage : '新增产品，可以撤销'
      }
    }
)
@international()
@container({title:messages.title, subTitle:messages.subTitle})
class App extends Component {
  render() {
    {/*
    其中todos为数据，
      actions为执行的动作，action为具体的动作，以(type,data)方式处理

    */}
    const { todosmvn, actions } = this.props;
    return (
      <div>
        {
          //设置属性值
          //
          }
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todosmvn} actions={actions} />
      </div>
    )
  }
}

//组件的属性可以接受任意值，字符串、对象、函数等等都可以。
//有时，我们需要一种机制，验证别人使用组件时，提供的参数是否符合要求。
App.propTypes = {
  todosmvn: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//将state.todos绑定到props的todos
function mapStateToProps(state) {
  return {
    todosmvn: state.todosmvn
  }
}

function mapDispatchToProps(dispatch) {
  return {//把所有的Action注册到Redux中
    actions: bindActionCreators(TodoActions, dispatch)
  }
}
//绑定属性和动作
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
