import React ,{PropTypes}from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//
import { defineMessages }              from 'react-intl'
import international from '../../abc-framework/international/internationalize'
import container from '../../abc-framework/ui/AbcContainerPage'

import { addTodo, completeTodo, setVisibilityFilter,
    VisibilityFilters,addTodoVerfiy ,ADD_TODO,SUBMMIT_TODO,submmitTodo} from '../actions'
//import AddTodo from '../components/AddTodo'
//import TodoList from '../components/TodoList'
//import Footer from '../components/Footer'

import AddTodo from '../view-bootsrap/AddTodo'
import TodoList from '../view-bootsrap/TodoList'
import Footer from '../view-bootsrap/Footer'
import UndoRedoUtil from './UndoRedo'
import {visibleTodosSelector} from '../selectors/TodoSelectors'


import AbcPage from '../../abc-framework/ui/AbcContainerFramePage'

//
const messages = defineMessages
({
        title:
        {
            id             : 'main.title',
            description    : '新增产品',
            defaultMessage : '新增产品'
        },
        subTitle:
        {
            id             : 'main.subTitle',
            description    : '新增产品',
            defaultMessage : '新增产品，可以撤销'
        }
    }
)

function mapStateToProps(state,props) {
    return {
        visibleTodos:visibleTodosSelector(state, props)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addTodoAction:bindActionCreators(addTodo, dispatch),
        //绑定具体的处理方法，此方法在Todo中为真正的删除处理事件，它使用的动作为completeTodo
        //而它使用的动作为completeTodo的数据为索引index
        completeTodoAction:bindActionCreators(completeTodo, dispatch),
        setVisibilityFilterAtion:bindActionCreators(setVisibilityFilter, dispatch),
    };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
@connect(mapStateToProps,mapDispatchToProps)
@international()
@container({title:messages.title, subTitle:messages.subTitle})
export default class App extends React.Component {
    render() {
        // Injected by connect() call:
        const { dispatch, visibleTodos, visibilityFilter ,
            addTodoAction,verfiedResult,addTodoVerfiyAction,
            completeTodoAction,setVisibilityFilterAtion,
            submitResult,submmitTodoAction
        } = this.props;
        return (
            <div>
                <AddTodo
                    onAddClick={addTodoAction} 
                    onAddTodoVerfiy={addTodoVerfiyAction}
                    // verfiedResult={verfiedResult}
                    submitResult={submitResult}
                    submmitTodo={submmitTodoAction}
                    />
                 <UndoRedoUtil/>
                
                 <TodoList
                        todos={visibleTodos}
                        onTodoClick={completeTodoAction} />
                <Footer
                    filter={visibilityFilter}
                    onFilterChange={setVisibilityFilterAtion} />
             </div>

        )
    }
}

App.propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired),
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]),
};

