//构造函数
function Person(name) {
    this.name = name;
}
//定义Person的原型，原型中的属性可以被自定义对象引用
Person.prototype = {
    getName: function() {
        return this.name;
    }
}
var hao= new Person("haorooms");
console.log(hao.getName()); //"haorooms"
