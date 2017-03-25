var hooks = require('../../external/hooks-fixed-promised-1.2.0/hooks');
var assert=require('assert');
var _={extend: Object.assign};

//should intercept method callbacks for post handlers
(function () {
    var A = function () {};
    _.extend(A, hooks);
    A.hook('save', function (val, callback) {
        this.value = val;
        callback();
    });
    A.pre('save', true,function (next,done) {
        this.value = 2;
        next();
        done();
    });
    A.post('save', function (next) {
        assert.equal(a.value, 2);
        this.value += 2;
        setTimeout(next, 10);
    }).post('save', function (next) {
        assert.equal(a.value, 4);
        this.value += 3;
        setTimeout(next, 10);
    }).post('save', function (next) {
        assert.equal(a.value, 7);
        this.value2 = 3;
        setTimeout(next, 10);
    });
    var a = new A();
    a.save(2, function(){
        assert.equal(a.value, 7);
        assert.equal(a.value2, 3);
    });
})();
