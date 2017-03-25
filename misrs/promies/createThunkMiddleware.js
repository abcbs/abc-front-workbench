function dispatch() {
    console.log("dispatch");
}

function extraArgument(){
    console.log("extraArgument");
}
function next(action) {
    console.log("next");
    return action;
}
function  action(dispatch, initState,extraArgument) {
    console.log("action,state",initState);
    dispatch();
    extraArgument();
}

function createThunkMiddleware(extraArgument) {
    return function (_ref) {
        var dispatch = _ref.dispatch;
        var getState = _ref.getState;
        return function (next) {
            return function (action) {
                if (typeof action === 'function') {
                    return action(dispatch, getState, extraArgument);
                }
                return next(action);
            };
        };
    };
}

//Thunk化
var thunk_extraArgument = createThunkMiddleware(extraArgument);
var thunk_dispatch=thunk_extraArgument({dispatch:dispatch,getState:"initState"});
var thunk_next=thunk_dispatch(next) ;
var thunk_action=thunk_next("action") ;
createThunkMiddleware(extraArgument)({dispatch:dispatch,getState:"initState"})(next)(action);
