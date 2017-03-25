import React from 'react'
import { ReduxRouter, replace } from 'redux-router'
import { RouterContext, applyRouterMiddleware, match } from 'react-router'
import use_scroll from 'react-router-scroll'

import react_render_on_client from '../../render-on-client'

import { location_url } from '../../location'

export default function render_on_client({ development, devtools, create_page_element, create_routes, store, to })
{
	return match_react_router({ history: store.history,
		routes: create_routes(store), transition_manager: store.transitionManager })
		.then(({ redirect, router_props }) =>
		{
			// console.log("redux-client-render match_react_router" +
			// 	"======================================LiuJQ")
			if (redirect)
			{
				store.dispatch(replace(location_url(redirect)))
				return
			}
			//redux 修改历史
			const router_element = <ReduxRouter {...router_props}
				RoutingContext={applyRouterMiddleware(use_scroll())}/>

			return create_page_element(router_element, { store }).then(element =>
			{
				// Render the wrapped React page element to DOM
				const component = react_render_on_client
				({
					development, // development mode flag
					element,     // wrapped React page element
					to           // DOM element containing React markup
				})
				.component

				const result =
				{
					component,
					store
				}

				if (!development || !devtools || window.devToolsExtension)
				{
					return result
				}

				const DevTools = devtools.component

				element = 
				(
					<div>
						{element}
						{/* Since `DevTools` are inserted outside of the `<Provider/>`, provide the `store` manually */}
						<DevTools store={store}/>
					</div>
				)

				// Render the wrapped React page element to DOM
				result.component = react_render_on_client
				({
					development, // development mode flag
					element,     // wrapped React page element
					to,          // DOM element containing React markup
					subsequent_render: true // Prevents "Server-side React render was discarded" warning
				})
				.component

				return result
			})
		})
}

function match_react_router({ history, routes, transition_manager })
{
	return new Promise((resolve, reject) =>
	{
		// Get `location` from `history`
		// console.log("redux-client-match_react_router Promise" +
		// 	"======================================LiuJQ")
		let location
		const unlisten = history.listen(historyLocation => location = historyLocation)

		// Match `location` to a route (`<Route/>`s)
		transition_manager.match(location, (error, redirect_location, next_router_state) =>
		{
			if (error)
			{
				return reject(error)
			}

			if (redirect_location)
			{
				return resolve({ redirect: redirect_location })
			}

			resolve({ router_props: next_router_state })

			unlisten()
		})
	})
}