/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';
var evalToString = require('./evalToString');
var existingErrorMap = require('./codes.json');
var invertObject = require('./invertObject');

var errorMap = invertObject(existingErrorMap);

module.exports = function(babel) {
  var t = babel.types;

  var SEEN_SYMBOL = Symbol('dev-expression-with-codes.seen');

  // Generate a hygienic identifier
  function getProdInvariantIdentifier(path, localState) {
    if (!localState.prodInvariantIdentifier) {
      //生成一个不会和任何本地定义的变量冲突的标识符(identifier)
      localState.prodInvariantIdentifier = path.scope.generateUidIdentifier('prodInvariant');
      path.scope.getProgramParent().push({
        id: localState.prodInvariantIdentifier,
        /**
         * require("reactProdInvariant")
         *
         * interface CallExpression <: Expression {
         *    type: "CallExpression";
         *    callee: Expression | Super | Import;
         *    arguments: [ Expression | SpreadElement ];
         *  }
         *
         */
        init: t.callExpression(
          t.identifier('require'),
          [t.stringLiteral('reactProdInvariant')]
        ),
      });
    }
    return localState.prodInvariantIdentifier;
  }
  //构造二元表达式节点
  /**
   * process.env.NODE_ENV!=='production'
   *
   * interface MemberExpression <: Expression, Pattern {
   *    type: "MemberExpression";
   *    object: Expression | Super;
   *    property: Expression;
   *    computed: boolean;
   *   }
   */
  var DEV_EXPRESSION = t.binaryExpression(
    '!==',
    t.memberExpression(//左表达式//process.env
      t.memberExpression(
        t.identifier('process'),//process
        t.identifier('env'),//env
        false
      ),
      t.identifier('NODE_ENV'),//右表达式,NODE_ENV
      false
    ),
    t.stringLiteral('production')
  );

  return {
    pre: function() {
      this.prodInvariantIdentifier = null;
    },
    //节点访问器
    visitor: {
      Identifier: {
        enter: function(path) {//替换__DEV__
          // Do nothing when testing
          if (process.env.NODE_ENV === 'test') {
            return;
          }
          // Replace __DEV__ with process.env.NODE_ENV !== 'production'
          //如果你想检查节点的类型__DEV__
        },
      },
      CallExpression: {
        exit: function(path) {
          var node = path.node;
          // Ignore if it's already been processed
          //已经处理过的节点
          if (node[SEEN_SYMBOL]) {
            return;
          }
          if (
              path.get('callee').isIdentifier({name: 'require'}) &&
              path.get('arguments')[0]&&path.get('arguments')[0].isStringLiteral({type:"StringLiteral"})
          ){
            var cssImport = node.arguments[0];
            const type=cssImport.type;
            const value=cssImport.value.toLowerCase();
            if(value&&(value.indexOf("css")!==-1||
                value.indexOf("less")!==-1||value.indexOf("less")!==-1)){
              console.log("Babel Travser: is sytles value,",value)
              path.remove();
              node[SEEN_SYMBOL]=true;
              return;
            }
          }
          if (
              path.get('callee').isIdentifier({name: 'info'})
          ){
              path.remove();
              node[SEEN_SYMBOL]=true;
              return;
            // }
          }
          // Insert `var PROD_INVARIANT = require('reactProdInvariant');`
          // before all `require('invariant')`s.
          // NOTE it doesn't support ES6 imports yet.
          //如果有require('invariant')则在最前边添加var PROD_INVARIANT = require('reactProdInvariant'

        },
      },
    },
  };
};
