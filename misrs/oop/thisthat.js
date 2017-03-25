console.log("start");
var foo = {x: 10};
var bar = {
    x: 20,
    test: function () {
        console.log(this === bar); // true
        console.log(this.x); // 20
        //this = foo; // error ,不能给this赋值，在运行时发现错误
        console.log(this.x); // if there wasn't an error then 20, not 10，10
    }
};
// on entering the context this value is
// determined as "bar" object; why so - will
// be discussed below in detail
//进入this上下文，this的值是bar对象声明的
bar.test(); // true, 20
foo.test = bar.test;
// however here this value will now refer
// to "foo" – even though we're calling the same function
foo.test(); // false, 10
console.log("over");
