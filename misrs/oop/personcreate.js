/**
var x=10;
function foo(){
    console.log(x);
}
(function(){
    var x=20;
    foo();//10,not 20
})();

console.log(foo);

(function foo() {});

var foo=30;
 **/

/**
function f(x){
    var g=function(){
        return x;
    };
    return g;
}
var h=f(1);
console.log(h());
**/
/**
var nAdd;
function f1(){
    var n=999;
    nAdd=function(){n+=1};
    function f2(){
        console.log(n);
    }
    return f2;
}

var result=f1();//result为全局变量
result(); // 999
nAdd();
result(); // 1000

nAdd();
result(); // 1001
**/
/**
function Person(){
    var name = "default";

    return {
        getName : function(){
            return name;
        },
        setName : function(newName){
            name = newName;
        }
    }
};

var john = Person();
console.log(john.getName());
john.setName("john");
console.log(john.getName());

var jack = Person();
console.log(jack.getName());
jack.setName("jack");
console.log(jack.getName());

//var type;
function Person(name){
    this.name = name || "Beijing" ;
    this .getName = function (){
        return "name, " + this .name;
    };
    this .setName = function (newName){
        this .name=newName;
    }
}
 **/
/**
function Person(name) {
    this.name = name;
};
Person.prototype = {
    constructor:Person,//指定constructor
    getName: function() {
        return this.name;
    },
    setName: function(newName) {
        this.name=newName;
    }
};
**/

var object_create = Object.create || function (prototype) {
        function Type() { }
        Type.prototype = prototype;//返回原型
        return new Type();
    };

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
function Person(){
    var person =object_create(Person.prototype);
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
}
Person.level="A";
Person.printPersonLevelClass=function () {
    console.log(Person.level);
};
Person.printPersonLevel=function () {
    console.log(this.level);
};
Person.printLevel=function () {
    console.log(level);
};


Person.prototype.setWorkSinceYear=function (newWorkSinceYear) {
    this.workSinceYear=newWorkSinceYear;
};
Person.prototype.getWorkSinceYear=function () {
    return this.workSinceYear;
};

Person.prototype.printMainInfo=function () {
    console.log( "printMainInfo start");
    console.log( this.name);
    console.log( this.age);//undinefed
    console.log( this.lovel);
    console.log( this.workSinceYear);
    console.log( Person.level);
    console.log( "printMainInfo Over");
};

function  Employee() {
    var person = Person();
    var employee=object_create(Employee.prototype);
    employee.setSalary=function (newSalary){
        this.salary=newSalary;
    };
    employee.getSalary=function () {
        return this.salary;
    };
    employee.person=person;
    return employee;
}
var zhang=Employee();
zhang.person.setAge(10);
console.log(zhang.person.getAge());
zhang.setSalary(10000);
console.log(zhang.getSalary());
var lisi=Employee();
lisi.person.setAge(20);
console.log(lisi.person.getAge());

var beijing = Person();
beijing.setName("BJ");
console.log(beijing.getName());//BJ
console.log(beijing.name);//BJ
beijing.print();//BJ

beijing.setLovel("Travel");
console.log(beijing.getLovel());

beijing.setWorkSinceYear(1900);
console.log(beijing.getWorkSinceYear());

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
beijing.printMainInfo();

//Person.printLevel();//ReferenceError: level is not defined
Person.printPersonLevel();//A
Person.printPersonLevelClass();//A

var shanghai = Person();
shanghai.setName("shanghai");
console.log(shanghai.getName());
shanghai.print();
//
shanghai.setPersonAddress("WaiTang");
console.log(shanghai.getAddress());
shanghai.setLovel("Reading");
console.log(shanghai.getLovel());
shanghai.printLovel();
shanghai.setAge(30);
console.log(shanghai.getAge());//30
shanghai.printMainInfo();
//////////////////////////////
console.log(beijing.getName());
console.log(beijing.getAddress());
console.log(beijing.getLovel());
beijing.printLovel();
console.log(beijing.getAge());
