const initial_state =
{
    loaded: false
}

const handlers =
{

    //检索权限
    'retrieving authenication': (result, state) =>
        ({
            ...state,
            loading       : true,
            loading_error : undefined
        }),

    'authenication retrieved': (result, state) =>
        ({
            ...state,
            loading : false,
            loaded  : true,
            users   : result
        }),

    'authenication retrieval failed': (error, state) =>
        ({
            ...state,
            loading       : false,
            loading_error : error
        }),

    //添加权限
    //events: ['adding user', 'user added', 'adding user failed']
    'adding authenication': (result, state) =>
        ({
            ...state,
            adding : true
        }),

    'authenication added': (result, state) =>
        ({
            ...state,
            adding : false
        }),

    'adding authenication failed': (error, state) =>
        ({
            ...state,
            adding       : false,
            adding_error : error
        }),

    //events: ['deleting user', 'user deleted', 'deleting user failed']
    'deleting authenication': (result, state) =>
        ({
            ...state,
            deleting : true
        }),

    'authenication deleted': (result, state) =>
        ({
            ...state,
            deleting : false
        }),

    'deleting authenication failed': (error, state) =>
        ({
            ...state,
            deleting       : false,
            deleting_error : error
        }),

    'renaming authenication': (result, state) =>
        ({
            ...state,
            renaming : true
        }),

    'authenication renamed': (result, state) =>
        ({
            ...state,
            renaming : false
        }),

    'renaming authenication failed': (error, state) =>
        ({
            ...state,
            renaming       : false,
            renaming_error : error
        }),


}

export default function(state = initial_state, action_data = {})
{
    //如果有处理Action的函数则使用它，否则使用默认的函数 ((result, state) => state)
    const handler=(handlers[action_data.type] || ((result, state) => state));
    //获取action的key，即属性，其结果为['type','payload']
    const args=action_data&&Object.keys(action_data);
    //如果args含有result，则获取result；否则获取错误信息，如果上述两者都不是则把action作为输入
    const obj=args&args.has&&args.has('result') ? action_data.result : action_data.error || action_data;
    //Redux处理数据的范式为
    //        (state,action)=>state
    //return {
    //	type: 'ADD_TODO',
    //	text
    //}
    return (handler)(obj, state)
}
