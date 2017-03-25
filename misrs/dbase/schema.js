var EventEmitter = require('events').EventEmitter;
//var utils = require('../utils/objects');
var Kareem  = require('../../external/kareem-1.1.3');

var IS_KAREEM_HOOK = {
  find: true,

};
var objs=[];
function Schema(obj, options) {
  if (!(this instanceof Schema)) {
    return new Schema(obj, options);
  }
  this.obj = obj.obj;
  this.tree = {};
  this.callQueue = [];
  this.methods = {};
  this.statics = {};

  //钩子结构
  this.s = {
    hooks: new Kareem(),
    kareemHooks: IS_KAREEM_HOOK
  };
  if (obj) {
    var struct={name:obj.name,obj:obj.obj};
    objs.push(struct);
  }
  this.options = this.defaultOptions(options);

  for (var i = 0; i < this._defaultMiddleware.length; ++i) {
    var m = this._defaultMiddleware[i];
    // this[m.kind](m.hook, !!m.isAsync, m.fn);
    if(!m.isAsync){
      this[m.kind](m.hook,  m.fn);
    }else{
      this[m.kind](m.hook, !!m.isAsync, m.fn);
    }

  }
  //
}
//
Schema.prototype = Object.create(EventEmitter.prototype);
Schema.prototype.constructor = Schema;
Schema.prototype.instanceOfSchema = true;
//
Object.defineProperty(Schema.prototype, '_defaultMiddleware', {
  configurable: false,
  enumerable: false,
  writable: false,
  value: [
    {
      kind: 'pre',
      hook: 'save',
      isAsync:false,
      fn: function(next, options) {//sc-pre-save
        var _this = this;
        // Validate
        this.doingSave({__noPromise: true}, function(error) {//
          return _this.schema.s.hooks.execPre('save', _this, function(error) {//sc-execPost-last
            console.log("保存之前处理");
            next(error);//next为hooks的方法
          });
        });

      }
    },
    {
      kind: 'post',
      hook: 'save',
      fn:  function(options, next){
        var _this = this;
        this.doneSave({__noPromise: true}, function(done) {//
          return _this.schema.s.hooks.execPost('save', _this, [ _this],  function(error) {//sc-execPost-last
            console.log("保存之后处理");
            next(error);//next为hooks的方法

          });
        });
      }
    },

  ]
});

Schema.prototype.defaultOptions = function(options) {
  // options = utils.options({
  //
  // }, options);

  return options;
};

Schema.prototype.queue = function(name, args) {
  this.callQueue.push([name, args]);
  return this;
};


//元的pre方法
Schema.prototype.pre = function() {
  var name = arguments[0];
  if (IS_KAREEM_HOOK[name]) {
    this.s.hooks.pre.apply(this.s.hooks, arguments);
    return this;
  }
  return this.queue('pre', arguments);
};

Schema.prototype.post = function(method, fn) {
  if (IS_KAREEM_HOOK[method]) {
    this.s.hooks.post.apply(this.s.hooks, arguments);
    return this;
  }
  // assuming that all callbacks with arity < 2 are synchronous post hooks
  if (fn.length < 2) {
    return this.queue('on', [arguments[0], function(doc) {
      return fn.call(doc, doc);
    }]);
  }

  if (fn.length === 1) {
    this.s.hooks.post(method + ':error', fn);
    return this;
  }

  return this.queue('post', [arguments[0], function(next) {//sc-post
    var _this = this;
    var args = Array.prototype.slice.call(arguments, 1);
    fn.call(this, this, function(err) {//sc-post-fn
      return next.apply(_this, [err].concat(args));
    });
  }]);
};
Schema.prototype.method = function(name, fn) {
  if (typeof name !== 'string') {
    for (var i in name) {
      this.methods[i] = name[i];
    }
  } else {
    this.methods[name] = fn;
  }
  return this;
};


Schema.prototype.static = function(name, fn) {
  if (typeof name !== 'string') {
    for (var i in name) {
      this.statics[i] = name[i];
    }
  } else {
    this.statics[name] = fn;
  }
  return this;
};


for (var i in EventEmitter.prototype) {
  Schema[i] = EventEmitter.prototype[i];
}
var enent=new EventEmitter;
enent.on('model:saved', function(option,data) {
  console.log(option.type,option.description);
});

Schema.prototype.emit=function (type,option,data) {
  enent.emit(type,option,data)
}
/*!
 * Module exports.
 */

module.exports = exports = Schema;
