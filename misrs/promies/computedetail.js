var compute = function* (a, b) {
    console.log("start...");

    var sum = yield  a + b;//1
    console.log("+->,",sum);

    var c =yield  a - b;//2
    console.log("-->,",c);

    var d =yield  a * b;//3
    console.log("*->,",d);

    var e =  yield a / b;//4
    console.log("/->,",e);
    return e;
};

var generator = compute(8, 2);//
//停止进行计算，并返回计算结构
var d=0;
d=generator.next(d.value);//1,进入生成器
//返回值,并继续
d=generator.next(d.value);//2
//
d=generator.next(d.value);//3

d=generator.next(d.value);//4

d=generator.next(d.value);//5