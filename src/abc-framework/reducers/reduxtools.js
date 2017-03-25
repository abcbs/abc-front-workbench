// For each handler description, adds reducers for:
//
//   * "[event]: pending"
//   * "[event]: done"
//   * "[event]: failed"
//   * "[event]: reset error"
//
/**
 * Action:
 * 		action:user profile: get latest activity time
 * Reducer:
 * {
 *	event  : 'user profile: get latest activity time',
 *	result : 'latest_activity_time'
 *}
 * @param handlers
 * @returns {{}}
 */
//

export function asynchronous_handler(...handlers)
{
	//profile-reducer解析
	//handlers数据来自profile文件
	const _handlers = {}
	//一个一个处理
	for (let handler of handlers)
	{
		//示例数据
		// event: "user profile: get user", result: "user"

		//pop() 方法将删除 arrayObject 的最后一个元素，把数组长度减 1，并且返回它删除的元素的值。
		// 如果数组已经为空，则 pop() 不改变数组，并返回 undefined 值。
		const event_name_parts = handler.event.split(': ');//["user profile", "get user"]
		//获取最后一个,为方法名，即执行的事件
		const name = event_name_parts.pop();//"get user" 	event_name_parts=["user profile"]
		//其它的为命名空间,event_name_parts获取方法名称之后，以:为连接符连接
		const namespace = event_name_parts.join(': ');// namespace = "user profile", event_name_parts = ["user profile"]

		_asynchronous_hander(_handlers, namespace, name, handler.result)
		//第一次执行完毕_handlers值为:
		//user profile: get user: pending=function(result, state)
		//user profile: get user: done=function(result, state)
		//user profile: get user: failed=function(error, state)
		//user profile: get user: reset error=function(result, state)
	}

	return _handlers
}

// Adds reducers for:
//
//   * "[event]: pending"
//   * "[event]: done"
//   * "[event]: failed"
//   * "[event]: reset error"
//
function _asynchronous_hander(handlers, namespace, event, on_result)
{
	//
	//\s匹配空格， 匹配一个空白字符，包括\n,\r,\f,\t,\v等
	//g是全文查找所有匹配
	//如果event即方法名称中有空白，则替换为_
	const base = event.replace(/\s/g, '_')

	// When Promise is created,
	// clear `error`,
	// set `pending` flag.设置等候标志
	handlers[`${namespace}: ${event}: pending`] = (result, state) =>
	({
		...state,
		[`${base}_pending`] : true,
		[`${base}_error`]   : undefined
	})

	// When Promise succeeds
	handlers[`${namespace}: ${event}: done`] = (result, state) =>
	{
		// This will be the new Redux state
		let new_state

		// If `on_result` is a reducer, then call it,
		// and the returned object will be the new state.
		if (typeof on_result === 'function')
		{
			new_state = on_result(result, state)

			// If the reducer function didn't return
			// the new state (which it should have done),
			// then create the new state manually.
			if (new_state === state)
			{
				new_state = { ...state }
			}
		}
		else
		{
			new_state = { ...state }

			// If `on_result` is a property name,
			// then just set that property to the value of `result`.
			if (typeof on_result === 'string')
			{
				new_state[on_result] = result
			}
		}

		// Clear `pending` flag
		new_state[`${base}_pending`] = false

		// Return the new Redux state
		return new_state
	}

	// When Promise fails,
	// clear `pending` flag,
	// set `error`.
	handlers[`${namespace}: ${event}: failed`] = (error, state) =>
	({
		...state,
		[`${base}_pending`] : false,
		[`${base}_error`]   : error
	})

	// Clears `error`
	handlers[`${namespace}: ${event}: reset error`] = (result, state) =>
	({
		...state,
		[`${base}_error`] : undefined
	})
}

// // A helper for creating Redux actions with Promises
// export function asynchronous(create_promise, event)
// {
// 	return function(...parameters)
// 	{
// 		const action =
// 		{
// 			promise : create_promise.apply(this, parameters),
// 			event
// 		}
//
// 		return action
// 	}
// }