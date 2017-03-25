var thunkify =require( '../../external/qbase/thunkify');
function f_Promise(a,b,log) {
    var sum=a+b;

    var p = new Promise(function(resolve, reject) {
        resolve(log(sum));
    });
    return p;
}
function sub(item) {
    log(item);
    return item-1;
}
function log(c){
    console.log("this log->",c);
}
var thunk=thunkify(f_Promise);
var gen = function* (){
    var f1 = yield thunk(1,2);
    var f2 = yield thunk(3,4);
    log(f1);
    log(f2);
};

var g = gen();


var r1 = g.next();
r1.value(function(err, data){
    if (err) throw err;
    var r2 = g.next(data);
    r2.value(function(err, data){
        if (err) throw err;
        g.next(data);
    });
});
