'use strict';
var React = require('react')

const RtlParentContextMixin = {

  propTypes: {
    isRtl: React.PropTypes.bool
  },

  contextTypes: {
    isRtl: React.PropTypes.bool
  },

  childContextTypes: {
    isRtl: React.PropTypes.bool
  },

  getChildContext() {
    return {
      isRtl: !!(this.props.isRtl || (this.context && this.context.isRtl))
    }
  },

  isRtl() {
    return !!(this.props.isRtl || (this.context && this.context.isRtl))
  }

}

export default RtlParentContextMixin