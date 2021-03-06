import classNames from 'classnames';
import React from 'react';

import { bsClass, getClassSet, prefix, splitBsProps }
  from '../utils/bootstrapUtils';

const propTypes = {
  /**
   * An icon name. See e.g. http://getbootstrap.com/components/#glyphicons
   */
  glyph: React.PropTypes.string.isRequired,
};

class Glyphicon extends React.Component {
  render() {
    const { glyph, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      [prefix(bsProps, glyph)]: true,
    };

    return (
      <span
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

Glyphicon.propTypes = propTypes;

export default bsClass('glyphicon', Glyphicon);
