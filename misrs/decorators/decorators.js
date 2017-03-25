function testable(target) {
    target.isTestable = true;
}

@testable
class MyTestableClass {}

console.log("MyTestableClass,",MyTestableClass.isTestable) // true

function add(x, y){
    return x + y;
}

function mul(x, y){
    return x * y;
}

function concat(arr1, arr2){
    return arr1.concat(arr2);
}
function reducer(target){
    return (...args) => args.reduce(target);
}

let add_many = reducer(add);
let mul_many = reducer(mul);
let concat_many = reducer(concat);

/**
 * multicast包装函数
 * @param target
 * @returns {Function}
 */
function multicast(target){
    //把参数分为两部分，第一部分为第一个元素，二部分为其余元素
    return function(list, ...rest) {
        if(Array.isArray(list)){
            //遍历数组，把数组中的每个元素执行target方法
            return list.map(item => target.apply(this, [item].concat(rest)));
        }else{
            let item = list;
            return target.apply(this, [item].concat(rest));
        }
    }
}

class Collection {
    constructor(){
        this.items = [];
    }
    append(item){
        this.items.push(item);
        return this.items.slice(-1)[0];
    }
}

function multicastCollection(list){
    var c = new Collection();
    c.append = multicast(c.append);
    c.append(list);

    function print(previousValue, currentValue) {
        console.log(currentValue);
    }
    function loggerPrint() {
        //splice，删除，slice不删除
        let first;
        if(Array.isArray(c.items)){
            first=c.items.slice(0,1)[0];
        }
         c.items.reduce(print,first);

    }
    c.loggerPrint=loggerPrint;
   return c;
}

function multicastPrint(callback){
    function printLocal(item){
        console.log(item);
    }
    if (!callback&&typeof callback !== 'function') {
        callback=printLocal;
    }
    var prints = multicast(callback);
    return prints;
}

//使用decorator 来实现函数变换
function descriptorCollection(newItem){
    let item=[];
    if(Array.isArray(newItem)){
       item=newItem;
    }else{
        var keys = arguments;
        for (var i = 0; i < keys.length; i++) {
            item.push(keys[i])
        }
    }
    // babel stage-1 使用 decorators 插件的情况下可以正确编译和执行。我们看到有了 decorator，
    function multicast(target, key, descriptor){
        let func = target[key];
        descriptor.value = function(list, ...rest) {
            if(Array.isArray(list)){
                return list.map(item => func.apply(this, [item].concat(rest)));
            }else{
                let item = list;
                return func.apply(this, [item].concat(rest));
            }
        }
        return descriptor;
    }

    class Collection {
        constructor(){
            this.items = [];
        }

        @multicast
        append(item){
            this.items.push(item);
            return this.items.slice(-1)[0];
        }
    }
    var c = new Collection();

    c.loggerPrint=function () {
        if (c.items && c.items.length > 0) {
            c.items.reduce(function (previousValue, currentValue) {
                console.log(currentValue);
            }, c.items.slice(0, 1)[0]);
      }
    };
    c.appendItem=function (item) {
        c.append(item);
    }
    c.append(item);
    return c;
}
//一个 decorator 是一个函数，它有三个参数，第一个是被 decorator 修饰的对象，第二个是属性名，
// 第三个参数是 Object.defineProperty 的 descriptor，有了这些参数，我们就可以在定义时，对它进行各种“修饰”。
function deprecateSimpleMyClass(){
    function deprecate(target, key, descriptor){
        console.log("[Function " + key + "] has been deprecated.");
        return descriptor;
    }

    class MyClass {
        @deprecate
        old_method(){
            console.log("I\"m deprecated");
        }
    }

    var a = new MyClass();
    return a;
}

//decorator 可以带参数，方法是在 decorator 函数定义的时候嵌套一层：
function decoratorParamMyClass () {
    function deprecate(target, key, descriptor){
        console.log("[Function " + key + "] has been deprecated.");
        return descriptor;
    }

    function delay(ms){
        return function(target, key, descriptor){
            let func = target[key];
            descriptor.value = function(...args){
                return setTimeout(function(){
                    func.apply(target, args);
                }, ms);
            }
        }
    }
    class MyClass {
        @deprecate
        old_method(){
            console.log("I\"m deprecated");
        }
        @delay(3000)
        new_method(){
            console.log("I\"m called after 3000ms");
        }
    }
    var a = new MyClass();
    return a;
}

function decoratorMult(item) {
    function expand(target, key, descriptor){
        let func = target[key];
        target[key] = function(...args){
            return func.call(this, args);
        }

        return target[key];
    }

    function multicast(target, key, descriptor){
        let func = target[key];
        target[key] = function(list, ...rest) {
            if(Array.isArray(list)){
                return list.map(item => func.apply(this, [item].concat(rest)));
            }else{
                let item = list;
                return func.apply(this, [item].concat(rest));
            }
        };
        return target[key];
    }

    class Collection {
        constructor(){
            this.items = [];
        }

        @expand
        @multicast
        append(item){
            this.items.push(item);
            return this.items.slice(-1)[0];
        }
    }

    var c = new Collection();
    c.loggerPrint=function () {
        if (c.items && c.items.length > 0) {
            c.items.reduce(function (previousValue, currentValue) {
                console.log(currentValue);
            }, c.items.slice(0, 1)[0]);
        }
    };
    c.append(item);
    return c;
}

