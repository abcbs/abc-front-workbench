import React from 'react'
import ReactDOM from 'react-dom'

import Http_client from '../../http-client-main'
import localize_and_render, { authentication_token as get_authentication_token } 
	from '../../client'

import render_on_client from './render-redux-router'
import create_store from './store'
import { normalize_common_options } from '../normalize'
import set_up_http_client from '../http-client'

// Performs client-side rendering
export default function render({ development, devtools, translation }, common)
{
	//配置信息
	// console.log("redex-client-render 入口" +
	// 	" ======================================LiuJQ")
	common = normalize_common_options(common)

	let authentication_token = get_authentication_token()

	// `http` utility can be used inside Redux action creators
	const http_client = new Http_client
	({
		format_url  : common.http && common.http.url,
		parse_dates : common.parse_dates,
		authentication_token,
		authentication_token_header:
			common.authentication ? common.authentication.header : undefined
	})

	// Erase the local variable too
	authentication_token = undefined
	// create ("rehydrate") Redux store
	const store = create_store(common.get_reducer,
	{//第二个参数
		development,
		devtools,
		middleware           : common.redux_middleware,
		on_store_created     : common.on_store_created,
		promise_event_naming : common.promise_event_naming,
		on_preload_error     : common.preload && common.preload.catch,
		preload_helpers      : common.preload && common.preload.helpers,
		create_routes        : common.create_routes,//必须传入
		on_navigate          : common.on_navigate,//
		history_options      : common.history,
		data                 :  window._flux_store_data,
		http_client
	})

	delete window._flux_store_data
	set_up_http_client(http_client,
	{
		store,
		on_before_send : common.http && common.http.request
	})
	//本地化与展现
	return localize_and_render
	({
		development,
		translation,
		wrapper: common.wrapper,
		render_on_client,//本目录下render方法
		render_parameters: { devtools, create_routes: common.create_routes, store }
	})
}