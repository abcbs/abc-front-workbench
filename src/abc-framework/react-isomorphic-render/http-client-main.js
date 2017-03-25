import superagent from 'superagent'

import { is_object, starts_with } from './helpers'

export default class http_client
{
	constructor(options = {})
	{
		const { secure, host, port, headers, clone_request,
			authentication_token, authentication_token_header } = options

		const parse_json_dates = options.parse_dates !== false

		const format_url = options.format_url || this.format_url.bind(this)

		if (options.format_url)
		{
			console.warn('[react-isomorphic-render] The default `http.url` '+
				'formatter only allows requesting local paths'+
				' therefore protecting authentication token (and cookies) ' +
				'from leaking to a 3rd party. Since you supplied your own `http.url` formatting function, ' +
				'implementing such anti-leak guard is your responsibility now.')
		}

		// Clone HTTP request cookies on the server-side
		// (to make authentication work)
		if (clone_request)
		{
			this.server = true
			this.cookies = clone_request.headers.cookie
		}
		
		this.host = host
		this.port = port || 80
		this.secure = secure

		this.on_before_send_listeners = []

		const http_methods =
		[
			'get',
			'post',
			'put',
			'patch',
			'delete',
			'head',
			'options'
		]

		// Define HTTP methods on this instance
		for (let method of http_methods)
		{
			this[method] = (path, data, options = {}) =>
			{
				// `url` will be absolute for server-side
				const url = format_url(path, this.server)

				return new Promise((resolve, reject) =>
				{
					// Create Http request
					const agent = this.server ? superagent.agent() : superagent
					const request = agent[method](url)

					// Attach data to the outgoing HTTP request
					if (data)
					{
						switch (method)
						{
							case 'get':
								request.query(data)
								break

							case 'post':
							case 'put':
							case 'patch':
							case 'head':
							case 'options':
								request.send(data)
								break

							case 'delete':
								throw new Error(`"data" supplied for HTTP DELETE request: ${JSON.stringify(data)}`)

							default:
								throw new Error(`Unknown HTTP method: ${method}`)
						}
					}

					// Set JWT token in HTTP request header (if the token is passed)
					if (authentication_token)
					{
						request.set(authentication_token_header || 'Authorization', `Bearer ${authentication_token}`)
					}

					// Server side only
					// (copies user authentication cookies to retain session specific data)
					if (this.cookies)
					{
						request.set('cookie', this.cookies)
					}

					// Apply default HTTP headers
					if (headers)
					{
						request.set(headers)
					}

					// Apply this HTTP request specific HTTP headers
					if (options.headers)
					{
						request.set(options.headers)
					}
					for (let listener of this.on_before_send_listeners)
					{
						listener(request)
					}

					// Send HTTP request
					request.end((error, response) => 
					{
						if(!response){//LiuJQ
							// throw new Error("Fatial No response")//
							 reject(new Error("Fatial No response"));
							return ;
						}
						if(!response.body&&!error){//LiuJQ
							// throw new Error("Fatial No body")//
							 reject(new Error("Fatial No body"));
							return ;
						}
						const response_body = parse_json_dates ? parse_dates(response.body) : response&&response.body

						// If there was an error, then reject the Promise
						if (error)
						{
							if (response)
							{
								// Set `error.status` to HTTP response status code
								error.status = response.statusCode

								switch (response.type)
								{
									// Set error `data` from response body,
									case 'application/json':
										// if (!is_object(error.data))
										error.data = response_body

										// Set the more meaningful message for the error (if available)
										if (error.data.message)
										{
											error.message = error.data.message
										}

										break


									case 'text/plain':
										error.message = response.text
										break

									case 'text/html':
										error.html = response.text
										if (response.headers['x-error-message'])
										{
											error.message = response.headers['x-error-message']
										}

										// Recover the original error stack trace (if any)
										if (response.headers['x-error-stack-trace'])
										{
											error.stack = JSON.parse(response.headers['x-error-stack-trace'])
										}

										break
								}
							}

							// HTTP request failed with an `error`
							return reject(error)
						}
						if (response.statusCode === 204)
						{
							return resolve()
						}
						resolve(response_body)
					})
				})
			}
		}
	}
	format_url(path, server)
	{
		if (starts_with(path, '//') || !starts_with(path, '/'))
		{
			throw new Error(`Only internal URLs (e.g. "/api/item?id=1") are allowed for the "http" utility. Got an external url "${path}"`)
		}

		// Prepend host and port on the server side
		if (server)
		{
			const protocol = this.secure ? 'https' : 'http'
			return `${protocol}://${this.host}:${this.port}${path}`
		}

		return path
	}

	// Allows hooking into HTTP request sending routine
	// (for example, to set some HTTP headers)
	on_before_send(listener)
	{
		this.on_before_send_listeners.push(listener)
	}
}

const ISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/

// Walks JSON object tree
function parse_dates(object)
{
	// If it's a date in an ISO string format, then parse it
	if (typeof object === 'string' && ISO.test(object))
	{
		return new Date(object)
	}
	// If an array is encountered, 
	// proceed recursively with each element of this array.
	else if (object instanceof Array)
	{
		let i = 0
		while (i < object.length)
		{
			object[i] = parse_dates(object[i])
			i++
		}
	}
	else if (is_object(object))
	{
		for (let key of Object.keys(object))
		{
			// proceed recursively
			object[key] = parse_dates(object[key])
		}
	}
	return object
}