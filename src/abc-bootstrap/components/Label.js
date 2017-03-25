import classNames from 'classnames';
import React from 'react';

import { bsClass, bsStyles, getClassSet, splitBsProps }
  from '../utils/bootstrapUtils';
import { State, Style } from '../utils/StyleConfig';

import values from 'lodash/values';

import invariant from 'invariant';

import info from '../../abc-framework/utils/logger'

Object.values=Object.values||values;

class Label extends React.Component {
  hasContent(children) {
    let result = false;

    React.Children.forEach(children, child => {
      if (result) {
        return;
      }

      if (child || child === 0) {
        result = true;
      }
    });

    return result;
  }

  render() {
    const { className, children, ...props } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);
    // bsStyle={bsStyle}  bsSize={bsSize}
    const classes = {
      ...getClassSet(bsProps),

      // Hack for collapsing on IE8.
      hidden: !this.hasContent(children),
    };

    return (
      <span
        {...elementProps}
        className={classNames(className, classes)}
      >
        {children}
      </span>
    );
  }
}
//bsStyles(styles, defaultStyle, Component)
//bsClass = (defaultClass, Component)
/**
 export const State = {
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info',
};
 export const Style = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  LINK: 'link',
  INVERSE: 'inverse',
};
 */
var bsStylesComponent=  bsStyles(
    [...Object.values(State), Style.DEFAULT, Style.PRIMARY],
    Style.DEFAULT,
    Label
)
export default bsClass('label',
    bsStylesComponent
);
