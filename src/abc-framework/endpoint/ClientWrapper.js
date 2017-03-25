/**
 * 由react-iosmorphic-render实现
 * @deprecated
 */
import React, { Component, PropTypes } from 'react'
import { Provider }                    from 'react-redux'
import { IntlProvider }                from 'react-intl'

import { get_language_from_locale } from '../international/locale'
import international from '../international/loader';

function ClientWrapper(props)
{
	const { store, locale, messages } = props;
	const markup =
	(
		<IntlProvider locale='zh' messages={messages}>
			{props.children}
		</IntlProvider>

	)
	return markup
}

ClientWrapper.propTypes =
{
	store     : React.PropTypes.object.isRequired,
	locale    : React.PropTypes.string.isRequired,
	messages  : React.PropTypes.object.isRequired
}

export default ClientWrapper