function compose() {
    for (var _len = arguments.length, funcs =
        Array(_len), _key = 0; _key < _len; _key++) {
        funcs[_key] = arguments[_key];
    }
    if (funcs.length === 0) {
        return function (arg) {
            return arg;
        };
    }
    if (funcs.length === 1) {
        return funcs[0];
    }

    var last = funcs[funcs.length - 1];
    var rest = funcs.slice(0, -1);
    return function () {
        //reduceRight()从数组的末尾向前将数组中的数组项做累加。
        //arr.reduceRight(function (preValue,curValue,index,array)
        return rest.reduceRight(function (composed, f) {//以前值，当前值
                return f(composed);
            },
            last.apply(undefined, arguments)//此项为初始值
        );//右计算结束
    };
}

function first(composed) {
    console.log(composed,"first");
    return "first";
}
function second(composed) {
    console.log(composed,"second");
    return "second";
}
function third(composed) {
    console.log(composed,"third");
    return "third";
}
var f=compose(first,second,third);
f();
console.log("over");