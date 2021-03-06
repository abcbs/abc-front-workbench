import koa from 'koa'

import render_page from './render-config'
import { get_preferred_locales } from './locale'
import render_stack_trace from './html-stack-trace'
import { normalize_common_options } from '../redux/normalize'

import timer from '../timer'

export default function start_webpage_rendering_server(options, common)
{
	// In development mode errors are printed as HTML, for example
	const development = process.env.NODE_ENV !== 'production'

	common = normalize_common_options(common)

	const
	{
		assets,
		localize,
		application,
		authentication,
		render,
		loading,
		stats,

		// Legacy 4.x API support
		head,
		body,
		body_start,
		body_end,
		style
	}
	= options

	// Legacy 7.x API support.
	// (will be removed later)
	const initialize = options.initialize || options.preload

	// Legacy 7.x API support.
	// (will be removed later)
	const error_handler = options.catch

	// Legacy 4.x API support
	const html = options.html ||
	{
		head,
		body,
		body_start,
		body_end,
		style
	}

	const web = new koa()

	// Handles errors
	web.use(async (ctx, next) =>
	{
		try
		{	//等待下一个
			await next()
		}
		catch (error)
		{
			// if the error is caught here it means that `catch` (`error_handler`) didn't resolve it
			// (or threw it)

			// show error stack trace in development mode for easier debugging
			if (development)
			{
				try
				{
					const { response_status, response_body } = render_stack_trace(error, options.print_error)

					if (response_body)
					{
						ctx.status = response_status || 500
						ctx.body = response_body
						ctx.type = 'html'

						return
					}
				}
				catch (error)
				{
					console.log('(couldn\'t render error stack trace)')
					console.log(error.stack || error)
				}
			}

			// log the error
			console.log('服务端异常,',error)

			if (options.log)
			{
				options.log.error(error)
			}

			ctx.status = typeof error.status === 'number' ? error.status : 500
			ctx.message = error.message || 'Internal error'
			//服务端异常跳转到首页
			ctx.redirect('/product');

		}
	})

	// Custom Koa middleware extension point
	// (if someone ever needs this)
	if (options.middleware)
	{	//Koa中间件
		for (let middleware of options.middleware)
		{
			web.use(middleware)
		}
	}

	// Isomorphic rendering
	web.use(async (ctx) =>
	{
		// Trims a question mark in the end (just in case)
		const url = ctx.request.originalUrl.replace(/\?$/, '')

		const total_timer = timer()

		const { status, content, redirect, route, time } = await render_page
		({
			application,
			assets,
			initialize,
			localize: localize ? (store) => localize(store, get_preferred_locales(ctx)) : undefined,
			render,
			loading,
			html,
			authentication,

			// Legacy 7.x API support.
			// (will be removed later)
			error_handler,

			// The original HTTP request can be required
			// for inspecting cookies in `preload` function
			request: ctx.req,

			// Cookies for authentication token retrieval
			cookies: ctx.cookies
		},
		common)

		if (redirect)
		{
			return ctx.redirect(redirect)
		}

		if (status)
		{
			ctx.status = status
		}

		ctx.body = content

		if (stats)
		{
			stats
			({
				url: ctx.path + (ctx.querystring ? `?${ctx.querystring}` : ''),
				route,
				time:
				{
					...time,
					total: total_timer()
				}
			})
		}
	})

	return web
}