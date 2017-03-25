var object_create = Object.create || function (prototype) {
        function Type() { }
        Type.prototype = prototype;//返回原型
        return new Type();
    };
function extend(SubClass, SuperClass, overrides) {
    var subProto, name;
    SuperClass = SuperClass || Object;
    SubClass.prototype = object_create(SuperClass.prototype);
    subProto = SubClass.prototype;
    subProto.constructor = SubClass;
    if (overrides) {
        for (name in overrides) {
            if (overrides.hasOwnProperty(name)) {
                subProto[name] = overrides[name];
            }
        }
    }
}

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
    //私有变量，没有再this中
    var age;
    var lovel;
    this.getAge = function(){
        return age;
    };
    this.setAge=function (newAge){
        age=newAge;
    };
    this.getName = function(){
        return this.name;
    };
    this.setName = function(newName){
        this.name=newName;
    };
    this.getAddress=function () {
        return this.address;
    };
    this.setLovel=function (newLovel){
        this.lovel=newLovel;
    };
    this.getLovel=function () {
        return this.lovel;
    };
    this.getPersonLevelClass=function () {
        return this.level;
    };
    this.getLevel=function () {//undefined
        return this.level;
    };
    this.getPersonLevel=function () {//ReferenceError: level is not defined
        return level;
    };
    this.printAge=printAge;
    this.setPersonAddress = setPersonAddress;
    this.print=print;
    this.printLevel=printLevel;//undefined
    this.printLovel=printLovel;

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


Person.prototype.setBirdDay=function (newBirdDay) {
    this.birdDay=newBirdDay;
};
Person.prototype.getBirdDay=function () {
    return this.birdDay;
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

function Employee() {
    Person.apply(this, arguments);
}
extend(Employee, Person, {
    employeeId: true,
    setEmployeeId: function(newEmployeeId) {
        employeeId=newEmployeeId
    },
    getEmployeeId:function () {
        return employeeId;
    },
    setDepartId: function(newDepartId) {
        departId=newDepartId;
    },
    getDepartId:function () {
        return departId;
    },
    setAlias: function(newAlias) {
        this.alias=newAlias;
    },
    getAlias:function () {//正确的继承声明
        return this.alias;
    }
});

/**
function Empty() {}
Empty.prototype = Person.prototype;
Employee.prototype = new Empty();
Employee.prototype.constructor = Employee;
**/

Employee.prototype.setWorkSinceYear=function (newWorkSinceYear) {
    this.workSinceYear=newWorkSinceYear;
};
Employee.prototype.getWorkSinceYear=function () {
    return this.workSinceYear;
};

var lisi=new Employee();
lisi.setName("lisi");
console.log(lisi.getName());//BJ
console.log(lisi.name);//BJ
lisi.print();//BJ
lisi.setDepartId(100);
console.log(lisi.getDepartId());//100
console.log(lisi.departId);//undefined

lisi.setEmployeeId("emp201102");
console.log(lisi.getEmployeeId());//emp201102
console.log(lisi.employeeId);//true
lisi.setAlias("LS");
console.log(lisi.getAlias());
console.log(lisi.alias);

var zhang=new Employee();
zhang.setName("zhang");
console.log(zhang.getName());//BJ
console.log(zhang.name);//BJ
zhang.print();//BJ
console.log(zhang.getEmployeeId());//emp201102
zhang.setEmployeeId("emp201101");

console.log(zhang.getEmployeeId());//emp201101
console.log(lisi.getEmployeeId());//emp201101
console.log(zhang.employeeId);//true
console.log(zhang.getDepartId());//100
console.log(zhang.departId);//undefined
zhang.setDepartId(200);
console.log(zhang.getDepartId());//200
console.log(zhang.departId);//undefined

console.log(lisi.getDepartId());//200
console.log(lisi.departId);//undefined

zhang.setLovel("Travel");
console.log(zhang.getLovel());
zhang.printLovel();

zhang.setBirdDay(1900);
console.log(zhang.getBirdDay());

zhang.setAge(20);
console.log(zhang.getAge());//20
console.log(zhang.age);//undefined
zhang.printAge();//undefined
zhang.setPersonAddress("TianAnMei");
console.log(zhang.getAddress());

console.log("zhang.getLevel",zhang.getLevel());//undefined
console.log("zhang",zhang.getPersonLevelClass());//A
//console.log("beijing.getPersonLevel()",beijing.getPersonLevel());//ReferenceError: level is not defined
console.log("beijing.printLevel");
zhang.printLevel();//undefined
zhang.printMainInfo();
zhang.setWorkSinceYear(19990)
console.log(zhang.getWorkSinceYear());

console.log(zhang.getAlias());//undefined
//Person.printLevel();//ReferenceError: level is not defined
Person.printPersonLevel();//A
Person.printPersonLevelClass();//A

var beijing =new Person();
beijing.setName("BJ");
console.log(beijing.getName());//BJ
console.log(beijing.name);//BJ
beijing.print();//BJ

beijing.setLovel("Travel");
console.log(beijing.getLovel());
beijing.printLovel();

beijing.setBirdDay(1900);
console.log(beijing.getBirdDay());

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

var shanghai =new Person();
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

