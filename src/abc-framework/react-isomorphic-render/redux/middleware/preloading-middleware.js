import { ROUTER_DID_CHANGE } from 'redux-router/lib/constants'
import { replace }           from 'redux-router'

import { location_url, locations_are_equal } from '../../location'

export const Preload_method_name  = '__react_preload__'
export const Preload_options_name = '__react_preload_options__'

const preloader = (server, components, getState, dispatch, location, parameters, preload_helpers) =>
{
	let preload_arguments = { dispatch, getState, location, parameters }

	if (preload_helpers)
	{
		preload_arguments = { ...preload_arguments, ...preload_helpers }
	}

	//
	if (!server)
	{
		let previous_route_components = getState().router.components

		while (components.length > 1 && previous_route_components[0] === components[0])
		{
			previous_route_components = previous_route_components.slice(1)
			components                = components.slice(1)
		}
	}

	// finds all `preload` (or `preload_deferred`) methods 
	// (they will be executed in parallel)
	function get_preloaders()
	{
		// find all `preload` methods on the React-Router component chain
		return components
			.filter(component => component && component[Preload_method_name])
			.map(component =>
			({
				preload: () =>
				{
					try
					{
						// `preload()` returns a Promise
						const promise = component[Preload_method_name](preload_arguments)

						if (typeof promise.then !== 'function')
						{
							return Promise.reject(`Preload function didn't return a Promise:`, preload)
						}

						return promise
					}
					catch (error)
					{
						return Promise.reject(error)
					}
				},
				options: component[Preload_options_name] || {}
			}))
	}

	// Get all `preload` methods on the React-Router component chain
	const preloads = get_preloaders()

	// Construct `preload` chain

	let chain = []
	let parallel = []

	for (let preloader of get_preloaders())
	{
		if (preloader.options.blocking === false)
		{
			parallel.push(preloader.preload)
			continue
		}

		// Copy-pasta
		if (parallel.length > 0)
		{
			parallel.push(preloader.preload)
			chain.push(parallel)
			parallel = []
		}
		else
		{
			chain.push(preloader.preload)
		}
	}

	// Copy-pasta
	if (parallel.length > 0)
	{
		chain.push(parallel.length > 1 ? parallel : parallel[0])
		parallel = []
	}

	// Convert `preload` chain into `Promise` chain

	if (chain.length === 0)
	{
		return
	}

	return function()
	{
		return chain.reduce((promise, link) =>
		{
			if (Array.isArray(link))
			{
				return promise.then(() => Promise.all(link.map(_ => _())))
			}

			return promise.then(link)
		},
		Promise.resolve())
	}
}

//preloading_middleware(server, on_preload_error, event => store.dispatch(event), preload_helpers)
/**
 function preloading_middleware(server, error_handler, dispatch_event, preload_helpers) {
	return function (_ref) {
		var getState = _ref.getState;
		var dispatch = _ref.dispatch;
		return function (next) {
			return function (action) {
			}
		}
	}
 }
 **/
export default function preloading_middleware(server, error_handler, dispatch_event, preload_helpers)
{
	return ({ getState, dispatch }) => next => action =>
	{
		// If it isn't a `redux-router` navigation event then do nothing
		if (action.type !== ROUTER_DID_CHANGE)
		{
			// Do nothing
			return next(action)
		}

		if (!server && !getState().router)
		{
			// Ignore the event
			return next(action)
		}

		// Promise error handler
		const handle_error = error => 
		{
			// If no `on_preload_error` handler was set,
			// then use default behaviour.
			if (!error_handler)
			{
				if (server)
				{
					throw error
				}

				// On the client-side outputs errors to console by default
				if(error&&error.stack){
					return console.error(error.stack || error)
				}else{
					return new Error("未知异常")
				}
			}

			// Handle the error (for example, redirect to an error page)
			error_handler(error,
			{
				url : location_url(action.payload.location),

				redirect(to)
				{
					dispatch_event(replace(to))
				},

				dispatch: dispatch_event,
				getState
			})
			if (server)
			{
				throw new Error(`"on_preload_error" must either redirect or rethrow the error`)
			}
		}

		const { components, location, params } = action.payload;

		// Preload all the required data for this route (page)
		const preload = preloader(server, components, getState, dispatch_event, location, params, preload_helpers);

		// If nothing to preload, just move to the next middleware
		if (!preload)
		{
			return next(action)
		}

		// `window.__preloading_page` holds client side page preloading status.
		// If there's preceeding navigation pending, then cancel that previous navigation.
		if (!server && window.__preloading_page && !window.__preloading_page.cancelled)
		{
			// window.__preloading_page.promise.cancel()
			window.__preloading_page.cancelled = true
		}

		// Page loading indicator could listen for this event
		dispatch_event({ type: Preload_started });

		// Holds the cancellation flag for this navigation process
		const preloading = { cancelled: false };

		// This Promise is only used in server-side rendering.
		// Client-side rendering never uses this Promise.
		const promise = 
			// preload this route
			preload()
			// proceed with routing
			.then(() =>
			{
				if (preloading.cancelled)
				{
					return
				}

				// Page loading indicator could listen for this event
				dispatch_event({ type: Preload_finished });

				next(action)
			})
			.catch(error =>
			{
				if (preloading.cancelled)
				{
					return
				}

				if (error&&error._redirect)
				{
					if (!server)
					{
						// Page loading indicator could listen for this event
						//装载结束
						dispatch_event({ type: Preload_finished });

						return dispatch_event(replace(error._redirect))
					}

					throw error
				}

				if (server)
				{
					getState().router = null
				}

				// Page loading indicator could listen for this event
				dispatch_event({ type: Preload_failed, error });

				handle_error(error)
			});


		if (!server)
		{
			// preloading.promise = promise
			window.__preloading_page = preloading
		}

		// On the server side
		if (server)
		{

			if (!getState().router)
			{
				getState().router = promise
			}
		}
	}
}

export const Preload_started  = '@@react-isomorphic-render/redux/preload started'
export const Preload_finished = '@@react-isomorphic-render/redux/preload finished'
export const Preload_failed   = '@@react-isomorphic-render/redux/preload failed'