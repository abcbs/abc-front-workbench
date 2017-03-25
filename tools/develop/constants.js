import path from 'path';
import {pathConfig ,buildConfig} from '../../config/config.path'

export const repoRoot = path.resolve(__dirname, '../../');

export const srcRoot = path.join(repoRoot, 'src/');
export const distRoot = path.join(repoRoot, 'lib/dist/');
export const libRoot = path.join(repoRoot, 'lib/lib/');
export const esRoot = path.join(repoRoot, 'lib/es/');
export const bowerRoot = path.join(repoRoot, 'lib/amd/');
export const docsRoot = path.join(repoRoot, 'lib/docs-built/');

export const styleRoot = path.join(repoRoot, 'lib/styles/');
export const mediaRoot = path.join(repoRoot, 'lib/media/');
export const templateRoot = path.join(repoRoot, 'lib/template/');

export const vendersRoot = pathConfig.buildPath;
export const publicRoot = buildConfig.buildPath;

//release
export const releaseRoot = path.join(repoRoot, 'public');
//第三方打包的库，打包之前在根目录dist，对应变量为vendersRoot
export const releaseVendersRoot = path.join(repoRoot, 'public/dist');
//项目打包后的代码，打包之前目录为build，对应变量为publicRoot
export const releaseProductRoot = path.join(repoRoot, 'public/build');
//第三方，非npm库，打包之前为external
export const externalRoot = path.join(repoRoot, 'external');
export const releaseExternalRoot = path.join(repoRoot, 'public/external');

//Bebal解析后，第三方库、产品库客户端、第三方非打包库拷贝
export const esVenderRoot = path.join(repoRoot, 'lib/es/dist');
export const esProductRoot = path.join(repoRoot, 'lib/es/build');
export const esExternalRoot = path.join(repoRoot, 'lib/es/external');


//服务端结构
export const srcServerRoot = path.join(repoRoot, 'servers/');
//
export const distServerRoot = path.join(repoRoot, 'lib/servers-dist/');
export const libServerRoot = path.join(repoRoot, 'lib/servers-lib/');
export const esServerRoot = path.join(repoRoot, 'lib/servers/');
export const bowerServerRoot = path.join(repoRoot, 'lib/servers-amd/');