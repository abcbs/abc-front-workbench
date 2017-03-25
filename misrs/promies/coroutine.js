function* gen(x){
    var y = yield x + 2;
    return y;
}
var g = gen(1);
var result=g.next() ;// { value: 3, done: false }
console.log(result);
result=g.next(2); // { value: 2, done: true }
console.log(result);

//第一个next方法的value属性，返回表达式x + 2的值（3）。
// 第二个next方法带有参数2，这个参数可以传入 Generator 函数，作为上个阶段异步任务的返回结果，被函数体内的变量y接收。
// 因此，这一步的 value 属性，返回的就是2（变量y的值）。

//Generator函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。
function* genThrow(x){
    try {
        var y = yield x + 2;
    } catch (e){
        console.log(e);
    }
    return y;
}
var gThrow = genThrow(1);
var throwResult=gThrow.next();
console.log(throwResult);
gThrow.throw('出错了');
// 出错了
//Generator函数体外，使用指针对象的throw方法抛出的错误，可以被函数体内的try ...catch代码块捕获。
// 这意味着，出错的代码与处理错误的代码，实现了时间和空间上的分离，这对于异步编程无疑是很重要的。