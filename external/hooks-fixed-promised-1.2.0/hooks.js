// TODO Add in pre and post skipping options
module.exports = {
  /**
   *  Declares a new hook to which you can add pres and posts
   *  @param {String} name of the function
   *  @param {Function} the method
   *  @param {Function} the error handler callback
   */
  hook: function (name, fn, errorCb) {
    if (arguments.length === 1 && typeof name === 'object') {
      for (var k in name) { // `name` is a hash of hookName->hookFn
        this.hook(k, name[k]);
      }
      return;
    }

    var proto = this.prototype || this//原型
        , pres = proto._pres = proto._pres || {}
        , posts = proto._posts = proto._posts || {};
    pres[name] = pres[name] || [];
    posts[name] = posts[name] || [];
    //改写原型中实例方法，改写之后采用fn.apply方式来调用原来的方法
    proto[name] = function () {//proto定义包括了pre和post的处理，即_next和_done
      var self = this
          , hookArgs // arguments eventually passed to the hook - are mutable
          , lastArg = arguments[arguments.length-1]
          , pres = this._pres[name]//前面方法
          , posts = this._posts[name]//后面方法
          , _total = pres.length//前面方法
          , _current = -1
          , _asyncsLeft = proto[name].numAsyncPres
          , _asyncsDone = function(err) {//hooks-asynsDone-完成
              if (err) {
                return handleError(err);
              }
              --_asyncsLeft || _done.apply(self, hookArgs);
          }
          , handleError = function(err) {//hooks-handleError
              if ('function' == typeof lastArg)
                return lastArg(err);
              if (errorCb) return errorCb.call(self, err);
              throw err;
            }
            //pre的部分的处理，当第一个参数为err时处理异常
          , _next = function () {//hookes-_next
                if (arguments[0] instanceof Error) {
                  return handleError(arguments[0]);
                }
                //从之前参数中获取值
                var _args = Array.prototype.slice.call(arguments)
                    , currPre
                    , preArgs;
                //不是:第一个参数为null和最后一个为function
                //第一个为不为空
                //最后一个不是函数
                if (_args.length && !(arguments[0] == null && typeof lastArg === 'function')){
                  hookArgs = _args;
                }
                //_current为当前执行的pre钩子方法
                if (++_current < _total) {//pre部分执行
                  currPre = pres[_current]//获取当前钩子方法
                  if (currPre.isAsync && currPre.length < 2){
                    throw new Error("Your pre must have next and done arguments " +
                        "-- e.g., function (next, done, ...)");
                  }
                  if (currPre.length < 1){
                    throw new Error("Your pre must have a next argument " +
                        "-- e.g., function (next, ...)");
                  }
                  //
                  preArgs = (currPre.isAsync
                      ? [once(_next), once(_asyncsDone)]
                      : [once(_next)]).concat(hookArgs);
                  return currPre.apply(self, preArgs);
                } //++_current < _total over，当钩子执行完毕，如果没有异步则执行_done方法
                else if (!_asyncsLeft) {//最后一个，当异步执行没有时则执行_done
                  return _done.apply(self, hookArgs);
                }
          }//_next over
          , _done = function () {//hooks-_done，即执行post方法
            var args_ = Array.prototype.slice.call(arguments)//获取参数
                , ret, total_, current_, next_, done_, postArgs;

            if (_current === _total) {
              next_ = function () {//hooks-post-next_
                if (arguments[0] instanceof Error) {
                  return handleError(arguments[0]);
                }
                var args_ = Array.prototype.slice.call(arguments, 1)
                    , currPost
                    , postArgs;
                if (args_.length) hookArgs = args_;
                if (++current_ < total_) {
                  currPost = posts[current_]
                  if (currPost.length < 1){
                    throw new Error("Your post must have a next argument " +
                        "-- e.g., function (next, ...)");
                  }
                  //执行一次调用,第一参数为next
                  postArgs = [once(next_)].concat(hookArgs);
                  return currPost.apply(self, postArgs);
                } else if (typeof lastArg === 'function'){//调用回调
                  // All post handlers are done, call original callback function
                  return lastArg.apply(self, arguments);
                }
              };//_done-over

              // We are assuming that if the last argument provided to the wrapped function is a function, it was expecting
              // a callback.  We trap that callback and wait to call it until all post handlers have finished.
              if(typeof lastArg === 'function'){
                args_[args_.length - 1] = once(next_);
              }
              total_ = posts.length;
              current_ = -1;
              ret = fn.apply(self, args_); //执行原函数， Execute wrapped function, post handlers come afterward

              if (total_ && typeof lastArg !== 'function'){
                return next_();  // no callback provided, execute next_() manually
              }
              return ret;
            }
      };//变量定义完毕

      return _next.apply(this, arguments);//
    };// proto[name] = function () over

    proto[name].numAsyncPres = 0;

    return this;
  },//hook

  pre: function (name, isAsync, fn, errorCb) {
    if ('boolean' !== typeof arguments[1]) {
      errorCb = fn;
      fn = isAsync;
      isAsync = false;
    }
    var proto = this.prototype || this
        , pres = proto._pres = proto._pres || {};

    this._lazySetupHooks(proto, name, errorCb);

    if (fn.isAsync = isAsync) {
      proto[name].numAsyncPres++;
    }

    (pres[name] = pres[name] || []).push(fn);
    return this;
  },
  post: function (name, isAsync, fn) {
    if (arguments.length === 2) {
      fn = isAsync;
      isAsync = false;
    }
    var proto = this.prototype || this
        , posts = proto._posts = proto._posts || {};
    //懒装配
    this._lazySetupHooks(proto, name);
    (posts[name] = posts[name] || []).push(fn);
    return this;
  },
  removePre: function (name, fnToRemove) {
    var proto = this.prototype || this
        , pres = proto._pres || (proto._pres || {});
    if (!pres[name]) return this;
    if (arguments.length === 1) {
      // Remove all pre callbacks for hook `name`
      pres[name].length = 0;
    } else {
      pres[name] = pres[name].filter( function (currFn) {
        return currFn !== fnToRemove;
      });
    }
    return this;
  },
  removePost: function (name, fnToRemove) {
    var proto = this.prototype || this
        , posts = proto._posts || (proto._posts || {});
    if (!posts[name]) return this;
    if (arguments.length === 1) {
      // Remove all post callbacks for hook `name`
      posts[name].length = 0;
    } else {
      posts[name] = posts[name].filter( function (currFn) {
        return currFn !== fnToRemove;
      });
    }
    return this;
  },

  _lazySetupHooks: function (proto, methodName, errorCb) {
    if ('undefined' === typeof proto[methodName].numAsyncPres) {
      this.hook(methodName, proto[methodName], errorCb);
    }
  }
};

function once (fn, scope) {
  return function fnWrapper () {//hooks-fnWrapper
    if (fnWrapper.hookCalled) return;
    fnWrapper.hookCalled = true;
    fn.apply(scope, arguments);
  };
}
