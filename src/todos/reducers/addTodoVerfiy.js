import { ADD_TODO_VERFIY } from '../actions'

const addTodoVerfiy = (state = '', action) => {
    switch (action.type) {
        case 'ADD_TODO_VERFIY':
            return action;
        default:
            return state
    }
}

export default addTodoVerfiy
