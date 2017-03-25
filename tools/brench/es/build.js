import 'colors';
import { exec } from '../../develop/exec';
import fsp from 'fs-promise';
import { srcServerRoot, esServerRoot } from '../../develop/constants';
import buildBabel from '../../develop/buildBabel';

import devExpressionWithCodes from '../../error-codes-babel/dev-expression-with-codes';
export default function BuildES() {
  console.log('Building: '.cyan + 'es module'.green);

  return exec(`rm -rf  ${esServerRoot}`)//rimraf
      .then(() => fsp.mkdirs(esServerRoot))
      .then(() => buildBabel(srcServerRoot, esServerRoot, {
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
