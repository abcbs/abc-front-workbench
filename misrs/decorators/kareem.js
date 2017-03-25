var Kareem  = require('../../external/kareem-1.1.3');

var assert=require('assert');
var count = 0;

var hooks =new Kareem();

function  appRealDone(count) {
    console.log("done ok,count is ",count);

}
/**
(function base() {
    var count = 0;

    hooks.pre('cook', function(done) {
        ++count;
        done();
    });

    hooks.execPre('cook', null, function () {
        assert.equal(1, count);
        appRealDone(count);
    });
})();

(function runmultipe() {
    var count1 = 0;
    var count2 = 0;

    hooks.pre('runmultipe', function(done) {//
        ++count1;
        done();
    });

    hooks.pre('runmultipe', function(done) {
        ++count2;
        done();
    });

    hooks.execPre('runmultipe', null, function(error) {
        assert.equal(null, error);
        assert.equal(1, count1);
        assert.equal(1, count2);
        appRealDone(count1);
    });
})();

(function attachescontext() {
    hooks.pre('cook', function(done) {
        this.bacon = 3;
        done();
    });

    hooks.pre('cook', function(done) {
        this.eggs = 4;
        done();
    });

    var obj = { bacon: 0, eggs: 0 };

    // In the pre hooks, `this` will refer to `obj`
    hooks.execPre('cook', obj, function(error,first) {//pre-callback
        assert.equal(null, error);
        assert.equal(3, obj.bacon);
        assert.equal(4, obj.eggs);
        appRealDone(obj);
    });

})();
**/
(function parallelPreHooks() {
    hooks.pre('parallelPreHooks', true, function(next, done) {
        this.bacon = 3;
        next();
        setTimeout(function() {
            done();
        }, 1);
    });

    hooks.pre('parallelPreHooks', true, function(next, done) {
        next();
        var _this = this;
        setTimeout(function() {
            _this.eggs = 4;
            done();
        }, 1);
    });

    hooks.pre('parallelPreHooks', function(next) {
        this.waffles = true;
        next();
    });

    var obj = { };

    hooks.execPre('parallelPreHooks', obj, function() {
        assert.equal(3, obj.bacon);
        assert.equal(4, obj.eggs);
        //assert.equal(false, obj.waffles);
        appRealDone(obj);
    });

})();
/**
(function postHooks() {
    var execed = {};
    //post的参数数量与execPost中的args个数相等
    hooks.post('cook', function(eggs) {//1
        console.log("eggs 1");
        execed.second = true;
        assert.equal(1, eggs);

    });
    hooks.post('cook', function(eggs, bacon) {//2
        console.log("eggs, bacon 2");
        execed.first = true;
        assert.equal(1, eggs);
        assert.equal(2, bacon);
    });
    //callback为异常处理方法
    hooks.post('cook', function(eggs, bacon,callback) {//3
        console.log("eggs, bacon, callback,2");
        execed.second = true;
        assert.equal(1, eggs);
        assert.equal(2, bacon);

    });
    //callback为异常处理方法
    hooks.post('cook', function(eggs, bacon, cook,callback) {//4
        console.log("eggs, bacon, cook,callback 4 ");
        execed.second = true;
        assert.equal(1, eggs);
        assert.equal(2, bacon);
        //callback(new Error("ok"));
        //throw new Error("出现异常")
    });


    hooks.post('cook', function(eggs, bacon,cook,callback) {//5
        console.log("eggs, bacon, callback 5,",callback);
        execed.second = true;
        assert.equal(1, eggs);
        assert.equal(2, bacon);
    });

    hooks.post('cook', function(eggs, cook,third,forth,five,callback) {//6
        console.log("eggs, bacon, callback 6,",callback);
        execed.second = true;
        assert.equal(1, eggs);
        assert.equal(2, cook);
    });

    hooks.post('cook', function(eggs, cook,third,forth) {//7
        console.log("eggs, bacon, callback 7,",third);
        execed.second = true;
        assert.equal(1, eggs);
        assert.equal(2, cook);
    });

    hooks.post('cook', function(eggs, cook,callback) {//8
        console.log("eggs, bacon, callback 8,",callback);
        execed.second = true;
        assert.equal(1, eggs);
        assert.equal(2, cook);
    });
    hooks.post('cook', function(eggs, cook,callback) {//9
        console.log("eggs, bacon, callback 9,",callback);
        execed.second = true;
        assert.equal(1, eggs);
        assert.equal(2, cook);
    });

    //差两个
    hooks.execPost('cook', null, [1, 2], function callback(error, eggs, bacon) {
         assert.ifError(error);
         assert.equal(2, Object.keys(execed).length);
         assert.ok(execed.first);
         assert.ok(execed.second); assert.equal(1, eggs);
         assert.equal(2, bacon);
         appRealDone(execed);
    });

    var _this=this;
    var error;
    hooks.execPost('cook', this, [ 1,2,3,4], { error: error }, function(error) {//execPost-error
        //next(error);
        console.log("Ok");
    });
})();
 **/


