var thunkify=require("../../external/qbase/thunkify");
function f_Promise(a,b, callback) {
    var sum=a+b;
    callback(sum);//回调函数,thunkify化后为done方法
}
function log(c){
    console.log("this log->",c);
}
var thunkified = thunkify(f_Promise);//return function(){//thunkify
var noCallback=thunkified(2,4);//thunkify的回调函数执行
noCallback(log);//回调函数执行，把回调函数写入
