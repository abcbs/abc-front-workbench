import React, { Component, PropTypes } from 'react';
var idx=0;
export default class Todo extends Component {
  render() {
    return (

        <span
            key={idx++}
            onClick={this.props.onClick}
            style={{
                textDecoration: this.props.completed ? 'line-through' : 'none',
                cursor: this.props.completed ? 'default' : 'pointer'
        }}>
            
            <label className="control-label">{this.props.text}</label>
        </span>
    );
  }
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
};