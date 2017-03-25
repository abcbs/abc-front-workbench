var Kareem  = require('../../external/kareem-1.1.3');

var assert=require('assert');
var count = 0;

var hooks =new Kareem();

function  appRealDone(count) {
    console.log("done ok,count is ",count);

}

(function wraps() {
    hooks.pre('wraps', true, function(next, done) {
        this.bacon = 3;
        console.log("pre wraps");
        next();
        setTimeout(function() {
            done();
        }, 5);
    });

    hooks.pre('wraps', true, function(next, done) {
        console.log("pre wraps 2");
        //next(new Error("test"));
        next();
        var _this = this;
        setTimeout(function() {
            _this.eggs = 4;
            //throw  new Error("test");
            done();
        }, 10);
    });

    hooks.pre('wraps', function(next) {
        console.log("pre wraps 3");
        var self=this;
        process.nextTick(function() {
            self.waffles = false;
        });
        next();
    });
    hooks.pre('wraps', true, function(next, done) {
        console.log("pre wraps 1");
        next();
        var _this = this;
        setTimeout(function() {
            _this.eggs = 4;
            done();
        }, 5000);
    });
    
    hooks.post('wraps', function(obj) {
        obj.tofu = 'no';
        setTimeout(function() {
            (function (){
                console.log("===========\npost  1");
                console.log("obj 1,\n",obj);
            })();
        }, 5000);
    });

    hooks.post('wraps', function(obj) {
        process.nextTick(function() {
            console.log("obj 2,\n",obj);
        });
    });

    hooks.post('wraps', function(obj) {
        console.log("wraps obj 3,\n",obj);

    });

    hooks.post('wraps', function(obj) {
        process.nextTick(function() {
            console.log("post obj 4,\n",obj);
        });
    });

    var obj = { bacon: 0, eggs: 0 };

    var args = [obj];
    args.push(function(error, result) {
        assert.ifError(error);
        assert.equal(null, error);
        assert.equal(3, obj.bacon);
        assert.equal(4, obj.eggs);
        assert.equal(false, obj.waffles);
        assert.equal('no', obj.tofu);

        assert.equal(obj, result);
        appRealDone(obj);
    });

    hooks.wrap(
        'wraps',
        function(o, callback) {
            assert.equal(3, obj.bacon);
            assert.equal(4, obj.eggs);
            assert.equal(false, obj.waffles);
            assert.equal(undefined, obj.tofu);
            callback(null, o);
        },
        obj,
        args);

    console.log(".........");
})();