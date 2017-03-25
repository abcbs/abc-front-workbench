import React, { findDOMNode, Component,PropTypes  } from 'react';
// import {ListGroupItem, ListGroup,ControlLabel,HelpBlock,Checkbox,FormGroup} from '../../abc-bootstrap'
// import '../../../resource/styles/css/index.css'
import AbcContainer from '../../abc-framework/ui/AbcContainerWrape'
import Todo from './Todo'
import list from '../../abc-framework/ui/AbcList'

 @list()
export default class TodoList extends Component {
    constructor(props, context) {
        super(props, context);
        this.idx=1;
    }
    handleTodo=
            (index) => this.props.onTodoClick(index);

    render() {
        return (
          <div>
                {this.props.todos&&this.props.todos.map&&this.props.todos.map((todo, index) =>
                    <li key={this.idx++}>
                        <input type="checkbox" />
                        <Todo {...todo}
                            key={this.idx++}
                            onClick={() => this.props.onTodoClick(index)} />
                    </li>
                )}
          </div>
        )
    }

     // render() {
     //     require('../../../resource/styles/css/index.css');
     //     return (
     //         <ListGroup className="todo-list" componentClass="ul" >
     //             {this.props.todos&&this.props.todos.map&&this.props.todos.map((todo, index) =>
     //                 <li key={this.idx++}>
     //                     <input type="checkbox" />
     //                     <Todo {...todo}
     //                         key={this.idx++}
     //                         onClick={() => this.props.onTodoClick(index)} />
     //                 </li>
     //             )}
     //         </ListGroup>
     //     )
     // }
}

TodoList.propTypes = {
    onTodoClick: PropTypes.func.isRequired,
     todos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired

    //todos: PropTypes.array.isRequired,
}