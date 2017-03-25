(function (definition) {
    "use strict";
    if (typeof window !== "undefined" || typeof self !== "undefined") {
       var global = typeof window !== "undefined" ? window : self;
        var previousQ = global.Q;
        global.Q = definition();
    }
})(function () {
"use strict";
var nextTick =(function () {
    var head = {task: void 0, next: null};
    //队列的头和未
    var tail = head;
    //
    var flushing = false;
    //异步执行方法
    var requestTick = void 0;
    var isNodeJS = false;
    // queue for late tasks, used by unhandled rejection tracking
    var laterQueue = [];
    //奔流、冲洗
    //异步动作
    function flush() {
        while (head.next) {
            //运行单个任务
            runSingle(task, domain);
        }//head.next while over
        while (laterQueue.length) {//
            task = laterQueue.pop();//task为flush
            runSingle(task);
        }//while over
    }//over

    // runs a single function in the async queue
    /**
     * 运行任务的入口方法
     * @param task  flush
     * @param domain Nodejs、Brower
     */
    function runSingle(task, domain) {
        try {
            task();
        } catch (e) {//任务失败

        }//
        if (domain) {
            domain.exit();
        }
    }

    //定义下一个动作
    nextTick = function (task) {//task为flush
        tail = tail.next = {
            task: task,
            domain: isNodeJS && process.domain,//window或者Nodejs
            next: null
        };

        if (!flushing) {
            flushing = true;
            requestTick();//入口执行异步操作
        }
    };//nextTick

    if (typeof process === "object" &&
        process.toString() === "[object process]" && process.nextTick) {
        isNodeJS = true;
        //
        requestTick = function () {
            process.nextTick(flush);
        };

    } else if (typeof setImmediate === "function") {//浏览器
        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
        if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);//使用setImmediate
        } else {
            requestTick = function () {
                setImmediate(flush);
            };
        }
    }
    nextTick.runAfter = function (task) {
        laterQueue.push(task);//任务进入队列
        requestTick();
    };
    return nextTick;
})();

 //返回Promise
function Q(value) {
    if (value instanceof Promise) {//如果是Promise则返回
        return value;
    }
    // assimilate thenables
    if (isPromiseAlike(value)) {
        return coerce(value);//强制转换为Q
    } else {
        return fulfill(value);//完成
    }
}
Q.resolve = Q;

Q.nextTick = nextTick;

Q.defer = defer;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**    **************************************************************************************************     **/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function defer() {
        // if "messages" is an "Array", that indicates that the promise has not yet
        // been resolved.  If it is "undefined", it has been resolved.  Each
        // element of the messages array is itself an array of complete arguments to
        // forward to the resolved promise.  We coerce the resolution value to a
        // promise using the `resolve` function because it handles both fully
        // non-thenable values and other thenables gracefully.优雅地
        //如果messages是一个数组，表示promise仍然没有完成
        //如果是undefined，则表示已经完成resolved
        //message数组的每个元素本身是一个需要完成的Promise的数组
        //我们使用resolve函数强制转换一个完成值为Promise
        var messages = [], progressListeners = [], resolvedPromise;
        //实例化deferred，deferred的实例方法包括：
        /**
         * deferred实例包括方法、实例
         * 对象变量
         *      promise
         * 方法
         *      resolve
         *      fulfill
         *      reject
         *      notify
         */
        var deferred = object_create(defer.prototype);

        //promise实例方法包括:
        //promise.promiseDispatch
        //promise.valueOf
        //promise.inspect
        //promise实例的实例变量
        //promise.stack
        var promise = object_create(Promise.prototype);

        //私有的becomse方法调用
        promise.promiseDispatchToTick = function (resolve, op, operands) {//defer promiseDispatch
            var args = array_slice(arguments);//参数转换为数组
            if (messages) {
                messages.push(args);
                if (op === "when" && operands[1]) { // progress operand
                    progressListeners.push(operands[1]);//加入到监听队列
                }
            } else {
                Q.nextTick(function () {//LiuJQ L850为Promise的promiseDispatch
                    console.log("defer  promise.promiseDispatchToTick  Q.nextTick  promiseDispatchReal callee args->\n",args)
                    resolvedPromise.promiseDispatchReal.apply(resolvedPromise, args);
                });
            }
        };

        // XXX deprecated
        promise.valueOf = function () {//defer  valueOf
            if (messages) {
                return promise;
            }
            var nearerValue = nearer(resolvedPromise);
            if (isPromise(nearerValue)) {
                resolvedPromise = nearerValue; // shorten chain
            }
            return nearerValue;
        };
        //检查
        promise.inspect = function () {//defer  inspect
            if (!resolvedPromise) {//
                return { state: "pending" };
            }
            return resolvedPromise.inspect();
        };
        //
        if (Q.longStackSupport && hasStacks) {
            try {
                throw new Error();
            } catch (e) {
                // NOTE: don't try to use `Error.captureStackTrace` or transfer the
                // accessor around; that causes memory leaks as per GH-111. Just
                // reify the stack trace as a string ASAP.
                //
                // At the same time, cut off the first line; it's always just
                // "[object Promise]\n", as per the `toString`.
                promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
            }
        }

        // NOTE: we do the checks for `resolvedPromise` in each method, instead of
        // consolidating巩固，加强 them into `become`, since otherwise we'd create new
        // promises with the lines `become(whatever(value))`. See e.g. GH-252.
        //采用在每个方法中检查resolvedPromise，而不是强制使它们转换become
        //其原因是become(whatever(value))将新创建一个Promise
        function become(newPromise) {
            //具体的Promise，在new Q.Promise(function(resolve, reject)中
            resolvedPromise = newPromise;

            if (Q.longStackSupport && hasStacks) {
                // Only hold a reference to the new promise if long stacks
                // are enabled to reduce memory usage
                promise.source = newPromise;
            }
            //message callback undefined
            array_reduce(
                messages,//message的数组的每个值调用promiseDispatch方法
                function (undefined, message) {
                    Q.nextTick(function () {//
                        //Modified by LiuJQ
                        console.log("deferred.resolve  array_reduce  Q.nextTick callee message\n",message)
                        newPromise.promiseDispatchReal.apply(newPromise, message);
                        //newPromise.promiseDispatchReal(message);
                    });
                },
                void 0
            );
            //
            messages = void 0;//消息数组设置为空
            progressListeners = void 0;//监听设置为空
        }//


        //promise
        deferred.promise = promise;
        //
        deferred.resolve = function (value) {
            if (resolvedPromise) {//存在则返回
                return;
            }
            //实例化Q
            become(Q(value));//Q中实例化Promise
        };

        deferred.fulfill = function (value) {
            if (resolvedPromise) {
                return;
            }

            become(fulfill(value));
        };
        deferred.reject = function (reason) {
            if (resolvedPromise) {
                return;
            }

            become(reject(reason));
        };
        deferred.notify = function (progress) {
            if (resolvedPromise) {
                return;
            }
            //
            array_reduce(progressListeners, function (undefined, progressListener) {
                Q.nextTick(function () {
                    progressListener(progress);
                });
            }, void 0);
        };

        return deferred;
    }
