import { combineReducers } from 'redux'
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER ,ADD_TODO_VERFIY,SUBMMIT_TODO} from '../actions'
import info from '../../abc-framework/utils/logger'

import undoable,{excludeAction} from 'redux-undo'

function reducer(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [//在Redux中加入数据，实际的显示数据
                ...state,
                {//添加的数据为text
                    text: action.text,
                    completed: false
                }
            ]
        case COMPLETE_TODO:
            return [//过滤已经完成数据
                ...state.slice(0, action.index),//索引之前的数据
                Object.assign({}, state[action.index], {
                    completed: true//完成的标记
                }),
                ...state.slice(action.index + 1)//索引之后的数据
            ]
        default:
            return state
    }
}
const undoableTodos = undoable(reducer);
// const undoableTodos  =undoable(reducer, function filterActions(action, currentState, previousState) {
//     return action.type === ADD_TODO_VERFIY; // only add to history if action is SOME_ACTION
// });
// const undoableTodos=undoable(reducer, { filter: excludeAction(ADD_TODO_VERFIY,SET_VISIBILITY_FILTER) })
export default undoableTodos
