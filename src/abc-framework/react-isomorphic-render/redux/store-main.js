import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerStateReducer } from 'redux-router'
// import { createRoutes } from 'react-router/lib/RouteUtils'
import { useBasename } from 'history'
//三个中间件
import asynchronous_middleware from './middleware/asynchronous-middleware'
import preloading_middleware from './middleware/preloading-middleware'
import on_route_update_middleware from './middleware/on-route-update-middleware'
import clientMiddleware from '../../middleware/clientMiddleware'
// import use_scroll from 'scroll-behavior'
/**
 * 路由组件、历史组件、应用Reduce，
 * 最后一个参数为必可选项，这些选项包括
 */
export default function create_store(reduxReactRouter, createHistory, get_reducer,
	{   development,//开发选项 
		devtools, //开发工具
		server, //是否为服务端端标记
		data, //初始化数据
		create_routes, //路由
		http_client,//http操作
		promise_event_naming, //装载组件
		on_preload_error, //装载错误处理
		middleware,//中间件
		on_store_created, //Hot替换
		preload_helpers, 
		on_navigate, 
		history_options 
	})
{

	if (!promise_event_naming)
	{
		//event   : 'user settings: change password: change password'
		promise_event_naming = event_name =>
			[`${event_name}: pending`, `${event_name}: done`, `${event_name}: failed`]
	}

	// Redux store enhancers
	const store_enhancers = []

	// User may supply his own middleware
	if (middleware)
	{
		const middleware_list = middleware([])
		if (middleware_list.length > 0)
		{
			store_enhancers.push(applyMiddleware(...middleware_list))
		}
	}

	const middlewares =
	[
		clientMiddleware(http_client),
		asynchronous_middleware(http_client, event => store.dispatch(event), { promise_event_naming }),
		preloading_middleware(server, on_preload_error, event => store.dispatch(event), preload_helpers)
	]

	if (on_navigate)
	{
		middlewares.push
		(
			on_route_update_middleware(on_navigate)
		)
	}

	store_enhancers.push
	(	//构建路由
		reduxReactRouter
		({
			getRoutes : create_routes,
			createHistory: (...parameters) =>
			{
				return useBasename(createHistory)({ ...parameters, ...history_options })
			}
		}),
		applyMiddleware(...middlewares)
	)

	// Add Redux DevTools (if they're enabled)
	if (development && !server && devtools)
	{
		store_enhancers.push
		(
			// Provides support for DevTools
			window.devToolsExtension ? window.devToolsExtension() : devtools.component.instrument(),
			// Lets you write ?debug_session=<name> in address bar to persist debug sessions
			devtools.persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
		)
	}

	const overall_reducer = () =>
	{
		//获取配置中的reduceres
		const reducers = get_reducer();
		//创建状态管理
		reducers.router = routerStateReducer
		return combineReducers(reducers)
	}

	// create Redux store 
	// with the overall Redux reducer 
	// and the initial Redux store data (aka "the state")
	//构建store
	const store = compose(...store_enhancers)(createStore)(overall_reducer(), data)
	if (server)
	{
		const redirect = (url) =>
		{
			if (!url)
			{
				throw new Error(`"url" parameter is required for redirect`)
			}

			// If it's a relative URL, then prepend `history` `basename` to it
			if (url[0] === '/' && history_options && history_options.basename)
			{
				url = history_options.basename + url
			}

			const error = new Error(`Redirecting to ${url} (this is not an error)`)
			error._redirect = url
			throw error
		}

		store.history.replace = redirect
		store.history.push    = redirect
	}

	if (on_store_created)
	{
		on_store_created
		({
			reload_reducer: () => store.replaceReducer(overall_reducer())
		})
	}
	return store
}
