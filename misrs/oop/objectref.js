var obj={};//空对象
var ref=obj;//引用

obj.name="Beijing";
console.log(ref.name);//ref添加了引用

obj=["one","two","three"];//obj指向另一个对象
console.log(ref.name);
console.log(obj.length);
console.log(ref.length);
/////////////////////////////////////
var obj={};//新建一个对象，并被obj引用
var ref1=obj;//ref1引用obj，事实上引用obj指向的空对象
var ref2=obj;
obj.funcName="Beijing";
console.log("obj->",obj.funcName);
console.log("ref1->",ref1.funcName);
console.log("ref2->",ref2.funcName);

ref2.funcName="World";
console.log("obj->",obj.funcName);
console.log("ref1->",ref1.funcName);
console.log("ref2->",ref2.funcName);
console.log("ref2Id->",ref2.funcId);
ref2.funcId="Id00000000001";

console.log("obj->",obj.funcId);
console.log("ref2->",ref1.funcId);
console.log("ref2Id->",ref2.funcId);