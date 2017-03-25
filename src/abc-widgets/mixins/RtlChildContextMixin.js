
import  React from 'react';

 const RtlChildContextMixin={

  contextTypes: {
    isRtl: React.PropTypes.bool
  },

  isRtl() {
    return !!this.context.isRtl
  }

}

export default RtlChildContextMixin;