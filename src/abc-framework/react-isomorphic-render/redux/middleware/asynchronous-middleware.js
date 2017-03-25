import { exists, is_object } from '../../helpers'

export default function asynchronous_middleware(http_client, 
												dispatch_event, { promise_event_naming })
{
	return ({ dispatch, getState }) =>
	{
		return next => action =>
		{
			//异步操作
			let { promise, event, events, ...rest } = action
			//非异步处理
			if (!promise)
			{
				return next(action)
			}

			if (typeof promise !== 'function')
			{
				throw new Error(`"promise" property must be a function returning a promise`)
			}

			//事件解析过程
			if (typeof event === 'string')
			{
				events = promise_event_naming(event)
			}

			// 事件长度检查
			if (!events || events.length !== 3)
			{
				throw new Error(`"events" property must be an array of events: e.g. ['pending', 'success', 'error']`)
			}

			//异步处理事件
			const [Request, Success, Failure] = events

			// dispatch the `pending` event to the Redux store
			dispatch_event({ ...rest, type: Request })

			// perform Http request
			const promised = promise(http_client)

			//异步执行必须是Promise
			if (!promised || typeof promised.then !== 'function')
			{
				throw new Error(`"promise" function must return a Promise. Got:`, promised)
			}

			return promised.then
			(
				result =>
				{
					//发送成功事件
					dispatch_event
					({
						...rest,
						result,
						type : Success
					})

					// the Promise returned from `dispatch()` is resolved
					return result
				},
				error =>
				{
					if (error&&error._redirect)
					{
						throw error
					}

					let error_data={};
					if(error&&error.data){
					 	error_data = is_object(error.data) ? error.data : {}
					}
					if (error_data.message&&!exists(error_data.message))
					{
						error_data.message = error.message
					}

					if (error_data.status&&!exists(error_data.status))
					{
						error_data.status = error.status
					}

					//异常码
					dispatch_event
					({
						...rest,
						error : error_data,
						type  : Failure
					})

					// the Promise returned from `dispatch()` is rejected
					throw error
				}
			)
		}
	}
}