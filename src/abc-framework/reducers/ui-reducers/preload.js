import { Preload_started, Preload_finished, Preload_failed }
	from '../../../abc-framework/react-isomorphic-render/redux'
import keys from 'lodash/keys'
Object.keys=Object.keys||keys;
const initial_state = {}

const handlers =
{
	[Preload_started]: (result, state) =>
	({
		...state,
		pending   : true,
		error     : false,
		immediate : result.immediate
	}),

	[Preload_finished]: (result, state) =>
	({
		...state,
		pending : false
	}),

	[Preload_failed]: (result, state) =>
	({
		...state,
		pending : false,
		error   : true
	})
}

// applies a handler based on the action type
// (is copy & paste'd for all action response handlers)
export default function(state = initial_state, action_data = {})
{
	const handler=(handlers[action_data.type] || ((result, state) => state));
	const args=Object.keys(action_data)&&Object.keys(action_data);
	const obj=args&args.has&&args.has('result') ? action_data.result : action_data.error || action_data;
	return (handler)(obj, state)
}