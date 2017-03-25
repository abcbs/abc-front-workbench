const initial_state = { userAgent: undefined }
import keys from 'lodash/keys'
Object.keys=Object.keys||keys;
const handlers = {}

export default function(state = initial_state, action_data = {})
{
	const handler=(handlers[action_data.type] || ((result, state) => state));
	const args=Object.keys(action_data)&&Object.keys(action_data);
	const obj=args&args.has&&args.has('result') ? action_data.result : action_data.error || action_data;
	return (handler)(obj, state)
}