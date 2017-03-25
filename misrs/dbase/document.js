/*!
 * Module dependencies.
 */

var EventEmitter = require('events').EventEmitter;
var Schema = require('./schema');
var hooks = require('../../external/hooks-fixed-promised-1.2.0/hooks');

//文档操作内容
Document.prototype._doc;
//后端交互返回结果
Document.prototype._response;

function Document(obj, fields, skipId) {

  this.isNew = true;
  this._doc=obj;
  this.errors = undefined;

  var schema = this.schema;

  this.$__registerHooksFromSchema();
}

Document.prototype.constructor = Document;


/*!
 * Set up middleware support
 */
//加入钩子方法
for (var k in hooks) {
  if (k === 'pre' || k === 'post') {
    Document.prototype['$' + k] = Document['$' + k] = hooks[k];
  } else {
    Document.prototype[k] = Document[k] = hooks[k];
  }
}

Document.prototype.$__setSchema = function(schema) {
  this.schema = schema;
};


Document.prototype.$__registerHooksFromSchema = function() {//hookes
  var _this = this;
  //Schema中的执行队列
  var q = _this.schema && _this.schema.callQueue;
  if (!q.length) {
    return _this;
  }
  // we are only interested in 'pre' hooks, and group by point-cut
  //reduce(callbackfn[, initialValue])
  //callbackfn(previousValue, currentValue)
  var toWrap = q.reduce(function(seed, pair) {
    if (pair[0] !== 'pre' && pair[0] !== 'post' && pair[0] !== 'on') {
      _this[pair[0]].apply(_this, pair[1]);//如果不是上面三个值，则执行它
      return seed;
    }
    var args = [].slice.call(pair[1]);
    var pointCut = pair[0] === 'on' ? 'post' : args[0];
    if (!(pointCut in seed)) {
      seed[pointCut] = {post: [], pre: []};
    }
    if (pair[0] === 'post') {//配置的为post
      seed[pointCut].post.push(args);
    } else if (pair[0] === 'on') {
      seed[pointCut].push(args);
    } else {
      seed[pointCut].pre.push(args);
    }
    return seed;
  }, {
    post: []}
  );

  // 'post' hooks are simpler
  toWrap.post.forEach(function(args) {
    _this.on.apply(_this, args);
  });
  delete toWrap.post;

  //toWrap为pre和post中"方法名-函数"组成的值对
  Object.keys(toWrap).forEach(function(pointCut) {
    // this is so we can wrap everything into a promise;
    var newName = ('$__original_' + pointCut);
    if (!_this[pointCut]) {//检验实例中是否有切点方法
      return;
    }
    _this[newName] = _this[pointCut];
    //切点，如save、find、update等方法,
    //这种封装之后，在客户端调用原来的save、find时将调用此方法
    _this[pointCut] = function wrappedPointCut() {//执行hooks的方法
      var args = [].slice.call(arguments);//客户端调用的参数
      var lastArg = args.pop();//弹出最后一个
      var fn;
      var originalStack = new Error().stack;
      var $results;
      if (lastArg && typeof lastArg !== 'function') {
        args.push(lastArg);
      } else {
        fn = lastArg;
      }

      var promise = new Promise(function(resolve, reject) {
        //第一个参数定义为回调函数
        args.push(function(error) {//promise-error
          if (error) {
            reject(error);
            return;
          }
          $results = Array.prototype.slice.call(arguments, 1);
          resolve.apply(promise, $results);
        });//
        _this[newName].apply(_this, args);//调用方法,该方法的参数加上最后一个异常方法
      });//promise over
      if (fn) {
        // if (_this.constructor.$wrapCallback) {
        //   fn = _this.constructor.$wrapCallback(fn);
        // }
        return promise.then(
          function() {
            process.nextTick(function() {//客户端回调方法
              try{
                fn.apply(null, [null].concat($results));
                _this.schema.emit('model:saved',
                    {description:"数据保存成功，并且回调执行成功",
                      type:"Sucess"
                },$results);
              }catch (err){
                _this.schema.emit('model:saved',
                    {description:err,
                      type:"Fail"
                    },$results);
              }
             });
          },
          function(error) {
            process.nextTick(function() {
              fn(error);
            });
          });
      }
      return promise;
    };//function wrappedPointCut over
    //切点的pre方法
    toWrap[pointCut].pre.forEach(function(args) {
      args[0] = newName;//hooks的方法名称
      _this.$pre.apply(_this, args);
    });
    //切点的post方法
    toWrap[pointCut].post.forEach(function(args) {
      args[0] = newName;
      _this.$post.apply(_this, args);
    });
  });//forEach-over
  return _this;
};

Document.prototype.$__handleReject = function handleReject(err) {
  if (this.listeners('error').length) {
    this.emit('error', err);
    this.constructor.emit('error', err);
  } else if (this.listeners && this.listeners('error').length) {
    this.emit('error', err);
  }
};


module.exports = exports = Document;
