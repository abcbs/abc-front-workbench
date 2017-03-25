/**
 * 应用的入口
 */
import React, { Component, PropTypes } from 'react'
import { Provider }                    from 'react-redux'
import { IntlProvider }                from 'react-intl'

function Wrapper(props)
{
	const { store, locale, messages } = props
	const markup = 
	(
		<Provider store={store} key="provider">
			<IntlProvider locale={locale} messages={messages}>
				{props.children}
			</IntlProvider>
		</Provider>
	)

	return markup
}

Wrapper.propTypes =
{
	store     : React.PropTypes.object.isRequired,
	locale    : React.PropTypes.string.isRequired,
	messages  : React.PropTypes.object.isRequired
}

const defaultProps = {
	locale: 'zh',
};

Wrapper.defaultProps = defaultProps;
export default Wrapper