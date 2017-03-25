// import bunyan from 'bunyan'
// var log = bunyan.createLogger({name: 'abc-logger'});
// if(log){
//     console.log("Logger Loaded")
// }

export default function info(...infoLog) {
    // console.log("info\n",infoLog)
}

export function error(err) {
    console.log("err\n",err)
}

export function warn(warnLog) {
    console.log("warn,",warnLog)
}

export function fatal(fatalLog) {
    console.log("fatal\n",fatalLog)
}

export function trace(traceLog) {
    console.log("trace,",traceLog)
}