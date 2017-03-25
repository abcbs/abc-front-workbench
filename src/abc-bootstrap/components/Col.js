import classNames from 'classnames';
import React from 'react';
import elementType from 'react-prop-types/lib/elementType';
import { Size, State, Style } from '../utils/StyleConfig';
import { bsClass, prefix, splitBsProps } from '../utils/bootstrapUtils';
import info from '../../abc-framework/utils/logger'
import { DEVICE_SIZES } from '../utils/StyleConfig';

const propTypes = {
  componentClass: elementType,
  //手机横屏情况
  xp: React.PropTypes.number,
  //手机竖屏情况，
  vp: React.PropTypes.number,
  //boot-desktop
  dt: React.PropTypes.number,
  
  xs: React.PropTypes.number,

  sm: React.PropTypes.number,

  md: React.PropTypes.number,

  lg: React.PropTypes.number,

  xpHidden: React.PropTypes.bool,

  vpHidden: React.PropTypes.bool,

  dtHidden: React.PropTypes.bool,

  xsHidden: React.PropTypes.bool,

  smHidden: React.PropTypes.bool,

  mdHidden: React.PropTypes.bool,

  lgHidden: React.PropTypes.bool,

  xsOffset: React.PropTypes.number,

  xpOffset: React.PropTypes.number,

  vpOffset: React.PropTypes.number,

  smOffset: React.PropTypes.number,

  mdOffset: React.PropTypes.number,

  lgOffset: React.PropTypes.number,

  xsPush: React.PropTypes.number,

  xpPush: React.PropTypes.number,

  vpPush: React.PropTypes.number,

  smPush: React.PropTypes.number,

  mdPush: React.PropTypes.number,

  lgPush: React.PropTypes.number,

  xsPull: React.PropTypes.number,

  xpPull: React.PropTypes.number,

  vpPull: React.PropTypes.number,

  smPull: React.PropTypes.number,

  mdPull: React.PropTypes.number,

  lgPull: React.PropTypes.number,
};

const defaultProps = {
  componentClass: 'div',
};

class Col extends React.Component {
  render() {
    const { componentClass: Component, className,bsStyle,bsSize, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);
    info(this.props);
    const classes = [];
    if(bsStyle){
      classes.push("col-"+bsStyle)
    }
    if(bsSize){
      classes.push("col-"+bsSize)
    }
    DEVICE_SIZES.forEach(size => {
      function popProp(propSuffix, modifier) {
        const propName = `${size}${propSuffix}`;
        const propValue = elementProps[propName];

        if (propValue != null) {
          classes.push(prefix(bsProps, `${size}${modifier}-${propValue}`));
        }

        delete elementProps[propName];
      }

      popProp('', '');
      popProp('Offset', '-offset');
      popProp('Push', '-push');
      popProp('Pull', '-pull');

      const hiddenPropName = `${size}Hidden`;
      if (elementProps[hiddenPropName]) {
        classes.push(`hidden-${size}`);
      }
      delete elementProps[hiddenPropName];
    });
    //bsStyle={bsStyle} bsSize={bsSize}
    return (
      <Component
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

Col.propTypes = propTypes;
Col.defaultProps = defaultProps;

export default bsClass('col', Col);
