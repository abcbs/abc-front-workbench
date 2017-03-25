import { asynchronous_handler } from './reduxtools'
import keys from 'lodash/keys'
Object.keys=Object.keys||keys;

const initial_state = {}

const handlers = asynchronous_handler
(
{
	event  : 'user: sign in',
	// result : 'user'
},
{
	event  : 'user: sign out',
	// result : (result, state) => ({ ...state, user: undefined })
},
{
	event  : 'user: register'
})
//
// Updates user picture in the user bar when it is changed on the profile page
handlers['user: update user picture: done'] = (result, state) =>
({
	...state,
	user:
	{
		...state.user,
		picture: result.id,
		picture_sizes: result.sizes
	}
})

// Updates alias in the profile link in the user bar
// when it is changed on the settings page
handlers['user settings: change alias: done'] = (result, state) =>
({
	...state,
	user:
	{
		...state.user,
		alias: result
	}
})

// Updates user name in the user bar when it is changed on the profile page
handlers['user profile: update user info: done'] = (result, state) =>
({
	...state,
	user:
	{
		...state.user,
		name : result.name
	}
})

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