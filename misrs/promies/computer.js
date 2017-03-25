//它的奥妙就在其中的yield命令。它表示执行到此处，执行权将交给其他协程。也就是说，yield命令是异步两个阶段的分界线。
function* gen(x){
    var y = yield x + 2;
    return y;
}
var g = gen(1);
console.log(g.next());// { value: 3, done: false }
console.log(g.next(2));// { value: undefined, done: true }

var genExp=function* (x) {
    var e;
    var sum = x + 2;
    e=yield sum;//-1
    e=x+3;//再次计算e的值
    return e;
};
var ge = genExp(1);
console.log(ge.next(1200));// { value: 3, done: false }
console.log(ge.next());// { value: undefined, done: true }

var compute1 = function* (a, b) {
    var e;
    var sum = a + b;
    e=yield sum;//-1
    var c = a - b;
    e=yield c;//-2
    var d = a * b;
    e=yield d;//-3
    e = a / b;
    return e;
};
var generator = compute1(6, 2);
console.log(generator.next()); // { value: 6, done: false }//-1,即加的结果返回
console.log(generator.next()); // { value: 2, done: false }//-2
console.log(generator.next()); // { value: 8, done: false }//-3
console.log(generator.next()); // { value: 2, done: true }//-4
