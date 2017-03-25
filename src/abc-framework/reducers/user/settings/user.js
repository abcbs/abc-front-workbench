import { asynchronous_handler } from '../../reduxtools'
import keys from 'lodash/keys'

Object.keys=Object.keys||keys;

const initial_state = {}

const handlers = asynchronous_handler
({
	event  : 'user settings: get user',
	result : 'user'
},
{
	event  : 'user settings: load advanced settings'
},
{
	event  : 'user settings: get user authentication tokens',
	result : 'authentication_tokens'
},
{
	event  : 'user settings: check password'
},
{
	event  : 'user settings: change email',
	result : (result, state) =>
	({
		...state,
		user:
		{
			...state.user,
			email : result
		}
	})
},
{
	event  : 'user settings: change alias',
	result : (result, state) =>
	({
		...state,
		user:
		{
			...state.user,
			alias : result
		}
	})
})

// applies a handler based on the action type
// (is copy & paste'd for all action response handlers)
export default function(state = initial_state, action_data = {})
{
	const handler=(handlers[action_data.type] || ((result, state) => state));
	const args=Object.keys(action_data)&&Object.keys(action_data);
	const obj=args&args.has&&args.has('result') ? action_data.result : action_data.error || action_data;
	return (handler)(obj, state)
}