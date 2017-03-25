var co=require("../../external/qbase/co");
var  path = require('path');
var fs =require( 'fs');

var readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function(error, data) {
            if (error) reject(error);
            resolve(data);
        });
    });
};

//自动运行Generator，它首先是个Promise对象
function runGenerator(gen){
    var g = gen();
    function next(data){
        var result = g.next(data);
        if (result.done) return result.value;
        result.value.then(function(data){
                next(data);
            }
        ).catch(function (err) {
            next(err);
        });
    }
    next();
}

(function promiseFS(callback) {
    var res="";
    readFile(path.join(__dirname, './f_Q_t.js'))
        .then(function(data){
            res=res.concat(data.toString());
            return res;
        })
        .then(function(){//读第二个文件
            return readFile(path.join(__dirname,'./thunklog.js'));
        })
        .then(function(data){
            var d=res.concat(data.toString());
            return d;
        })
        .then(function(data){
            if(callback){
                callback(data);
            }
        })
        .catch(function(err) {
            console.log(err);
        });

})(function (data) {
    console.log(data);
});

(function genFS(callback) {
    var gen = function* (){
        var f1 =yield readFile(path.join(__dirname, './f_Q_t.js'));
        var f2 =yield readFile(path.join(__dirname,'./thunklog.js'));
        if(callback){
            callback(f1.toString().concat(f2.toString()))
        }
    };
    runGenerator(gen);
})(function (data) {
    console.log(data);
});

//采用co实现
(function coFS(callback) {
    var gen = function* (){
        try {
            var f1 =  yield  readFile(path.join(__dirname, './f_Q_t.js'));
            var f2 = yield  readFile(path.join(__dirname,'./thunklog.js'));
            if(callback){
                callback(f1.toString().concat(f2.toString()))
            }
        }catch (err){
            console.log(err);
        }
    };
    //co(gen);

})(function (data) {
    console.log(data);
});

/**
function onerror(err) {
    console.error(err);
}

co(function* () {
    // yield any promise
    return yield Promise.resolve(true);
}).then(function (val) {
    console.log(val);
}, function (err) {
    console.error(err.stack);
});

co(function *(){
    // resolve multiple promises in parallel
    var a = Promise.resolve(1);
    var b = Promise.resolve(2);
    var c = Promise.resolve(3);
    var res = yield [a, b, c];
    console.log(res);
    // => [1, 2, 3]
}).catch(onerror);

// errors can be try/catched
co(function *(){
    try {
        yield Promise.reject(new Error('boom'));
    } catch (err) {
        console.error(err.message); // "boom"
    }
}).catch(onerror);



// 对象的写法
co(function* () {
    var res = yield {
        1: Promise.resolve(1),
        2: Promise.resolve(2),
    };
    console.log(res);
}).catch(onerror);

co(function* () {
    var values = [n1, n2, n3];
    yield values.map(somethingAsync);
});
function* somethingAsync(x) {
    // do something async
    return y
}
**/