import classNames from 'classnames';
import React from 'react';

import Button from './Button';
import { bsClass, bsSizes, getClassSet, splitBsProps }
  from '../utils/bootstrapUtils';

import { Size, State, Style } from '../utils/StyleConfig';
import info from '../../abc-framework/utils/logger'

class ButtonToolbar extends React.Component {
  render() {
    const { className, ...props } = this.props;
    info(this.props);
    const [bsProps, elementProps] = splitBsProps(props);
    info("bsProps,",bsProps);
    const classes = getClassSet(bsProps);
    info("classes,",classes);
    return (
      <div
        {...elementProps}
        role="toolbar"
        className={classNames(className, classes)}
      />
    );
  }
}

export default bsClass('btn-toolbar',
  bsSizes(Button.SIZES, ButtonToolbar)
);
