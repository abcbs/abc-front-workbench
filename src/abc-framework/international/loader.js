import { addLocaleData as add_locale_data } from 'react-intl'
import is_intl_locale_supported from 'intl-locales-supported'

import { get_language_from_locale } from './locale'

let _locale = 'zh';

// console output for debugging purposes
const debug = (...parameters) => { console.log.bind(console)(parameters) }

const international =
{
	load(locale)
	{
		// language
		locale = locale || document.documentElement.getAttribute('lang') || 'zh'

		return international.load_polyfill(locale)
			.then(international.load_locale_data.bind(null, locale))
	},

	// Returns a promise which is resolved when Intl has been polyfilled
	load_polyfill(locale)
	{
		if (window.Intl && is_intl_locale_supported(locale))
		{
			// all fine: Intl is in the global scope and the locale data is available
			return Promise.resolve()
		}
		return new Promise((resolve) =>
		{
			debug(`Intl or locale data for "${locale}" not available, downloading the polyfill...`)

			// do not remove code duplication (because Webpack won't work as expected)
			switch (get_language_from_locale(locale))
			// switch (locale)
			{
				case 'zh':
					// When building: create a intl chunk with webpack
					// When executing: run the callback once the chunk has been download.
					require.ensure
					([
						'intl',
						'intl/locale-data/jsonp/zh.js',
						'./translations/zh'
					],
					(require) =>
					{
						// apply the polyfill
						require('intl');
						require('intl/locale-data/jsonp/zh.js');

						debug(`Intl polyfill for "${locale}" has been loaded`);
						resolve();
					},
					'intl');
					break;
				case 'en':
					// When building: create a intl chunk with webpack
					// When executing: run the callback once the chunk has been download.
					require.ensure
					([
							'intl',
							'intl/locale-data/jsonp/en.js',
							'./translations/en'
						],
						(require) =>
						{
							// apply the polyfill
							require('intl');
							require('intl/locale-data/jsonp/en.js');

							debug(`Intl polyfill for "${locale}" has been loaded`);
							resolve();
						},
						'intl');
					break

			}
		})
	},

	load_locale_data(locale)
	{
		return new Promise(resolve =>
		{
			// do not remove code duplication (because Webpack won't work as expected)
			switch (get_language_from_locale(locale))
			// switch (locale)
			{
				// russian
				case 'zh':
					// download react-intl specific locale data for this language
					require.ensure
					([
						'react-intl/locale-data/zh',

						'intl-messageformat/dist/locale-data/zh',
					],
					require =>
					{
						add_locale_data(require('react-intl/locale-data/zh'))
						debug(`ReactIntl locale-data for "${locale}" has been downloaded`)

						// require('intl-messageformat/dist/locale-data/zh');
						resolve()
					},
					);
					break


			}
		})
	},

	// This is purely for Webpack HMR in dev mode
	load_translation: locale =>
	{
		// makes Webpack HMR work for this locale for now
		_locale = locale||'zh'
		switch (get_language_from_locale(locale))
		// switch (locale)
		{
			case 'zh':
				return new Promise(resolve =>
				{
					require.ensure(['./translations/zh'], require =>
					{
						const data=require('./translations/zh').default;
						resolve(data)
					})
				})
			case 'en':
				return new Promise(resolve =>
				{
					require.ensure(['./translations/en'], require =>
					{
						const data=require('./translations/en').default;
						resolve(data)
					})
				})
		}
	},

	// hot_reload: on_reload =>
	// {
	// 	if (_development_ && module.hot)
	// 	{
	// 		module.hot.accept(require.resolve('./translations/' + _locale + '.js'), function()
	// 		{
	// 			on_reload()
	// 		})
	// 	}
	// }
}

export default international