Query.prototype.op;
function Query(conditions, options, model) {
   // this is the case where we have a CustomQuery, we need to check if we got
  // options passed in, and if we did, merge them in
  if (options) {
    var keys = Object.keys(options);
    for (var i = 0; i < keys.length; ++i) {
      var k = keys[i];
    }
  }

  if (model) {
    this.model = model;
    this.schema = model.schema;
  }

  if (this.schema) {
    var kareemOptions = { useErrorHandlers: true };
    this._count = this.model.hooks.createWrapper('count',
        Query.prototype._count, this, kareemOptions);
    this._execUpdate = this.model.hooks.createWrapper('update',
        Query.prototype._execUpdate, this, kareemOptions);
    this._find = this.model.hooks.createWrapper('find',
        Query.prototype._find, this, kareemOptions);
    this._findOne = this.model.hooks.createWrapper('findOne',
        Query.prototype._findOne, this, kareemOptions);
    this._findOneAndRemove = this.model.hooks.createWrapper('findOneAndRemove',
        Query.prototype._findOneAndRemove, this, kareemOptions);
    this._findOneAndUpdate = this.model.hooks.createWrapper('findOneAndUpdate',
        Query.prototype._findOneAndUpdate, this, kareemOptions);
  }
}

Query.prototype.constructor = Query;

Query.prototype.getQuery = function() {
  return this._conditions;
};

Query.prototype.getUpdate = function() {
  return this._update;
};

Query.prototype.findReal = function(callback) {
  return this._find(callback);//真实的调用
};

Query.prototype._find = function(callback) {
  console.log("Query_find service ");

  setTimeout(function () {
    console.log("Query_find sleep... ");
    if(callback){
      callback(null,{test:"test"});
    }
  }, 1);

  return this;
};

Query.prototype.find = function(conditions, callback) {
  if (typeof conditions === 'function') {
    callback = conditions;
    conditions = {};
  }
  this._conditions=conditions;
  this.op="findReal";
  return this;
};

Query.prototype.exec = function exec(op, callback) {
   var _this = this;
  callback=op;
  var _results;
  var promise = new Promise(function(resolve, reject) {
    if (!_this.op) {
      resolve();
      return;
    }
    _this[_this.op].call(_this, function(error, res) {
      if (error) {
        reject(error);
        return;
      }
      _results = arguments;
      resolve(res);
    });
  });
  if (callback) {
    promise.then(
      function() {
        callback.apply(_this, _results);
      },
      function(error) {
        callback(error);
      }).
      catch(function(error) {
        setImmediate(function() {
          _this.model.emit('error', error);
        });
      });
  }
  return promise;
};

Query.prototype.then = function(resolve, reject) {
  return this.exec().then(resolve, reject);
};

Query.prototype.catch = function(reject) {
  return this.exec().then(null, reject);
};

Query.prototype._getSchema = function _getSchema(path) {
  return this.model._getSchema(path);
};

Query.prototype._conditions;

module.exports = Query;
