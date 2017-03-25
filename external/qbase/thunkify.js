module.exports = thunkify;

function thunkify(fn){
     //返回匿名函数
      return function(){//thunkify
        //执行thunkify后的方法，即执行没有最后一个参数（回调），
          // 即上句的调用  
        var args = new Array(arguments.length);
        var ctx = this;

        for(var i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }
        //thunkify化后,执行有回调函数的方法执行，即没有最后的回调方法
        return function(done){
            var called;

            args.push(function(){//回调函数，即最后一个参数被调用时调用此方法
                if (called) return;
                called = true;
                //第二次调用，最后一个参数被客户端调用，异步回调方法，执行回调函数之后
                done.apply(null, arguments);
            });//args.push

            try {//fn为原对象
                fn.apply(ctx, args);//第一次调用，原函数调用，包括回调函数
            } catch (err) {
                done(err);
            }
        }//return over
    }
};

/**
 var Thunk = function(fn){
  return function (){
    var args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};
**/