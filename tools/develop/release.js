import 'colors';
import {exec, setExecOptions } from './exec';
import fsp from 'fs-promise';
import buildServer from './dist/buildServer';
import buildVenders from './dist/buildVenders';
import ncp from 'ncp'

import { releaseVendersRoot, vendersRoot,
    releaseProductRoot ,publicRoot,releaseExternalRoot,externalRoot,
    repoRoot,releaseRoot,esVenderRoot,esProductRoot,esExternalRoot
} from './constants';


function retain(fn) {
    console.log('Building: '.cyan + '目录重做，'.green);
    function delVender() {
        return exec(`rm -rf  ${releaseVendersRoot}`).
            then(() => fsp.mkdirs(releaseVendersRoot)).then(()=> "第三方库重做完成");
    }
    function delProduct() {
        return exec(`rm -rf  ${releaseProductRoot}`).
        then(() => fsp.mkdirs(releaseProductRoot)).then(()=>"产品重做完成");
    }
    function delExternal() {
        return exec(`rm -rf  ${releaseExternalRoot}`).
        then(() => fsp.mkdirs(releaseExternalRoot)).then("引入库重做完成");
    }
    return Promise.all([
        delVender(),
        delProduct(),
        delExternal()
    ]).then(()=>"成功"
    )
}

function copy() {
    console.log('Building: '.cyan + 'copy'.green);
       return Promise.all([
        ncp(vendersRoot, releaseVendersRoot),
        ncp(publicRoot, releaseProductRoot),
        ncp(externalRoot, releaseExternalRoot),
        ncp(repoRoot+'/index.html', releaseRoot+'/index.html')
    ]).then(()=>"成功"
    );
}

function retainES() {
    console.log('Building: '.cyan + '目录重做，'.green);
    function delVender() {
        return exec(`rm -rf  ${esVenderRoot}`).
        then(() => fsp.mkdirs(esVenderRoot)).then(()=> "第三方库重做完成");
    }
    function delProduct() {
        return exec(`rm -rf  ${esProductRoot}`).
        then(() => fsp.mkdirs(esProductRoot)).then(()=>"产品重做完成");
    }
    function delExternal() {
        return exec(`rm -rf  ${esExternalRoot}`).
        then(() => fsp.mkdirs(esExternalRoot)).then("引入库重做完成");
    }
    return Promise.all([
        delVender(),
        delProduct(),
        delExternal()
    ]).then(()=>"成功"
    )
}

function copyES() {
    console.log('ES构建: '.cyan + '拷贝库'.green);
    return Promise.all([
        ncp(vendersRoot, esVenderRoot),
        ncp(publicRoot, esProductRoot),
        ncp(externalRoot, esExternalRoot),
    ]).then(()=>"成功"
    );
}


function retainAndDevelop(){
    return retainES().then(data=>{
        console.log("重做目录结果为",data);
        copyES().then(data=>console.log("拷贝目录结果,",data));
    })
}

function buildByWebpack() {
    return  buildVenders().then((data)=>{ console.log("第三方发布成功,",data);}).then(
        ()=>
            buildServer().then((data) => {
                console.log("发布结果,",data);
            })
    )
}

export function develop() {
    console.log('构建: '.cyan + '产品发布开始'.green);
    return  buildByWebpack().then(data=>{
                retainAndDevelop();
    })
}

function retainAndRelease(){
    return retain().then(data=>{
        console.log("重做目录结果为",data);
        copy().then(data=>console.log("拷贝目录结果,",data));
    })
}
export default function release() {
    return  buildByWebpack().then(data=>{
        retainAndRelease();
    })
}

