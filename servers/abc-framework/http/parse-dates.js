import { is_object } from './helpers'

// ISO 8601 date regular expression
const ISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/

// Walks JSON object tree and mutates the object
export default function parse_dates(object)
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
	// If a child JSON object is encountered,
	// convert all of its `Date` string values to `Date`s,
	// and proceed recursively for all of its properties.
	else if (is_object(object))
	{
		for (let key of Object.keys(object))
		{
			// proceed recursively
			object[key] = parse_dates(object[key])
		}
	}

	// Dates have been converted for this JSON object
	return object
}