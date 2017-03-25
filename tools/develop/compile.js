import 'colors';

import lib from './lib/build';
import es from './es/build';
import {develop} from './release'
import  cmdExec  from './cmdExec';
export default function compile(options) {
  return Promise.all([
    lib(),
    es(),
    develop()
  ])
  .then(data => {//react-isomorphic-render-server
    console.log("编译完成,准备启动服务");
    //cmdExec('ABC-Server','node ./lib/es/abc-proxy/renders/run.js  --iso_config ../../../../config/webpack-isomorphic-tools  --iso_rootDir ./../../../../  --publicPath ../../');
    cmdExec('ABC-Server','node ./lib/es/abc-proxy/debug/debug.js  --iso_config ../../../../config/webpack-isomorphic-tools  --iso_rootDir ./../../../../  --publicPath ../../');

  });

}
