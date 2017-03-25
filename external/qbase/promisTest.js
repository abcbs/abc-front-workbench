var Q = require('q');
var fs = require('fs');
var path = require('path');

/**
function readFile(fileName) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fileName, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

readFile('index.html').then(
  function(data) {
    console.log(data.toString());
  },
  function(err) {
    throw err;
  }
);
**/

/**
new Promise(function(res, rej) {
  console.log(Date.now() + " start setTimeout 1");
  setTimeout(res, 2000);
}).then(function() {
  console.log(Date.now() + " timeout 1 call back");
  return 1024;
}).then(function(arg) {
  console.log(Date.now() + " last onFulfilled return " + arg);
});
**/

/**
function timeout1() {
  return new Promise(function(res, rej) {
    console.log(Date.now() + " start timeout1");
    setTimeout(res, 2000);
  });
}
function timeout2() {
  console.log(Date.now() + " timeout 1 call back");
  return new Promise(function(res, rej) {
    console.log(Date.now() + " start timeout2");
    setTimeout(res, 3000);
  });
}
function timeout3() {
  console.log(Date.now() + " timeout 2 call back");
  return new Promise(function(res, rej) {
    console.log(Date.now() + " start timeout3");
    setTimeout(res, 4000);
  });
}
function timeout4() {
  console.log(Date.now() + " timeout 3 call back");
  return new Promise(function(res, rej) {
    console.log(Date.now() + " start timeout4");
    setTimeout(res, 5000);
  });
}
timeout1()
  .then(timeout2)
  .then(timeout3)
  .then(timeout4)
  .then(function() {
    console.log(Date.now() + " timout4 callback");
  });
  **/
/**
fs.readFile('index.html', function (err, data) {
 if (err) throw err;
  console.log(data.toString());
});
**/

/**
function callp1() {
  console.log(Date.now() + " start callp1");
  return new Promise(function(res, rej) {
    setTimeout(res, 2000);
  });
}
function callp2() {
  console.log(Date.now() + " start callp2");
  return new Promise(function(res, rej) {
    setTimeout(function() {
      res({arg1: 4, arg2: "arg2 value"});
    }, 3000);
  });
}
function callp3(arg) {
  console.log(Date.now() + " start callp3 with arg = " + arg);
  return new Promise(function(res, rej) {
    setTimeout(function() {
      res("callp3");
    }, arg * 1000);
  });
}
callp1().then(function() {
  console.log(Date.now() + " callp1 return");
  return callp2();
}).then(function(ret) {
  console.log(Date.now() + " callp2 return with ret value = " + JSON.stringify(ret));
  return callp3(ret.arg1);
}).then(function(ret) {
  console.log(Date.now() + " callp3 return with ret value = " + ret);
})
**/
/**
var fs_readFile = Q.denodeify(fs.readFile)
var promise = fs_readFile('index.html')
promise.then(console.log, console.error)
**/

/**
function fs_readFile (file, encoding) {
  var deferred = Q.defer()
  fs.readFile(file, encoding, function (err, data) {
    if (err) deferred.reject(err) // rejects the promise with `er` as the reason
    else deferred.resolve(data.toString()) // fulfills the promise with `data` as the value
  })
  return deferred.promise // the promise is returned
}
fs_readFile('index.html').then(console.log, console.error)

function fs_readFile (file, encoding, callback) {
  var deferred = Q.defer()
  fs.readFile(file, encoding, function (err, data) {
    // rejects the promise with `er` as the reason
  if (err) deferred.reject(err)
  // fulfills the promise with `data` as the value
  else deferred.resolve(data)
  })
  // the promise is returned
  return deferred.promise.nodeify(callback)
}

fs_readFile('index.html', 'utf8', function (er, data) {
  console.log(data.toString());
})
**/
/**
function fs_readFile (file,
                      encoding) {
  var deferred = Q.defer()
  fs.readFile(file, encoding, function (err, data) {
    // rejects the promise with `er` as the reason
    if (err) deferred.reject(err)
    // fulfills the promise with `data` as the value
    else deferred.resolve(data)
  })
  // the promise is returned
  return deferred.promise

}
**/


function fs_readFile (file,
                      encoding) {
  var deferred = Q.defer()
  fs.readFile(file, encoding, function (err, data) {
    // rejects the promise with `er` as the reason
    if (err) deferred.reject(err)
    // fulfills the promise with `data` as the value
    else deferred.resolve(data)
  })//fs.readFile
  // the promise is returned
  return deferred.promise

}


var allPromise = Q.all([ fs_readFile('index.html'),
  fs_readFile('applycall.html') ])
allPromise.spread(function(data,data1){
  //console.log(data.toString());
  console.log('====================================================');
  console.log('============世界好,北京好==============');
  console.log('====================================================');
  console.log(data1.toString());
}, function(err){
  console.error(err);
})



function readFile(previous, fileName) {
  return Q.promise(function (resolve, reject) {
    fs.readFile(path.join(process.cwd(), fileName),
      function (error, text) {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(previous + text.toString());
        }
      });
  });
}

readFile('', 'index.html')
  .then(function (previous) {
    return readFile(previous, 'applycall.html');
  })
  .then(function (finalText) {
    console.log(finalText);
  })
  .catch(function (error) {
    console.log(error);
  }).done();

/**
var promise = readFile()
var promise2 = promise.then(function (data) {
  return readAnotherFile()
}, function (err) {
  console.error(err)
  // if readFile was unsuccessful,
  //let's log it but still readAnotherFile
  return readAnotherFile()
})
// the result of readAnotherFile
promise2.then(console.log, console.error)
**/
/**
var promise = readFile()
var promise2 = promise.then(readAnotherFile, console.error)
**/
/**
readFile(function (err, data) {
  if (err) return console.error(err)
  console.log(data)
})

var promise = readFile()
promise.then(console.log, console.error)

readFile()
  .then(readAnotherFile)
  .then(doSomethingElse)
  .then()


readFile()
  .then(function (data) {
    return readAnotherFile().then(function () {
      // do something with `data`
    })
  })

try {
  doThis()
  doThat()
} catch (err) {
  console.error(err)
}

doThisAsync()
  .then(doThatAsync)
  .then(null, console.error)
 **/


