import 'colors';

import lib from './lib/build';
import es from './es/build';
import  cmdExec  from '../develop/cmdExec';
export default function compile(options) {
  return Promise.all([
    lib(),
    es()
  ])
  .then(data => {
    console.log("服务端构建完成");
    // cmdExec('ABC-Server','node ./lib/es/abc-proxy/debug/debug.js  --iso_config ../../../../config/webpack-isomorphic-tools  --iso_rootDir ./../../../../  --publicPath ../../');
  });
}
