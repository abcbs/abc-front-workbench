import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {//设置编辑默认为false
      editing: false
    }
  }
  //双击动作
  handleDoubleClick() {
    //设置编辑为true
    this.setState({ editing: true })
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo(id, text)
    }
    this.setState({ editing: false })
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props;

    let element;
    //如果是编辑是则构建新的TodoTextInput
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                         editing={this.state.editing}
                         onSave={
                             (text) => this.handleSave(todo.id, text)
                         }
        />
      )
    } else {
      element = (//列表行中的checkbox
        <div className="view">
          <input className="checkbox"
                 type="checkbox"
                 checked={todo.completed}
                 onChange={
                    () => completeTodo(todo.id)
                 }
          />
          {/*双击动作*/}
          <label
              /**
              * 双击动作
              */
              onDoubleClick={
                  this.handleDoubleClick.bind(this)
              }
          >
            {todo.text}
          </label>
          <button className="destroy"
                  onClick={
                    () => deleteTodo(todo.id)
                  }
          />
        </div>
      )
    }

    return (
      <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
};

export default TodoItem
