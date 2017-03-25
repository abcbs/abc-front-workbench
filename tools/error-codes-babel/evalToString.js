'use strict';

function evalToString(ast/* : Object */)/* : string */ {
  switch (ast.type) {
    case 'StringLiteral':
      return ast.value;
    case 'BinaryExpression': // `+`二元表达式
      if (ast.operator !== '+') {
        throw new Error('Unsupported binary operator ' + ast.operator);
      }
      return evalToString(ast.left) + evalToString(ast.right);
    default:
      throw new Error('Unsupported type ' + ast.type);
  }
}

module.exports = evalToString;
