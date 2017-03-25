import React          from 'react'
import ReactDOM       from 'react-dom'

export default function render_on_client({ development, element, to, subsequent_render })
{
	const component = ReactDOM.render(element, to);
	// if (development && !subsequent_render)
	// {
	// 	window.React = React;
	// }
	return { element }
}
