const initial_state = {}
import keys from 'lodash/keys'
Object.keys=Object.keys||keys;
const handlers =
{
	'snack': (result, state) =>
	({
		...state,
		snack : typeof result.snack === 'string' ? { text: result.snack } : result.snack
	}),

	'snack: reset': (result, state) =>
	({
		...state,
		snack : undefined
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