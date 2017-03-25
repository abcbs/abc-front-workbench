import 'isomorphic-fetch';
import path from 'path';
import fs from 'fs';
import thunkify from '../../external/qbase/thunkify';
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
//自动运行
function runThunk(fn) {
    if(fn==void 0){
        throw new Error("没有方法");
    }
    var gen;
    if (typeof fn === 'function'){
        gen = fn();
    }else{
        gen=fn;
    }
    //next函数就是Thunk的回调函数
    function next(err, data) {
        //先将指针移到Generator函数的下一步
        var result = gen.next(data);//第一次进入，和回调函数
        //判断Generator函数是否结束
        if (result.done) {
            return;
        }
        //如果没结束，就将next函数再传入Thunk函数（result.value属性）
        result.value(next);//thunkify的第-步，fn方法执行，function(done)
    }
    next();
}

//自动解析Fetch方式
function runFetch(callback) {
    //Generator函数封装了一个异步操作，该操作先读取一个远程接口，
    // 然后从JSON格式的数据解析信息。就像前面说过的，这段代码非常像同步操作，除了加上了yield命令。
    function* gen(){
        try{
            var url = 'httpxs://api.github.com/users/github';
            var result = yield fetch(url);//执行权将交给其他协程
            var data =yield result.json();
            if(callback){
                callback(void 0,data);
            }
        }catch (err){
            if(callback){
                callback(new Error("fetch err:"));
            }
        }
    }
    runGenerator(gen);

}

//手工解析Fecth方式
function readWithGen(callback) {
    //Generator函数封装了一个异步操作，该操作先读取一个远程接口，
    // 然后从JSON格式的数据解析信息。就像前面说过的，这段代码非常像同步操作，除了加上了yield命令。
   function* gen(){
        var url = 'https://api.github.com/users/github';
        var result = yield fetch(url);//执行权将交给其他协程
        if(callback){
            callback(result.bio);
        }
    }
    var g = gen();
    var result = g.next();//异步的第一阶段
    //result返回的是Promise对象
    result.value.then(function(data){
        return data.json();//完成数据格式转换
    }).then(function(data){
       g.next(data);//异步的第二阶段
    });
    //首先执行Generator函数，获取遍历器对象，然后使用next 方法（第二行），
    // 执行异步任务的第一阶段。由于Fetch模块返回的是一个Promise对象，因此要用then方法调用下一个next 方法。

}

var readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function(error, data) {
            if (error) reject(error);
            resolve(data);
        });
    });
};

function genFS(callback) {
    var gen = function* (){
        var f1 =yield readFile(path.join(__dirname, './read.txt'));
        var f2 =yield readFile(path.join(__dirname,'./readme.txt'));
        if(callback){
            callback(f1.toString().concat(f2.toString()))
        }
    };
    runGenerator(gen);
}

function asyncFS(callback) {
    var asyncReadFile = async function (){
        try {
            var f1 = await readFile(path.join(__dirname, './read.txt'));
            var f2 = await readFile(path.join(__dirname,'./readme.txt'));
            if(callback){
                callback(f1.toString().concat(f2.toString()))
            }
        }catch (err){
            console.log(err);
        }
    };
    asyncReadFile();
    
}

var genThunify = function* (callback){
    try{
    var readF = thunkify(fs.readFile);
    //console.log("genThunify enter");
    var f1 = yield readF(path.join(__dirname, './read.txt'));
    //console.log(f1.toString());
    var f2 = yield readF(path.join(__dirname, './readme.txt'));
    //console.log(f2.toString());
    var f3 = yield readF(path.join(__dirname, './read.txt'));
    //console.log(f3.toString());
    if(callback){
        callback(void 0,f1.toString().concat(f2.toString()).concat(f3.toString()));
    }
    }catch (e){
        console.log(e);
        if(callback){
            callback(e);
        }
    }
};

function thunkifyRunFS(callback) {

    var g = genThunify(callback);
    runThunk(g);

}
//手工解析
function thunkifyFS(callback) {
    var g = genThunify(callback);
    console.log("g.next-2");
    var r1 = g.next();// yield readF('./foo.js');
    console.log("r1.value-3");
    r1.value(function(err, data){
        console.log("r1.value-4 enter callback");
        if (err) throw err;
        console.log("r1.value-5 g.next(data) ");
        var r2 = g.next(data);// yield readF('./foorun.js');
        console.log("r1.value-6 r2.value");
        r2.value(function(err, data){
            if (err) throw err;
            console.log("r1.value-6 r2.value callback");
            g.next(data);//
        });
    });
}

module.exports={
    readWithGen:readWithGen,
    asyncFS:asyncFS,
    genFS:genFS,
    thunkifyFS:thunkifyFS,
    thunkifyRunFS:thunkifyRunFS,
    runFetch:runFetch
}