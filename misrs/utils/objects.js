exports.options = function(defaults, options) {
    var keys = Object.keys(defaults),
        i = keys.length,
        k;

    options = options || {};

    while (i--) {
        k = keys[i];
        if (!(k in options)) {
            options[k] = defaults[k];
        }
    }

    return options;
};


exports.random = function() {
    return Math.random().toString().substr(3);
};

/*!
 * Merges `from` into `to` without overwriting existing properties.
 *
 * @param {Object} to
 * @param {Object} from
 * @api private
 */

exports.merge = function merge(to, from, options) {
    options = options || {};
    var keys = Object.keys(from);
    var i = 0;
    var len = keys.length;
    var key;

    if (options.retainKeyOrder) {
        while (i < len) {
            key = keys[i++];
            if (typeof to[key] === 'undefined') {
                to[key] = from[key];
            } else if (exports.isObject(from[key])) {
                merge(to[key], from[key]);
            } else if (options.overwrite) {
                to[key] = from[key];
            }
        }
    } else {
        while (len--) {
            key = keys[len];
            if (typeof to[key] === 'undefined') {
                to[key] = from[key];
            } else if (exports.isObject(from[key])) {
                merge(to[key], from[key]);
            } else if (options.overwrite) {
                to[key] = from[key];
            }
        }
    }
};

/*!
 * toString helper
 */

var toString = Object.prototype.toString;

/*!
 * Applies toObject recursively.
 *
 * @param {Document|Array|Object} obj
 * @return {Object}
 * @api private
 */

exports.toObject = function toObject(obj) {
    Document || (Document = require('./document'));
    var ret;

    if (exports.isNullOrUndefined(obj)) {
        return obj;
    }

    if (obj instanceof Document) {
        return obj.toObject();
    }

    if (Array.isArray(obj)) {
        ret = [];

        for (var i = 0, len = obj.length; i < len; ++i) {
            ret.push(toObject(obj[i]));
        }

        return ret;
    }

    if ((obj.constructor && exports.getFunctionName(obj.constructor) === 'Object') ||
        (!obj.constructor && exports.isObject(obj))) {
        ret = {};

        for (var k in obj) {
            ret[k] = toObject(obj[k]);
        }

        return ret;
    }

    return obj;
};

/*!
 * Determines if `arg` is an object.
 *
 * @param {Object|Array|String|Function|RegExp|any} arg
 * @api private
 * @return {Boolean}
 */

exports.isObject = function(arg) {
    if (Buffer.isBuffer(arg)) {
        return true;
    }
    return toString.call(arg) === '[object Object]';
};

/*!
 * A faster Array.prototype.slice.call(arguments) alternative
 * @api private
 */

//exports.args = sliced;

/*!
 * process.nextTick helper.
 *
 * Wraps `callback` in a try/catch + nextTick.
 *
 * node-mongodb-native has a habit of state corruption when an error is immediately thrown from within a collection callback.
 *
 * @param {Function} callback
 * @api private
 */

exports.tick = function tick(callback) {
    if (typeof callback !== 'function') {
        return;
    }
    return function() {
        try {
            callback.apply(this, arguments);
        } catch (err) {
            // only nextTick on err to get out of
            // the event loop and avoid state corruption.
            process.nextTick(function() {
                throw err;
            });
        }
    };
};

exports.isMongooseObject = function(v) {
   return true;
};
var isMongooseObject = exports.isMongooseObject;

exports.getFunctionName = function(fn) {
    if (fn.name) {
        return fn.name;
    }
    return (fn.toString().trim().match(/^function\s*([^\s(]+)/) || [])[1];
};

exports.clone = function clone(obj, options) {
    if (obj === undefined || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return cloneArray(obj, options);
    }

    if (isMongooseObject(obj)) {
        if (options && options.json && typeof obj.toJSON === 'function') {
            return obj.toJSON(options);
        }
        return obj.toObject(options);
    }

    if (obj.constructor) {
        switch (exports.getFunctionName(obj.constructor)) {
            case 'Object':
                return cloneObject(obj, options);
            case 'Date':
                return new obj.constructor(+obj);
            case 'RegExp':
                return cloneRegExp(obj);
            default:
                // ignore
                break;
        }
    }

    if (obj instanceof ObjectId) {
        return new ObjectId(obj.id);
    }

    if (!obj.constructor && exports.isObject(obj)) {
        // object created with Object.create(null)
        return cloneObject(obj, options);
    }

    if (obj.valueOf) {
        return obj.valueOf();
    }
};
var clone = exports.clone;

exports.toObject = function toObject(obj) {
    Document || (Document = require('./document'));
    var ret;

    if (exports.isNullOrUndefined(obj)) {
        return obj;
    }

    if (obj instanceof Document) {
        return obj.toObject();
    }

    if (Array.isArray(obj)) {
        ret = [];

        for (var i = 0, len = obj.length; i < len; ++i) {
            ret.push(toObject(obj[i]));
        }

        return ret;
    }

    if ((obj.constructor && exports.getFunctionName(obj.constructor) === 'Object') ||
        (!obj.constructor && exports.isObject(obj))) {
        ret = {};

        for (var k in obj) {
            ret[k] = toObject(obj[k]);
        }

        return ret;
    }

    return obj;
};