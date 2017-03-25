import React from 'react'

export default function localize_and_render({ development, render_parameters = {},
	render_on_client, wrapper, translation })
{
	// Make sure authentication token global variable is erased
	// (in case it hasn't been read and erased before)
	authentication_token()

	// Initialize locale
	const locale = window._locale
	if (locale)
	{
		delete window._locale
	}

	let messages = window._locale_messages
	if (messages)
	{
		delete window._locale_messages
	}

	function render_page()
	{
		// returns a Promise for React component.
		//
		return render_on_client
		({
			...render_parameters,
			development,
			create_page_element : async (element, props = {}) =>
			{
				// if no i18n is required, then simply create Page element
				if (!locale)
				{
					return React.createElement(wrapper, props, element)
				}
				if (translation)
				{
					messages = await translation(locale)
				}
				props.locale   = locale
				props.messages = messages

				// create React page element
				return React.createElement(wrapper, props, element)
			},
			to: document.getElementById('react')
		})
	}
	return render_page().then(result =>
	{
		result.rerender = render_page
		return result
	})
}

export function authentication_token()
{
	const token = window._authentication_token

	if (token)
	{
		delete window._authentication_token
	}

	return token
}