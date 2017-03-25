import {exec} from '../exec';
import fsp from 'fs-promise';
import {publicRoot as buildPath} from '../constants';
import cmdExec from '../cmdExec'
import yargs from 'yargs';

//webpack --config webpack.config.js --progress --colors
export default function buildServer(fn) {
    console.log('构建阶段: '.cyan + '产品库'.green);
    const options = yargs
        .alias('abcm', 'abcmodel')//--vendmodel debug
        .default('abcmodel', "production")
        .argv;
    return  new Promise((resolve, reject) => {
            exec(`rm -rf ${buildPath}`)//rimraf rm -rf
                .then(() => fsp.mkdirs(buildPath)).then(//debug
                    cmdExec('构建产品',
                        `webpack --config webpack.config.js --${options.abcmodel}  --progress --colors`,{
                           },
                            (err ,data)=> {
                            if (err) {
                                reject(err);
                            }else{
                                console.log("构建产品成功");
                            }
                            resolve("成功");
                         })
            )
        }
    )

}

