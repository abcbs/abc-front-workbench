function f_Promise(a,b) {
    var sum=a+b;

    var p = new Promise(function(resolve, reject) {
        resolve(sum);
    });
    return p;
}
function sub(item) {
    return item-1;
}
function log(c){
    console.log("this log->",c);
}

var gen = function* (){
    var f1 = yield f_Promise(1,2);
    var f2 = yield f_Promise(3,4);
    log(f1);
    log(f2);
};

var g = gen();

g.next().value.then(
    function(data){
        g.next(data).value.then(
            function(data){
                g.next(data);
            }
        );
});