import React from 'react';
import { findDOMNode } from 'react-dom';

const AutoFocusMixin={
  propTypes: {
    autoFocus: React.PropTypes.bool
  },

  componentDidMount() {
    let { autoFocus } = this.props;

    if (autoFocus)
      this.focus ? this.focus() : findDOMNode(this).focus()
  }
};

export default AutoFocusMixin;