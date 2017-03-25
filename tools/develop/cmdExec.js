/* eslint-disable no-console, no-process-exit */

import 'colors';

import { exec } from 'child-process-promise';


const SIGINT = 'SIGINT';
let processMap = {};

function output(prefix, message) {
  let formattedMessage = message.toString().trim().split('\n')
    .reduce((acc, line) => `${acc}${ acc !== '' ? '\n' : '' }${prefix} ${line}`, '');

  console.log(formattedMessage);
}

function listen({stdout, stderr}, name) {
  stdout.on('data', data => output(`[${name}] `.grey, data.green));
  stderr.on('data', data => output(`[${name}] `.grey, data.green));
}

function shutdown() {
  Object.values(processMap).forEach(process => {
    console.log("线程标识,",process.pid);
    process.kill(SIGINT);
  });
}

function catchExec(name, err) {
  if (err.killed) {
    console.log('Shutdown: '.cyan + name.green);
    shutdown();
    return false;
  }
  console.log(`${name} -- 线程失败(Failed)`.red);
  console.log(err.toString().red);
  return true;
}

export default function runCmd(name, cmd, options,fn) {
  options={maxBuffer: 200 * 1024,
      killSignal: 'SIGTERM',...options}

      exec(cmd, options)
    .progress(childProcess => {
      listen(childProcess, name);
      processMap[name] = childProcess;
      return ;
    })
    .then((data) => {console.log('Shutdown: '.cyan + name.green)
      if(fn){
        fn(void 0,data);
      }
    })
    .catch(err => {
      if (catchExec(name, err)) {
        // Restart if not explicitly shutdown
        // runCmd(name, cmd, options,fn);
        if(fn){
          fn(err);
        }
      }
    });

}

console.log('Starting docs in Development mode'.cyan);

process.on(SIGINT, shutdown);
//
// runCmd('docs-server', 'nodemon --watch docs --watch src --exec babel-node docs/server.js', {
//   env: {
//     PORT: docsPort,
//     WEBPACK_DEV_PORT: webpackPort,
//     ...process.env
//   }
// });