/**
var foo = {
    bar: function () {
        alert(this);
    }
};
foo.bar(); // ①Reference, OK => foo，明显的引用类型
(foo.bar)(); //②Reference, OK => foo，在组运算的返回中，仍是一个引用类型
(foo.bar = foo.bar)(); //③ global， 函数对象
(false || foo.bar)(); //④ global，得到了函数
(foo.bar, foo.bar)(); //⑤ global，得到了函数


function foo(){
    //var x;
    console.log(this.x);
}
Object.prototype.x=10;
foo();
 **/

/**
var foo={};

(function initialize(){
    var x=10;
    foo.bar=function(){
        console.log(x);
    };
})();
foo.bar();


var foo = {x: 10};
var bar = {
    x: 20,
    test: function () {
        console.log(this === bar); // true
        console.log(this.x); // 20
        //this = foo; // error ,不能给this赋值，在运行时发现错误
        //console.log(this.x); // if there wasn't an error then 20, not 10，10
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
 **/

/**
(function  () {
    console.log(this); // null => global
    function test(){
        console.log(this);
    }
    //同上一个示例相同
    test();//global
    var t=new test();//执行test方法，object Object，function test()
    function testref(){
        console.log(this);
    }
    t.t=testref;
    t.t();//执行testref方法，object Object,t()
})();
**/
/**
//定义一个全局函数
function foo() {
    if (this === global) {
        console.log("this is window.");
    }
}

//函数foo也是对象，所以可以定义foo的属性boo为一个函数
foo.boo = function() {
    if (this === foo) {
        console.log("this is foo.");
    } else if (this === global) {
        console.log("this is window.");
    }
};
//等价于window.foo();
foo(); //this is window.

//可以看到函数中this的指向调用函数的对象
foo.boo(); //this is foo.

//使用apply改变函数中this的指向
foo.boo.apply(global); //this is window.

function foo() {
    console.log(this.fruit);
}
var pack = {
    fruit: "orange",
    foo: foo
};
//此时函数foo中this指向window.pack对象
pack.foo(); // "orange"
 **/
/*
function print() {
    console.log(this.name);
}
var person={
    name:"Bejing",
    getName:function(){
        return this.name;
    },
    setName:function(newName){
        this.name=newName;
    },
    print:print
}
console.log(person.getName());

var shanghai=person;
shanghai.setName("Shanghai")
console.log(shanghai.getName());

var hangzhao=person;
hangzhao.setName("hangzhao")
console.log(hangzhao.getName());
hangzhao.print();
console.log(shanghai.getName());
*/

function print() {
    console.log(this.name);
}
function setPersonAddress(newAddress) {
   this.address=newAddress;
}
function printAge() {
    console.log(this.age);
}
function printLevel() {
    console.log(this.level);
}
function printLovel(){
    console.log(this.lovel);
}
//var Person=Person
var Person = {
    level :"A",
    createNew: function(){
        var person = {};
         //公共变量
        person.name="Beijing";
        //私有变量，没有再this中
        var age;
        var lovel;
        person.getAge = function(){
            return age;
        };
        person.setAge=function (newAge){
            age=newAge;
        };
        person.getName = function(){
           return person.name;
        };
        person.setName = function(newName){
            person.name=newName;
        };
        person.getAddress=function () {
            return person.address;
        };
        person.setLovel=function (newLovel){
            this.lovel=newLovel;
        };
        person.getLovel=function () {
            return this.lovel;
        };
        person.getPersonLevelClass=function () {
            return Person.level;
        };
        person.getLevel=function () {//undefined
            return this.level;
        };
        person.getPersonLevel=function () {//ReferenceError: level is not defined
            return level;
        };
        person.printAge=printAge;
        person.setPersonAddress = setPersonAddress;
        person.print=print;
        person.printLevel=printLevel;//undefined
        person.printLovel=printLovel;
        return person;
    },

    printPersonLevelClass:function () {
        console.log(Person.level);
    },
    printPersonLevel:function () {
        console.log(this.level);
    },
    printLevel:function () {
        console.log(level);
    }
};