//与一般的函数变换相比，decorator 有更优雅的语法，
// 但是 decorator 目前不能针对一般的函数进行变换，只能针对类的方法，这一块不如普通函数变换灵活。
//promisify
function  promisifySimple(url) {
    let request = require("request");
    //request('http://www.google.com', function (error, response, body) {
    // if (!error && response.statusCode == 200) {
    //     console.log(body) // Show the HTML for the Google homepage.
    // }
    // })
    function promisify(func){
        return function(...args){
            return new Promise((resolve, reject) => {
                args.push(function(err, ...args){
                    if(!err){
                        resolve(args);
                    }else{
                        reject(err);
                    }
                });
                func.apply(this, args);
            });
        }
    }

    var getData = promisify(request);
    let _url="http://www.baidu.com";
    if(url&&typeof url === 'string'){
        _url=url;
    }
    return getData(_url);
}
function decoratorPromisify(url){
    let request = require("request");

    function promisify(target, key, descriptor){
        var func = target[key];

        target[key] = function(...args){
            return new Promise((resolve, reject) => {
                args.push(function(err, ...args){
                    if(!err){
                        resolve(args);
                    }else{
                        reject(err);
                    }
                });
                func.apply(this, args);
            });
        };
        return target[key];
    }

    class Site{
        constructor(url){
            this.url = url;
        }
        @promisify
        getData(callback){
            request(this.url, callback);
        }
    }
    let _url="http://www.baidu.com";
    if(url&&typeof url === 'string'){
        _url=url;
    }
    var baidu = new Site(_url);
    return baidu.getData();
}
//decorator 可以操作 Object.defineProperty 的 descriptor，因此可以用来做一些函数变换范围之外的事情：
function  decoratorReadonly () {
    function readonly(target, key, descriptor){
        descriptor.writable = false;
        return descriptor;
    }

    class Foo{
        @readonly
        bar(){
            console.log(1);
        }
    }
    let foo = new Foo();
    return foo;

}
//decorator 不仅能修饰函数，还可以修饰类，我们对上面的代码进行修改
function decoratorClassPromisify (newUrl) {
    let request = require("request");

    function promisify(target, key, descriptor){
        var func = target[key];

        target[key] = function(...args){
            return new Promise((resolve, reject) => {
                args.push(function(err, ...args){
                    if(!err){
                        resolve(args);
                    }else{
                        reject(arr);
                    }
                });
                func.apply(this, args);
            });
        }

        return target[key];
    }

    function url(url){
        return function(Site){
            Site.prototype.url = url;
            return Site;
        }
    }

    class Site{
        @promisify
        getData(callback){
            request(this.url, callback);
        }
    }

    //
    let _url="http://www.baidu.com";
    if(newUrl&&typeof newUrl === 'string'){
        _url=newUrl;
    }
    @url(_url)
    class Baidu extends Site{}

    var baidu = new Baidu();
    console.log(baidu.url);
    return baidu.getData();
}

// 函数变换 与 decorator 可以相互转换，我们写一个一般的方法来做转换
function decoratorClassPromisifyWithWrapper (newUrl) {
    let request = require("request");

    function wrapperToDecorator(wrapper){
        if(wrapper.length <= 1){
            return function(target, key, descriptor){
                target[key] = wrapper.call(this, target[key]);
                return target[key];
            }
        }else{
            return function(...args){
                return function(target, key, descriptor){
                    target[key] = wrapper.apply(this, [target[key]].concat(args));
                }
            }
        }
    }

    function promisify(func){
        return function(...args){
            return new Promise((resolve, reject) => {
                args.push(function(err, ...args){
                    if(!err){
                        resolve(args);
                    }else{
                        reject(arr);
                    }
                });
                func.apply(this, args);
            });
        }
    }

    promisify = wrapperToDecorator(promisify);

    function url(url){
        return function(Site){
            Site.prototype.url = url;
            return Site;
        }
    }

    class Site{
        @promisify
        getData(callback){
            request(this.url, callback);
        }
    }
    //
    let _url="http://www.baidu.com";
    if(newUrl&&typeof newUrl === 'string'){
        _url=newUrl;
    }
    @url(_url)
    @url("http://www.baidu.com")
    class Baidu extends Site{}
    var baidu = new Baidu();
    console.log(baidu.url);
    return baidu.getData();
}

//
function decorateArmour () {
    function decorateArmour(target, key, descriptor) {
        const method = descriptor.value;
        let moreDef = 100;
        let ret;
        descriptor.value = (...args)=>{
            args[0] += moreDef;
            ret = method.apply(target, args);
            return ret;
        }
        return descriptor;
    }

    class Man{
        constructor(def = 2,atk = 3,hp = 3){
            this.init(def,atk,hp);
        }

        @decorateArmour
        init(def,atk,hp){
            this.def = def; // 防御值
            this.atk = atk;  // 攻击力
            this.hp = hp;  // 血量
        }
        toString(){
            return `防御力:${this.def},攻击力:${this.atk},血量:${this.hp}`;
        }
    }

    var tony = new Man();

    console.log(`当前状态 ===> ${tony}`);
    // 输出：当前状态 ===> 防御力:102,攻击力:3,血量:3
}
module.exports={
    add_many:add_many,
    mul_many:mul_many,
    concat_many:concat_many,
    multicastCollection:multicastCollection,
    multicastPrint:multicastPrint,
    descriptorCollection:descriptorCollection,
    deprecateSimpleMyClass:deprecateSimpleMyClass,
    decoratorParamMyClass:decoratorParamMyClass,
    decoratorMult:decoratorMult,
    promisifySimple:promisifySimple,
    decoratorPromisify:decoratorPromisify,
    decoratorReadonly:decoratorReadonly,
    decoratorClassPromisify:decoratorClassPromisify,
    decoratorClassPromisifyWithWrapper:decoratorClassPromisifyWithWrapper,
    decorateArmour:decorateArmour
};