import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class TodoTextInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || ''
    }
  }

  handleSubmit(e) {
    const text = e.target.value.trim();
    if (e.which === 13) {
      //调用属性的保存方法
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({ text: '' })
      }
    }
  }

  //文本输入框的值，不能用 this.props.value 读取，
  // 而要定义一个 onChange 事件的回调函数，通过 event.target.value 读取用户输入的值。
  // textarea 元素、select元素、radio元素都属于这种情况
  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  handleBlur(e) {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value)
    }
  }

  render() {
    return (
      <input className={
        classnames({
          edit: this.props.editing,
          'new-todo': this.props.newTodo
        })}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus="true"
        value={this.state.text}
        onBlur={this.handleBlur.bind(this)}
        onChange={this.handleChange.bind(this)}
        onKeyDown={this.handleSubmit.bind(this)} />
    )
  }
}
//组件属性
/**
 * 当新建时，newTodo、placeholder
 * 当编辑时，text、editing
 * @type {{onSave: *, newTodo: *, placeholder: *, text: *, editing: *}}
 */
TodoTextInput.propTypes = {
  onSave: PropTypes.func.isRequired,//传入事件，用于向上绑定
  newTodo: PropTypes.bool,//是否为newTodo
  placeholder: PropTypes.string,//传入名称
  text: PropTypes.string,
  editing: PropTypes.bool,

};

export default TodoTextInput
