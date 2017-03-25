var Kareem  = require('../../external/kareem-1.1.3');

var assert=require('assert');
var hooks =new Kareem();
(function () {

    hooks.pre('cook', true, function(next, done) {
        this.bacon = 3;
        next();
        setTimeout(function() {
            done();
        }, 5);
    });

    hooks.pre('cook', true, function(next, done) {
        next();
        var _this = this;
        setTimeout(function() {
            _this.eggs = 4;
            done();
        }, 10);
    });

    hooks.pre('cook', function(next) {
        this.waffles = false;
        next();
    });

    hooks.post('cook', function(obj) {
        obj.tofu = 'no';
    });

    var obj = { bacon: 0, eggs: 0 };

    var cook = hooks.createWrapper(
        'cook',
        function(o, callback) {
            assert.equal(3, obj.bacon);
            assert.equal(4, obj.eggs);
            assert.equal(false, obj.waffles);
            assert.equal(undefined, obj.tofu);
            callback(null, o);
        },
        obj);

    cook(obj, function(error, result) {
        assert.ifError(error);
        assert.equal(3, obj.bacon);
        assert.equal(4, obj.eggs);
        assert.equal(false, obj.waffles);
        assert.equal('no', obj.tofu);

        assert.equal(obj, result);
        appRealDone(obj);
    });
    function  appRealDone(count) {
        console.log("done ok,count is ",count);

    }
})();