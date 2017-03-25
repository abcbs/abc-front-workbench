var hooks = require('../../external/hooks-fixed-promised-1.2.0/hooks');
var assert=require('assert');
var _={extend: Object.assign};

/**
(function postMiddleware(){
    function Document(){

    }
    Document.prototype.save=function () {
        console.log("save");
    };

    Document.prototype.set=function () {
        console.log("set");
    };
    for (var k in hooks) {
        Document[k] = hooks[k];
    }
    Document.hook('set', function (path, val) {
        this[path] = val;
    }, function (err) {
        // Handler the error here
        console.error(err);
    });

    Document.pre('set', function (next, path, val) {
        //next(new Error());
        next();
    });

    var doc = new Document();
    doc.set('hello', 'world');
    console.log(doc.hello); // world

})();
**/

//should run only posts up until an error

(function() {
    var A = function () {};
    Object.assign(A, hooks);
    A.hook('save', function () {//save
        this.value = 1;
    }, function (err) {
        console.log(err);
    });
    A.post('save', function (next) {//post-1
        console.log("post save",this.value);
        this.value = 2;
        next();
    }).post('save', function (next) {//post-2
        console.log("post save",this.value);
        this.value = 3;
        //next(new Error("3-error"));
        next();
    }).post('save', function (next) {////post-3
        console.log("post save",this.value);
        this.value = 4;
        next();
    });
    var a = new A();
    a.save();
    //assert.equal(a.value,3);
})();

/**
//should fall back first to the hook method's last argument as the error handler if it is a function of arity 1 or 2
(function () {
    var A = function () {};
    _.extend(A, hooks);
    var counter = 0;
    A.hook('save', function (callback) {
        this.value = 1;
    });
    A.pre('save', true, function (next, done) {
        next();
        done();//没有done则不执行save方法
    });
    var a = new A();
    a.save( function (err) {
        if (err instanceof Error) counter++;
    });
    //assert.equal(a.value,1);

})();

//should fall back second to the default error handler if specified
(function () {
    var A = function () {};
    _.extend(A, hooks);
    var counter = 0;
    A.hook('save', function (callback) {
        this.value = 1;
    }, function (err) {
        if (err instanceof Error) counter++;
    });
    A.pre('save', true, function (next, done) {
        next(new Error());
        //next();
        //done();
    });
    var a = new A();
    a.save();
    assert.equal(counter,1);

})();


//fallback default error handler should scope to the object
(function () {
    var A = function () {
        this.counter = 0;
    };
    _.extend(A, hooks);
    var counter = 0;
    A.hook('save', function (callback) {
        this.value = 1;
    }, function (err) {
        if (err instanceof Error) this.counter++;
    });
    A.pre('save', true, function (next, done) {
        next(new Error());
    });
    var a = new A();
    a.save();
})();

//should not run any posts if a pre fails
(function () {
    var A = function () {};
    _.extend(A, hooks);
    A.hook('save', function () {
        this.value = 2;
    }, function (err) {
        if (err instanceof Error) this.value++;
    });
    A.pre('save', function (next,done) {
        this.value = 1;
        //next(new Error());
        next();
    }).post('save', function (next) {
        this.value = 3;
        next();
    });
    var a = new A();
    a.save();

})();
//can pass the hook's arguments verbatim to pres
(function () {
    var A = function () {};
    _.extend(A, hooks);
    A.hook('set', function (path, val) {
        this[path] = val;
    });
    A.pre('set', function (next, path, val) {
        next();
    });
    var a = new A();
    a.set('hello', 'world');

})();

//can pass the hook's arguments verbatim to posts
(function () {
        var A = function () {};
        _.extend(A, hooks);
        A.hook('set', function (path, val) {
            this[path] = val;
        });
        A.post('set', function (next, path, val) {
            next();
        });
        var a = new A();
        a.set('hello', 'world');
})();

//pres should be able to modify and pass on a modified version of the hook's arguments
( function () {
    var A = function () {
    };
    _.extend(A, hooks);
    A.hook('set', function (path, val) {
        this[path] = val;
        assert.equal(arguments[2], 'optional');
    });
    A.pre('set', function (next, path, val) {
        next('foo', 'bar');
    });
    A.pre('set', function (next, path, val) {
        assert.equal(path, 'foo');
        assert.equal(val, 'bar');
        next('rock', 'says', 'optional');
    });
    A.pre('set', function (next, path, val, opt) {
        assert.equal(path, 'rock');
        assert.equal(val, 'says');
        assert.equal(opt, 'optional');
        next();
    });
    var a = new A();
    a.set('hello', 'world');
    assert.equal(typeof a.hello, 'undefined');

})();


//should not invoke the target method until all asynchronous middleware have invoked dones


/**
//calling the same done multiple times should have the effect of only calling it once
(function () {
    var A = function () {
        this.acked = false;
    };
    _.extend(A, hooks);
    A.hook('ack', function () {
        console.log("UH OH, YOU SHOULD NOT BE SEEING THIS");
        this.acked = true;
    });
    A.pre('ack', true, function (next, done) {
        next();
        done();
        //done();
    });
    A.pre('ack', true, function (next, done) {
        next();
        // Notice that done() is not invoked here
        done();
    });
    var a = new A();
    a.ack();

    setTimeout( function () {
         console.log('a.acked,',a.acked);
    }, 1000);
})();

//#pre should lazily make a method hookable
(function () {
    var A = function () {};
    _.extend(A, hooks);
    A.prototype.save = function () {
        this.value = 1;
    };
    A.pre('save', function (next) {
        this.preValue = 2;
        next();
    });
    A.post('save', function (next) {
        this.value = 2;
        next();
    });
    var a = new A();
    a.save();

})();
**/


/**

//asynchronous middleware should be able to pass an error via `done`, stopping the middleware chain
(function () {
    var counter = 0;
    var A = function () {};
    _.extend(A, hooks);
    A.hook('set', function (path, val, fn) {
        counter++;
        this[path] = val;
        fn();
    });
    A.pre('set', true, function (next, done, path, val, fn) {
        console.log(path);
        console.log(val);
        setTimeout(function () {
            counter++;
            done(new Error);
            //done();//set的参数fn
        }, 1000);
        next();
    });
    var a = new A();
    a.set('hello', 'world', function (err) {
        console.log(err);
    });
})();

/**

**/
