var hooks = require('../../external/hooks-fixed-promised-1.2.0/hooks');
var assert=require('assert');
var _={extend: Object.assign};

//should not run a hook if a pre fails
(function () {
    var A = function () {};
    Object.assign(A, hooks);
    var counter = 0;
    A.hook('save', function () {
        console.log("hook save");
        this.value = 1;
    }, function (err) {
        counter++;
    });
    A.pre('save', true, function (next, done) {
        console.log("pre save");
        //next(new Error());
        next();
        done()
    });
    A.pre('save', true, function (next, done) {
        console.log("pre save");
        //next(new Error());
        next();
        done()
    });
    A.post('save', function (next) {
        console.log("post save");
        next();
    });
    A.post('save', function (next) {
        console.log("post save");
        //next(new Error());
        next();
    });
    var a = new A();
    a.save();

})();