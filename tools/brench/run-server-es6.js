import {exec, setExecOptions } from '../develop/exec';

import runCmd from '../develop/cmdExec';
import { logServerEntryS6, userServerEntryES6,
    authenticationServerEntryES6 ,webServerProxyEntryES6,
    partServerEntryES6,productServerEntryES6,orderServerEntryES6,
    shoppingServerEntryES6,apiServerEntryS6
} from '../../config/backend-config.path';

export default function runServerES6() {
    console.log('核心服务: '.cyan + '启动，'.green);
    function runLogServer() {
        console.log('日志服务: '.cyan + '启动，'.green);
        return runCmd('日志服务',`node ${logServerEntryS6}`)
    }
    function runUserService() {
        console.log('用户服务: '.cyan + '启动，'.green);
        return runCmd('用户服务',`node ${userServerEntryES6}`);
    }
    function runAuthenicationService() {
        console.log('权限服务: '.cyan + '启动，'.green);
        return runCmd('权限服务',`node ${authenticationServerEntryES6}`);
    }
    function runPartServer() {
        console.log('Part-LD 服务: '.cyan + '启动，'.green);
        return runCmd('Part-LD服务',`node ${partServerEntryES6}`)
    }
    function runProductServer() {
        console.log('Product 服务: '.cyan + '启动，'.green);
        return runCmd('Product服务',`node ${productServerEntryES6}`)
    }
    function runOrderServer() {
        console.log('Order 服务: '.cyan + '启动，'.green);
        return runCmd('Order',`node ${orderServerEntryES6}`)
    }
    function runShoppingServer() {
        console.log('Product 服务: '.cyan + '启动，'.green);
        return runCmd('Shopping服务',`node ${shoppingServerEntryES6}`)
    }
    function runSampleServer() {
        console.log('Sample 服务: '.cyan + '启动，'.green);
        return runCmd('Sample服务',`node ${apiServerEntryS6}`)
    }
    function runServiceProxy() {
        console.log('代理服务: '.cyan + '启动，'.green);
        return runCmd('代理服务',`node ${webServerProxyEntryES6}`);
    }
    return Promise.all([
        runLogServer(),
        runUserService(),
        runAuthenicationService(),
        runPartServer(),
        // runProductServer(),
        runOrderServer(),
        runShoppingServer(),
        runSampleServer()
    ]).then((data)=>{
       runServiceProxy()
    },(err)=>{
        console.log('代理服务: '.cyan + '启动失败'.red,err);
    }
    )
}