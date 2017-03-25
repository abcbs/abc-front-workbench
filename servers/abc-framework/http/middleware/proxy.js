import http_proxy from 'http-proxy'
import mount      from 'koa-mount'
import { exists, is_object } from '../helpers'

export default function(path, to, options = {})
{
	// Normalize arguments
	if (is_object(to))
	{
		options = to
		to = undefined
	}

	if (!exists(to))
	{
		to = path
		path = undefined
	}

	// Create proxy server
	const proxy = http_proxy.createProxyServer(options)

	// Koa middleware
	function proxy_middleware(to)
	{
		return async function(ctx)
		{
			// These two variables are used for generating error messages
			const from_name = ctx.path // .substring(path.length)
			const to_name = options.name || to

			const promise = new Promise((resolve, reject) =>
			{
				// Abrupt closing of HTTP response from the remote server
				// (e.g. due to an error)
				ctx.res.on('close', () =>
				{
					reject(new Error(`Http response closed while proxying "${from_name}" to ${to_name}`))
				})

				// When proxying finishes without errors
				ctx.res.on('finish', () =>
				{
					resolve()
				})

				// Do the proxying.
				proxy.web(ctx.req, ctx.res, { target: to }, error =>
				{
					// Give meaningful description to "Connection refused" error
					if (error.code === 'ECONNREFUSED')
					{
						error = new Error(`Couldn't proxy "${from_name}" to ${to_name} ${to}. No connection`)
					}

					// Give meaningful description to "Socket hang up"
					// (probably it's caught here)
					if (error.code === 'ECONNRESET')
					{
						error = new Error(`Lost connection while proxying "${from_name}" to ${to_name} ${to}`)
					}

					console.error(`代理错误`)
					reject(error)

					// response.writeHead(502)
					// response.end("There was an error proxying your request")
				})
			})

			await promise
		}//
	}

	// The result to be returned
	const result = { proxy }

	// Proxy only HTTP requests for a certain path
	if (path)
	{
		result.middleware = mount(path, proxy_middleware(to))
	}
	// Or just proxy all incoming HTTP requests
	else
	{
		result.middleware = proxy_middleware(to)
	}

	return result
}