import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions'
//import AddTodo from '../components/AddTodo'
//import TodoList from '../components/TodoList'
//import Footer from '../components/Footer'
import AddTodo from '../view-bootsrap/AddTodo'
import TodoList from '../view-bootsrap/TodoList'
import Footer from '../view-bootsrap/Footer'
import Header from '../view-bootsrap/Header'

// import {ListGroupItem, ListGroup,Panel} from 'react-bootstrap'
//

class AppRaw extends Component {
    //原来的没有加工过的函数
    render() {
        return (
            <div>
                <AddTodo
                    onAddClick={text =>
                         console.log('add todo', text)
                } />
                <TodoList
                    todos={[{
                        text: 'Use Redux',
                        completed: true
                    }, {
                    text: 'Learn to connect it to React',
                         completed: false
                    }]}
                    onTodoClick={todo =>
                         console.log('todo clicked', todo)
                } />
                <Footer
                    filter='SHOW_ALL'
                    onFilterChange={filter =>
                        console.log('filter change', filter)
                } />
            </div>
        );
    }

   
}

AppRaw.propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
}
export default AppRaw