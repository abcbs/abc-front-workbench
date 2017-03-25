var Document = require('./document');
var Schema = require('./schema');
var Query = require('./query');
var EventEmitter = require('events').EventEmitter;

Model.prototype.__proto__ = Document.prototype;
Model.prototype.modelName;
//Model.schema;
Model.base;


function Model(doc, fields, skipId) {
  Document.call(this, doc, fields, skipId);
}

Model.createModel = function(name, newSchema) {
  model = Model.compile(name, newSchema,this);
  return model;
};

Object.defineProperty(Model.prototype, 'Promise', {
  get: function() {
    return PromiseProvider.get();
  },
  set: function(lib) {
    
  }
});

Model.prototype.__proto__ = Document.prototype;

Model.wrapCallback = function(callback) {
  var _this = this;
  return function() {//Model.wrapCallback 
    try {
      callback.apply(null, arguments);
    } catch (error) {
      _this.emit('error', error);
    }
  };
};


/////////////////////////////////////////////////////////
Model.prototype.model = function model(name) {
  return this.db.model(name);
};

Model.compile = function compile(name, schema,base) {
  // generate new class
  function model(doc, fields, skipId) {
    if (!(this instanceof model)) {
      return new model(doc, fields, skipId);
    }
    Model.call(this, doc, fields, skipId);
  }
  model.hooks = schema.s.hooks.clone();
  model.base = base;
  model.modelName = name;
  model.__proto__ = Model;
  model.prototype.__proto__ = Model.prototype;
  model.model = Model.prototype.model;
  model.prototype = Model.prototype;
  model.prototype.$__setSchema(schema);

  // apply methods and statics
  applyMethods(model, schema);
  applyStatics(model, schema);

  model.schema = model.prototype.schema;

  // Create custom query constructor
  model.Query = function() {
    Query.apply(this, arguments);
  };
  model.Query.prototype = Object.create(Query.prototype);

  return model;
};


var applyMethods = function(model, schema) {
  function apply(method, schema) {
    Object.defineProperty(model.prototype, method, {
      get: function() {
        var h = {};
        for (var k in schema.methods[method]) {
          h[k] = schema.methods[method][k].bind(this);
        }
        return h;
      },
      configurable: true
    });
  }
  for (var method in schema.methods) {
    if (schema.tree.hasOwnProperty(method)) {
      throw new Error('You have a method and a property in your schema both ' +
        'named "' + method + '"');
    }
    if (typeof schema.methods[method] === 'function') {
      model.prototype[method] = schema.methods[method];
    } else {
      apply(method, schema);
    }
  }
};

var applyStatics = function(model, schema) {
  for (var i in schema.statics) {
    model[i] = schema.statics[i];
  }
};

var applyQueryMethods=function applyQueryMethods(model, methods) {
  for (var i in methods) {
    model.Query.prototype[i] = methods[i];
  }
};

///////////////////////////////////////////////////////////////////////////
Model.find = function find(conditions, projection, options, callback) {
  if (typeof conditions === 'function') {
    callback = conditions;
    conditions = {};
    projection = null;
    options = null;
  } else if (typeof projection === 'function') {
    callback = projection;
    projection = null;
    options = null;
  } else if (typeof options === 'function') {
    callback = options;
    options = null;
  }

  var mq = new this.Query({}, {}, this );
  return mq.find(conditions, callback);
};

////////////////////////////////////////////////////////////////////////////
Model.prototype.$__handleSave = function(options, callback) {
  var _this = this;
  _this.response={saved:"Beijing"};
  console.log("Model__handleSave service...");
  setTimeout(function () {
    console.log("sleep...");
    callback(null, {saved:"Beijing"});

  }, 1);

};

Model.prototype.save = function(options, fn) {
  if (typeof options === 'function') {
    fn = options;
    options = undefined;
  }
  if (!options) {
    options = {};
  }
  var _this=this;
  //调用函数
  this.$__handleSave(options, function(error, result) {
    if (error) {
      return _this.schema.s.hooks.execPost('save:error', _this, [_this], { error: error }, function(error) {
        callback(error);
      });
    }
    //调用本方法的回调函数
    fn(null, _this, result);
  });
  return this;
};

Document.prototype.doneSave = function(options, callback) {
  var _this = this;
  var schema = this.schema;
  if (typeof options === 'function') {
    callback = options;
    options = null;
  }
  callback();

};

Document.prototype.doingSave = function(options, callback) {
  var _this = this;
  if (typeof options === 'function') {
    callback = options;
    options = null;
  }
  callback();

};

////////////////////////////////////////////////////////////////////////////////////

module.exports = exports = Model;
