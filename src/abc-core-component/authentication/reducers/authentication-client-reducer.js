import {LOAD} from '../actions/authentication-action'
const reducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            return {
                data: action.data
            }
        default:
            return state
    }
}

export default reducer