///////////////deferred定义结束///////////////////

Q.Promise = promise; // ES6
Q.promise = promise;
//resolver传入的参数，由客户端定义
function promise(resolver) {
   if (typeof resolver !== "function") {
            throw new TypeError("resolver must be a function.");
   }
   var deferred = defer();
   try {
       resolver(deferred.resolve, deferred.reject, deferred.notify);
   } catch (reason) {
       deferred.reject(reason);
   }
   return deferred.promise;
}

Q.makePromise = Promise;
/////////////////////////////////////////////////////////////////////////////////////////////////////
    function Promise(descriptor, fallback, inspect) {
        //fulfill调用时，传入的fallback为未定义，inspect为{ state: "fulfilled", value: value }
        if (fallback === void 0) {//回调方法为null
            fallback = function (op) {//定义默认的回调方法
                return reject(new Error(
                    "Promise does not support operation: " + op
                ));
            };
        }
        //检查函数初始化状态为未知
        if (inspect === void 0) {
            inspect = function () {
                return {state: "unknown"};
            };
        }
        //创建Promise实例，这里痛defer调用的代码一样
        var promise = object_create(Promise.prototype);
        //定义promise，promiseDispatch调用真实的代码
        promise.promiseDispatchReal = function (resolve, op, args) {//Promise promiseDispatch
            var result;
            try {
                if (descriptor[op]) {//promise执行descriptor[op]
                    result = descriptor[op].apply(promise, args);//在对象promise上运行promise
                } else {//没有descriptor[op]时，在promise上执行回调
                    result = fallback.call(promise, op, args);//当不在操作符中调用回调函数descriptor[op]
                }
            } catch (exception) {
                result = reject(exception);
            }
            if (resolve) {
                //LiuJQ
                console.log("*********promise.promiseDispatchReal define Resolvs Message->************\n",resolve)
                resolve(result);
            }
        };
        //
        promise.inspect = inspect;

        // XXX deprecated `valueOf` and `exception` support
        if (inspect) {//状态检查存在
            var inspected = inspect();
            if (inspected.state === "rejected") {//状态为拒绝
                promise.exception = inspected.reason;
            }

            promise.valueOf = function () {//Promise 定义valueOf方法
                var inspected = inspect();
                if (inspected.state === "pending" ||
                    inspected.state === "rejected") {
                    return promise;
                }
                return inspected.value;
            };
        }

        return promise;
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////
    Promise.prototype.then = function (fulfilled, rejected, progressed) {
        //
        var self = this;
        //defer中定义了promise
        var deferred = defer();//定义延期实例
        var done = false;   // ensure the untrusted promise makes at most a
                            // single call to one of the callbacks

        function _fulfilled(value) {
            try {//如果是函数则执行或者值则返回
                return typeof fulfilled === "function" ? fulfilled(value) : value;
            } catch (exception) {
                return reject(exception);
            }
        }

        function _rejected(exception) {//拒绝
            if (typeof rejected === "function") {
                makeStackTraceLong(exception, self);//跟踪
                try {
                    return rejected(exception);
                } catch (newException) {
                    return reject(newException);
                }
            }
            return reject(exception);
        }

        function _progressed(value) {//过程
            return typeof progressed === "function" ? progressed(value) : value;
        }

        //产生新的Promise实例
        //nextTick执行过程，Q.nextTick是个异步队列，在这个异步队列中的task就是异步函数，实际的异步方法为self.promiseDispatch(
        //function (resolve, op, args).Q.nextTick执行self.promiseDispatch
        Q.nextTick(function () {//resolve,L575 defer中定义的promise.promiseDispatch
            console.log("then Q.nextTick promiseDispatchToTick callee");
            //此处的self和defer中定义的是两个不同promise
            self.promiseDispatchToTick(//放入L575 defer中定义的promise.promiseDispatch
                function (value) {
                    if (done) {
                        return;
                    }
                    done = true;
                    //deferz中有自己的promise
                    deferred.resolve(_fulfilled(value));
                },
                "when", //op
                [
                    function (exception) {//arguments
                        if (done) {
                            return;
                        }
                        done = true;
                        deferred.resolve(_rejected(exception));
                    }
                ]
            );
        });//Q.nextTick Over

        // Progress propagator need to be attached in the current tick.
        //进程传播需要添加到当前的执行点中
        //         function (resolve,   op,            args) L578 defer中定义的promiseDispatch
        console.log("then  promiseDispatchToTick callee");
        self.promiseDispatchToTick(void 0, "when", [void 0, function (value) {
            var newValue;
            var threw = false;
            try {
                newValue = _progressed(value);
            } catch (e) {
                threw = true;
                if (Q.onerror) {
                    Q.onerror(e);
                } else {
                    throw e;
                }
            }
            if (!threw) {
                deferred.notify(newValue);
            }
        }]);

        return deferred.promise;
    };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**    **************************************************************************************************     **/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Q.when = when;
function when(value, fulfilled, rejected, progressed) {
    return Q(value).then(fulfilled, rejected, progressed);
}


function coerce(promise) {
    var deferred = defer();
    Q.nextTick(function () {
        try {
            promise.then(deferred.resolve, deferred.reject, deferred.notify);
        } catch (exception) {
            deferred.reject(exception);
        }
    });
    return deferred.promise;
}

Q.master = master;
function master(object) {
    return Promise({
        "isDef": function () {}
    }, function fallback(op, args) {
        return dispatch(object, op, args);
    }, function () {
        return Q(object).inspect();
    });
}

Q.spread = spread;
function spread(value, fulfilled, rejected) {
    return Q(value).spread(fulfilled, rejected);
}

Promise.prototype.spread = function (fulfilled, rejected) {
    return this.all().then(function (array) {
        return fulfilled.apply(void 0, array);
    }, rejected);
};
Q.spread = spread;
function spread(value, fulfilled, rejected) {
    return Q(value).spread(fulfilled, rejected);
}

Promise.prototype.spread = function (fulfilled, rejected) {
    return this.all().then(function (array) {
        return fulfilled.apply(void 0, array);
    }, rejected);
};


Q.async = async;
function async(makeGenerator) {
    return function () {
        return callback();
    };
}
Q.spawn = spawn;
function spawn(makeGenerator) {
    Q.done(Q.async(makeGenerator)());
}

Q["return"] = _return;
function _return(value) {
    throw new QReturnValue(value);
}

Q.promised = promised;
function promised(callback) {
    return function () {
        return spread([this, all(arguments)], function (self, args) {
            return callback.apply(self, args);
        });
    };
}

Q.dispatch = dispatch;
function dispatch(object, op, args) {
    return Q(object).dispatch(op, args);
}

Promise.prototype.dispatch = function (op, args) {
    var self = this;
    var deferred = defer();
    Q.nextTick(function () {
        self.promiseDispatch(deferred.resolve, op, args);
    });
    return deferred.promise;
};

Q.del = // XXX legacy
Q["delete"] = function (object, key) {
    return Q(object).dispatch("delete", [key]);
};
Promise.prototype.del = // XXX legacy
Promise.prototype["delete"] = function (key) {
    return this.dispatch("delete", [key]);
};

Q.mapply = // XXX As proposed by "Redsandro"
Q.post = function (object, name, args) {
    return Q(object).dispatch("post", [name, args]);
};

Promise.prototype.mapply = // XXX As proposed by "Redsandro"
Promise.prototype.post = function (name, args) {
    return this.dispatch("post", [name, args]);
};
return Q;
});