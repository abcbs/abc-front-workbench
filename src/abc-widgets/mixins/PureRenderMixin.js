'use strict';
var _ = require('../util/_');

//backport PureRenderEqual
const PureRenderMixin = {

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isShallowEqual(this.props, nextProps) ||
           !_.isShallowEqual(this.state, nextState);
  }
}


export default PureRenderMixin;