import { transform } from 'babel-core';
import fs from 'fs';
import path from 'path';
import outputFileSync from 'output-file-sync';
import { copy } from './fs-utils'
import {styleRoot,mediaRoot,templateRoot}from './constants'

function buildContent(content, filename, destination, babelOptions = {}) {
  babelOptions.filename = filename;
  //具体的Babel翻译
  const result = transform(content, babelOptions);
  outputFileSync(destination, result.code, {encoding: 'utf8'});
}

function copyContent(content, filename, destination, babelOptions = {}) {
  outputFileSync(destination, content, {encoding: 'utf8'});
}

function buildFile(filename, destination, babelOptions = {}) {
  const content = fs.readFileSync(filename, {encoding: 'utf8'});
  // We only have .js files that we need to build
  const value=filename.toLowerCase();
  let fileType=0;
  if(value&&(value.match(/.css/i)||
    value.match(/.less/i)||value.match(/.sass/i))){
    fileType=2
  }else if(value&&(value.match(/.json/i))){
    fileType=4;
  }else if(value&&(value.match(/.js/i)||value.match(/.jsx/i))){
    fileType=1
  }else if(value&&(value.match(/.html/i)||value.match(/.htm/i))){
    fileType=3;///\d+/g)
  }else{
    fileType=5;
  }
  if (fileType===1) {
    //处理js内容
    let outputPath = path.join(destination, path.basename(filename));
    if(value.match(/.jsx/i)){
      outputPath=outputPath.replace(/.jsx/i, ".js")
    }
    buildContent(content, filename, outputPath, babelOptions);
  }else if (fileType===2) {
    const outputPath = path.join(destination, path.basename(filename));
    copy(filename, outputPath);
    const stylePath = path.join(styleRoot, path.basename(filename));
    copy(filename, stylePath);
  }else  if(fileType===3){
    const outputPath = path.join(templateRoot, path.basename(filename));
    copy(filename, templateRoot);
  }else
  {
    // const outputPath = path.join(mediaRoot, path.basename(filename));
    // copy(filename, outputPath);
    let outputPath = path.join(destination, path.basename(filename));
    copyContent(content, filename, outputPath, babelOptions);
  }
}

export default function buildBabel(folderPath, destination, babelOptions = {}, firstFolder = true) {
  let stats = fs.statSync(folderPath);

  if (stats.isFile()) {
    buildFile(folderPath, destination, babelOptions);
  } else if (stats.isDirectory()) {
    let outputPath = firstFolder ? destination : path.join(destination, path.basename(folderPath));
    let files = fs.readdirSync(folderPath).map(file => path.join(folderPath, file));
    files.forEach(filename => buildBabel(filename, outputPath, babelOptions, false));
  }
}