var Employee = {
    createNew: function(){
        var employee = Person.createNew();
        employee.work = "Employee";
        employee.setWork= function(newWork){
            this.work=newWork;
        };
        employee.getWork= function(){
            return this.work;
        };
        return employee;
    }
};
/**
Employee.prototype.setWorkSinceYear=function (newWorkSinceYear) {
    this.workSinceYear=newWorkSinceYear;
};
Employee.prototype.getWorkSinceYear=function () {
    return this.workSinceYear;;
};
**/
/**
var employee=Employee.createNew();
employee.setName("LiSi");
console.log(employee.getName());//LiSi
console.log(employee.name);//LiSi
employee.print();//LiSi
employee.setWork("BAT");
console.log(employee.work);//BAT
console.log(employee.getWork());//BAT
//employee.setWorkSinceYear(30);
//console.log(employee.getWorkSinceYear());

var beijing = Person.createNew();
beijing.setName("BJ");
console.log(beijing.getName());//BJ
console.log(beijing.name);//BJ
beijing.print();//BJ

beijing.setLovel("Travel")
console.log(beijing.getLovel());
beijing.printLovel();
beijing.setAge(20);
console.log(beijing.getAge());//20
console.log(beijing.age);//undefined
beijing.printAge();//undefined
beijing.setPersonAddress("TianAnMei");
console.log(beijing.getAddress());

console.log("beijing.getLevel",beijing.getLevel());//undefined
console.log("getPersonLevelClass",beijing.getPersonLevelClass());//A
//console.log("beijing.getPersonLevel()",beijing.getPersonLevel());//ReferenceError: level is not defined
console.log("beijing.printLevel");
beijing.printLevel();//undefined


//Person.printLevel();//ReferenceError: level is not defined
Person.printPersonLevel();//A
Person.printPersonLevelClass();//A

var shanghai = Person.createNew();
shanghai.setName("shanghai");
console.log(shanghai.getName());
shanghai.print();
//
shanghai.setPersonAddress("WaiTang");
console.log(shanghai.getAddress());
shanghai.setLovel("Reading");
console.log(shanghai.getLovel());
shanghai.printLovel();
//////////////////////////////
console.log(beijing.getName());
console.log(beijing.getAddress());
console.log(beijing.getLovel());
beijing.printLovel();
**/

function PersonFactory(){
    var employee=Employee.createNew();
    employee.setName("LiSi");
    console.log(employee.getName());//LiSi
    console.log(employee.name);//LiSi
    employee.print();//LiSi
    employee.setWork("BAT");
    console.log(employee.work);//BAT
    console.log(employee.getWork());//BAT
//employee.setWorkSinceYear(30);
//console.log(employee.getWorkSinceYear());

    var beijing = Person.createNew();
    beijing.setName("BJ");
    console.log(beijing.getName());//BJ
    console.log(beijing.name);//BJ
    beijing.print();//BJ

    beijing.setLovel("Travel");
    console.log(beijing.getLovel());
    beijing.printLovel();
    beijing.setAge(20);
    console.log(beijing.getAge());//20
    console.log(beijing.age);//undefined
    beijing.printAge();//undefined
    beijing.setPersonAddress("TianAnMei");
    console.log(beijing.getAddress());

    console.log("beijing.getLevel",beijing.getLevel());//undefined
    console.log("getPersonLevelClass",beijing.getPersonLevelClass());//A
//console.log("beijing.getPersonLevel()",beijing.getPersonLevel());//ReferenceError: level is not defined
    console.log("beijing.printLevel");
    beijing.printLevel();//undefined


//Person.printLevel();//ReferenceError: level is not defined
    Person.printPersonLevel();//A
    Person.printPersonLevelClass();//A

    var shanghai = Person.createNew();
    shanghai.setName("shanghai");
    console.log(shanghai.getName());
    shanghai.print();
//
    shanghai.setPersonAddress("WaiTang");
    console.log(shanghai.getAddress());
    shanghai.setLovel("Reading");
    console.log(shanghai.getLovel());
    shanghai.printLovel();
//////////////////////////////
    console.log(beijing.getName());
    console.log(beijing.getAddress());
    console.log(beijing.getLovel());
    beijing.printLovel();

}

PersonFactory();