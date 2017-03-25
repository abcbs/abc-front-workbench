var hooks = require('../../external/hooks-fixed-promised-1.2.0/hooks');
var assert=require('assert');
var _={extend: Object.assign};
(function parallelPreMiddleware(){
    function remoteServiceOne() {

    }
    remoteServiceOne.validate=function (arg1,callback) {
        console.log("remoteServiceOne-validate");
        if(callback){
            callback(void 0,true);
        }
    };

    function remoteServiceTwo() {

    }
    remoteServiceTwo.validate=function (arg1,callback) {
        console.log("remoteServiceTwovalidate");
        if(callback){
            callback(void 0,true);
        }
    };

    function Document(){

    }
    Document.prototype.serialize=function () {
        console.log("serialize");
    };

    for (var k in hooks) {
        Document[k] = hooks[k];
    }

    Document.hook('save', function (callback) {//save
        // Save logic goes here
        console.log("hook.save");
        if(callback){
            callback();
        }
    });

    // true marks this as parallel middleware
    Document.pre('save', true, function preOne (next, done) {
        remoteServiceOne.validate(this.serialize(), function (err, isValid) {
            // The code in here will probably be run after the `next` below this block
            // and could possibly be run after the console.log("Hola") in `preTwo
            if (err) return done(err);
            if (isValid) done();
        });
        next(); // Pass control to the next middleware
    });

    // We will suppose that we need 2 different remote services to validate our document
    Document.pre('save', true, function preTwo (next, done) {
        remoteServiceTwo.validate(this.serialize(), function (err, isValid) {
            if (err) return done(err);
            if (isValid) done();
        });
        next();
    });

    // While preOne and preTwo are parallel, preThree is a serial pre middleware
    Document.pre('save', true ,function preThree (next, done) {
        console.log("pre-save");
        next();
        done();
    });

    Document.post('save', function (next) {
        console.log("post-save");
        setTimeout(next, 10);
    });

    var doc = new Document();
    doc.save( function (err) {
        console.log("ok");
    });
})();