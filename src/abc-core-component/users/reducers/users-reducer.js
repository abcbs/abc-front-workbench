const initial_state =
{
	loaded: false
}

const handlers =
{
	//events: ['retrieving users', 'users retrieved', 'users retrieval failed']
	'retrieving users': (result, state) =>
	({
		...state,
		loading       : true,
		loading_error : undefined
	}),

	'users retrieved': (result, state) =>
	({
		...state,
		loading : false,
		loaded  : true,
		users   : result
	}),

	'users retrieval failed': (error, state) =>
	({
		...state,
		loading       : false,
		loading_error : error
	}),

	//events: ['adding user', 'user added', 'adding user failed']
	'adding user': (result, state) =>
	({
		...state,
		adding : true
	}),

	'user added': (result, state) =>
	({
		...state,
		adding : false
	}),

	'adding user failed': (error, state) =>
	({
		...state,
		adding       : false,
		adding_error : error
	}),

	//events: ['deleting user', 'user deleted', 'deleting user failed']
	'deleting user': (result, state) =>
	({
		...state,
		deleting : true
	}),

	'user deleted': (result, state) =>
	({
		...state,
		deleting : false
	}),

	'deleting user failed': (error, state) =>
	({
		...state,
		deleting       : false,
		deleting_error : error
	}),

	//events: ['renaming user', 'user renamed', 'renaming user failed']
	'renaming user': (result, state) =>
	({
		...state,
		renaming : true
	}),

	'user renamed': (result, state) =>
	({
		...state,
		renaming : false
	}),

	'renaming user failed': (error, state) =>
	({
		...state,
		renaming       : false,
		renaming_error : error
	}),

	//
	'uploading user picture': (result, state) =>
	({
		...state,
		uploading_picture: true
	}),

	'user picture uploaded': (result, state) =>
	{
		const new_state = 
		{
			...state,
			uploading_picture: false
		}

		// Change the `picture` for the specified `user_id`
		new_state.users.filter(user => user.id === result.user_id)[0].picture = result.picture

		return new_state
	},

	'uploading user picture failed': (error, state) =>
	({
		...state,
		uploading_picture       : false,
		uploading_picture_error : error
	})
}

// for this module to work should be added to model/index.js
export default function(state = initial_state, action_data = {})
{
	const handler=(handlers[action_data.type] || ((result, state) => state));
	const args=Object.keys(action_data)&&Object.keys(action_data);
	const obj=args&args.has&&args.has('result') ? action_data.result : action_data.error || action_data;
	return (handler)(obj, state)
}