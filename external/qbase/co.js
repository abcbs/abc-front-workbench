var slice = Array.prototype.slice;

module.exports = co['default'] = co.co = co;

co.wrap = function (fn) {
    createPromise.__generatorFunction__ = fn;
    return createPromise;
    function createPromise() {
        return co.call(this, fn.apply(this, arguments));
    }
};


function co(gen) {
    var ctx = this;
    var args = slice.call(arguments, 1);
    //在返回的Promise对象里面，co先检查参数gen是否为Generator函数。如果是，就执行该函数，得到一个内部指针对象；
    // 如果不是就返回，并将Promise对象的状态改为resolved。
    return new Promise(function(resolve, reject) {
        if (typeof gen === 'function'){
            //调用Generator函数，会返回一个内部指针（即遍历器）g
            gen = gen.apply(ctx, args);
        }
        //如果不是就返回，并将Promise对象的状态改为resolved。
        if (!gen || typeof gen.next !== 'function') {
            return resolve(gen);
        }
        onFulfilled();
        //co将Generator函数的内部指针对象的next方法，包装成onFulfilled函数。这主要是为了能够捕捉抛出的错误。
        function onFulfilled(res) {
            var ret;
            try {
                //调用指针g的next方法，会移动内部指针（即执行异步任务的第一段），指向第一个遇到的yield语句
                ret = gen.next(res);//
            } catch (e) {
                return reject(e);
            }
            next(ret);
            return null;
        }

        function onRejected(err) {
            var ret;
            try {
                ret = gen.throw(err);
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }
        //关键的next函数，它会反复调用自身。
        function next(ret) {
            //检查当前是否为 Generator 函数的最后一步，如果是就返回。
            if (ret.done) {
                return resolve(ret.value);
            }
            //确保每一步的返回值，是Promise 对象。
            var value = toPromise.call(ctx, ret.value);
            //使用then方法，为返回值加上回调函数，然后通过onFulfilled函数再次调用next函数。
            if (value && isPromise(value)){
                //如果是Promise则继续执行then
                return value.then(onFulfilled, onRejected);
            }
            //在参数不符合要求的情况下（参数非Thunk函数和Promise 对象），将Promise对象的状态改为 rejected，从而终止执行。
            return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
                + 'but the following object was passed: "' + String(ret.value) + '"'));
        }
    });
}

function toPromise(obj) {
    if (!obj) {
        return obj;
    }
    if (isPromise(obj)) {
        return obj;
    }
    if (isGeneratorFunction(obj) || isGenerator(obj)) {
        return co.call(this, obj);
    }
    //如果是一个普通函数则变化其为Promise
    if ('function' == typeof obj) {
        return thunkToPromise.call(this, obj);
    }
    //如果是数组
    if (Array.isArray(obj)) {
        return arrayToPromise.call(this, obj);
    }
    if (isObject(obj)) {
        return objectToPromise.call(this, obj);
    }
    return obj;
}

function thunkToPromise(fn) {
    var ctx = this;
    return new Promise(function (resolve, reject) {
        fn.call(ctx,
            function (err, res) {
                if (err) {
                    return reject(err);
                }
                if (arguments.length > 2) {
                    res = slice.call(arguments, 1);
                }
                resolve(res);
            });
    });
}

function arrayToPromise(obj) {
    return Promise.all(obj.map(toPromise, this));
}

function objectToPromise(obj){
    var results = new obj.constructor();
    var keys = Object.keys(obj);
    var promises = [];

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var promise = toPromise.call(this, obj[key]);
        if (promise && isPromise(promise)) {
            defer(promise, key);
        }
        else {
            results[key] = obj[key];
        }
    }

    return Promise.all(promises).then(function () {
        return results;
    });

    function defer(promise, key) {
        // predefine the key in the result
        results[key] = undefined;
        promises.push(promise.then(function (res) {
            results[key] = res;
        }));
    }
}

function isPromise(obj) {
    return 'function' == typeof obj.then;
}


function isGenerator(obj) {
    return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

function isGeneratorFunction(obj) {
    var constructor = obj.constructor;
    if (!constructor) return false;
    if ('GeneratorFunction' === constructor.name ||
        'GeneratorFunction' === constructor.displayName) return true;
    return isGenerator(constructor.prototype);
}

function isObject(val) {
    return Object == val.constructor;
}
