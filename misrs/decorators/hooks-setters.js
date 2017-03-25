var hooks = require('../../external/hooks-fixed-promised-1.2.0/hooks');
var assert=require('assert');
var _={extend: Object.assign};

(function () {
    var counter = 0;
    var A = function () {};
    _.extend(A, hooks);
    A.hook('set', function (path, val) {
        counter++;
        this[path] = val;
        assert.equal(counter,7)
    });
    A.pre('set', function (next, path, val) {
        counter++;
        next();
    });
    A.pre('set', true, function (next, done, path, val) {
        counter++;
        setTimeout(function () {
            counter++;
            done();
        }, 1000);
        next();
    });
    A.pre('set', function (next, path, val) {
        counter++;
        next();
    });
    A.pre('set', true, function (next, done, path, val) {
        counter++;
        setTimeout(function () {
            counter++;
            done();
        }, 500);
        next();
    });
    A.post('set', function (next, path, val) {
        console.log(path,val);
    });
    var a = new A();
    a.set('hello', 'world');
})();