import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import styler from 'react-styling'
import classNames from 'classnames'

// http://codepen.io/jczimm/pen/vEBpoL
// (18.02.2016)

// https://github.com/callemall/material-ui/blob/master/src/circular-progress.jsx
// 16.01.2016

// const more_than_circumference_max_length = 200

// const stripe_contracted_length = 1
// const stripe_expanded_length   = 89

export default class Spinner extends Component
{
	static propTypes =
	{
		style: PropTypes.object,
	}

	static defaultProps = 
	{
		// mode  : 'indeterminate',
		// value : 0,
		// min   : 0,
		// max   : 100
	}

	render()
	{

		let path_style = style.path

		const markup = 
		(
			<div className={classNames('spinner', this.props.className)} style={this.props.style}>
				<svg viewBox="0 0 50 50">
					<circle 
						style={path_style}
						cx="25" 
						cy="25" 
						r="20" 
						fill="none"
						stroke="#D1D3D7"
						strokeWidth="2.5" 
						strokeMiterlimit="10"/>
				</svg>
			</div>
		)

		return markup
	}

}

const style = styler
`
	container
		display : inline-block

	wrapper
		width  : 100%
		height : 100%

		// transition : transform 20s linear

	path
		stroke-dashoffset : 0
		stroke-linecap    : round
		transition        : all 1.5s ease-in-out
		

`

	// path
		// &dynamic
		// 	stroke-dasharray  : ${stripe_contracted_length},${more_than_circumference_max_length}

		// &static
		// 	stroke-dasharray  : ${stripe_expanded_length},${more_than_circumference_max_length}