import {exec} from '../exec';
import fsp from 'fs-promise';
import yargs from 'yargs';
import {vendersRoot as buildPath} from '../constants';
import cmdExec from '../cmdExec'
export default function buildVendors() {
    console.log('构建阶段: '.cyan + '第三方库'.green);
    const options = yargs
        .alias('vendm', 'vendmodel')
        .default('vendmodel', "production")
        .argv;
    return   new Promise((resolve, reject) => {
            exec(`rm -rf ${buildPath}`)//rimraf rm -rf
                .then(() => fsp.mkdirs(buildPath)).then(
                cmdExec('构建第三方库',`webpack --${options.vendmodel } --config webpack.config.vendors`,{
                        hot:false,
                        env: {
                            // PORT: 3000,
                            // NODE_ENV:"production",
                            // ...process.env
                            }},
                    (err ,data)=> {
                        if (err) {
                            reject(err);
                        }else{
                            console.log("构建第三方库成功");
                        }
                        resolve("成功");
                    })
            )
        }
    )
}

