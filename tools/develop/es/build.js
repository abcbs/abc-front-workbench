import 'colors';
import { exec } from '../exec';
import fsp from 'fs-promise';
import { srcRoot, esRoot,styleRoot,mediaRoot,templateRoot } from '../constants';
import buildBabel from '../buildBabel';

import devExpressionWithCodes from '../../error-codes-babel/dev-expression-with-codes';
export default function BuildES() {
  console.log('Building: '.cyan + 'es module'.green);

  return exec(`rm -rf  ${esRoot}`)//rimraf
      .then(() => fsp.mkdirs(esRoot))
      .then(()=>
          Promise.all([
              exec(`rm -rf ${styleRoot}`),
              exec(`rm -rf ${mediaRoot}`),
              // exec(`rm -rf ${templateRoot}`)
          ])
      )
      .then(()=>
          Promise.all([
              fsp.mkdirs(styleRoot),
              fsp.mkdirs(mediaRoot),
              // fsp.mkdirs(templateRoot)
          ])
      )
    .then(() => buildBabel(srcRoot, esRoot, {
      babelrc: true,
      // presets: [
      //   ['es2015', { loose: true, modules: false }],
      //   'stage-1',
      //   'react'
      // ],
      "presets": ["es2015", "stage-1", "react"],
      plugins: [
        'dev-expression',
        'transform-runtime',
        'transform-es3-member-expression-literals',
        'transform-es3-property-literals',
          'transform-dev-warning',
          'transform-decorators-legacy',
          ["transform-replace-object-assign", "simple-assign"],
           devExpressionWithCodes,
      ]
    }))
    .then(() => console.log('Built: '.cyan + 'es module'.green));
}
