async function f() {
    return 'hello world';
}

f().then(
    v => console.log(v)
);


var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(123);
        }, time);
    })
};

var start = async function () {
    try{
    console.log('start async');
    let f=await sleep(1);
    console.log('await end,result->',f);
    } catch (err) {
        console.log(err);
    }

};

var end = function () {
    console.log('start end common');
};


module.exports={
    start:start,
    end:end,
    //asyncFS:asyncFS
}
