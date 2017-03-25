var hooks = require('../../external/hooks-fixed-promised-1.2.0/hooks');
var assert=require('assert');
var _={extend: Object.assign};

//should handle parallel followed by serial
(function () {
    function remoteServiceOne() {

    }
    remoteServiceOne.validate=function (arg1,callback) {

        setTimeout(function () {
            console.log("remoteServiceOne-validate");
            if(callback){
                callback(void 0,true);
            }
        }, 1000);
    };

    function remoteServiceTwo() {

    }
    remoteServiceTwo.validate=function (arg1,callback) {
        console.log("remoteServiceTwovalidate");
        if(callback){
            callback(void 0,true);
        }
    };
    var A = function () {};
    _.extend(A, hooks);
    A.prototype.serialize=function () {
        console.log("serialize");
    };
    /**
     A.prototype.save = function (val, callback) {
        this.value = val;
        console.log("save this.value,",this.value);
        callback();
    };
     **/
    A.hook('save',  function (val, callback) {
        console.log("save this.value,",this.value);
        //callback();
    });

    A.pre('save', true, function(next, done,option,callback) {
        var self=this;

        process.nextTick(function() {
            self.value=100;
            done();
        });
        next();
    }).pre('save',true, function(next,done,option,callback) {
        var self=this;
        process.nextTick(function() {
            console.log("pre self.value,",self.value);
            self.value=self.value+30;
            done();
        });
        next();
    });
    A.pre('save',true, function(next,done,option,callback) {
        var self=this;
        console.log("pre self.value,",self.value);

        process.nextTick(function() {
            console.log("pre self.value,",self.value);
            self.value=self.value+30;
            done();
        });
        next();
    });
    //
    A.pre('save', true, function preOne (next, done) {
        var self =this;

        process.nextTick(function() {
            remoteServiceOne.validate(self.serialize(), function (err, isValid) {
                // The code in here will probably be run after the `next` below this block
                // and could possibly be run after the console.log("Hola") in `preTwo
                if (err) return done(err);
                if (isValid) done();
            });
        });
        next(); // Pass control to the next middleware
    });
    // We will suppose that we need 2 different remote services to validate our document
    A.pre('save', true, function preTwo (next, done) {
        var self=this;
        process.nextTick(function() {
            remoteServiceTwo.validate(self.serialize(), function (err, isValid) {
                if (err) return done(err);
                if (isValid) done();
            });
        });
        next();
    });
    A.post('save', function (next) {
        console.log("post save this.value,",this.value);
        this.value += 2;
        //setTimeout(next(new Error("err")), 0);
        var self=this;
        self.value += 12;
        process.nextTick(function() {
            self.value += 200;
            //next(new Error("err"));
            next();
        });
    }).post('save', function (next) {
        console.log("post save this.value,",this.value);
        this.value += 3;
        setTimeout(next, 0);
    }).post('save', function (next) {
        console.log("post save this.value,",this.value);
        this.value2 = 3;
        setTimeout(next(), 0);
    });
    var a = new A();
    a.save(2, function(err){//
        assert.ok(true);
        if(err){
            console.log("err,",a.value);
        }

    });
    console.log("........");
})();

