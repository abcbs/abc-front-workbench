import { ROUTER_DID_CHANGE } from 'redux-router/lib/constants'

import { locations_are_equal } from '../../location'

// Implements `react-router`s `onUpdate` handler
export default function on_route_update_middleware(navigation_performed)
{
	return ({ dispatch, getState }) =>
	{
		return next => action =>
		{
			// If it isn't a `redux-router` navigation event then do nothing
			if (action.type !== ROUTER_DID_CHANGE)
			{
				// Do nothing
				return next(action)
			}

			// on the server side "getState().router" is
			// either `undefined` (in case of no `@preload()`)
			// or a Promise (in case of `@preload()`)
			const is_server_side = !getState().router
				|| (getState().router && typeof getState().router.then === 'function')

			if (is_server_side)
			{
				return next(action)
			}
			if (locations_are_equal(action.payload.location, getState().router.location))
			{
				return next(action)
			}

			// Fire `onUpdate` handler
			navigation_performed(action.payload.location)
			// Proceed as usual
			next(action)
		}
	}
}