/**
function asyncFake(data, callback) {
        if(data === 'foo') callback(true);
        else callback(false);
}

asyncFake('foo', function(result) {
        console.log("result is ",result)
});

function asyncReal(data, callback) {
    process.nextTick(function() {
        callback(data === 'foo');
    });
}

asyncReal('foo', function(result) {
    console.log("result is ",result)
});
 **/

var EventEmitter = require('events').EventEmitter;

function StreamLibrary(resourceName) {
    var self = this;
    process.nextTick(function() {
        self.emit('start');
    });
    this.emit('data', "data");

}
StreamLibrary.prototype.emitData =function(data) {
    this.emit('data', data);
}
// inherit from EventEmitter
StreamLibrary.prototype.__proto__ = EventEmitter.prototype;

var stream = new StreamLibrary('fooResource');

stream.on('start', function() {
    console.log('Reading has started');
});

stream.on('data', function(chunk) {
    console.log('Received: ' + chunk);
});

function st(){
    stream.emitData("data st");
}
setInterval(st,1000);
