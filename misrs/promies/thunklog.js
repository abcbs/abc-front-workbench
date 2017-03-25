var Thunk = function(fn){
    console.log("匿名函数包裹:",fn);
    return function (){
        //arguments为再次调用的参数
        //slice方法可从已有的数组中返回选定的元素。再次调用时的参数
        var args = Array.prototype.slice.call(arguments);
        console.log("参数:",args);
        return function (callback){
            //把上面的回调callback参数放入参数队列
            args.push(callback);
            //fn为原来输入的参数，执行原来的方法
            return fn.apply(this, args);
        }
    };
};

//callback回调函数
function f(a,b, callback) {
    var sum=a+b;
    //setInterval(test,5000);
    //回调函数,回调函数定义在thunkify
    callback(sum);
    return sum;
}

function log(c){
    console.log("this log->",c);
}
//Thunk化
var ft = Thunk(f);
var f_f=ft(1,2);
var r1=f_f(log) ;