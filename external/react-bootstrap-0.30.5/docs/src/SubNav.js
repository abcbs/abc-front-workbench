import React, { cloneElement } from 'react';
import classNames from 'classnames';

import {Nav} from 'react-bootstrap';



const propTypes = {
  onSelect: React.PropTypes.func,
  active: React.PropTypes.bool,
  activeKey: React.PropTypes.any,
  activeHref: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  eventKey: React.PropTypes.any,
  href: React.PropTypes.string,
  text: React.PropTypes.node,
};

const defaultProps = {
  active: false,
  disabled: false,
};

class SubNav extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { onSelect, disabled, eventKey } = this.props;

    if (onSelect) {
      e.preventDefault();

      if (disabled) {
        return;
      }

      onSelect(eventKey, e);
    }
  }

  isActive({ props }, activeKey, activeHref) {
    if (
      props.active ||
      activeKey != null && props.eventKey === activeKey ||
      activeHref && props.href === activeHref
    ) {
      return true;
    }



    return props.active;
  }

  render() {
    const {
      onSelect,
      disabled,
      activeKey,
      activeHref,
      text,
      className,
      style,
      children,
      ...props
    } = this.props;

    delete props.active; // Accessed via this.isActive().
    delete props.eventKey; // Accessed via this.isActive().

    const classes = {
      active: this.isActive(this, activeKey, activeHref),
      disabled,
    };

    return (
      <li className={classNames(className, classes)} style={style}>
        <SafeAnchor {...props}>
          {text}
        </SafeAnchor>

      </li>
    );
  }
}

SubNav.propTypes = propTypes;
SubNav.defaultProps = defaultProps;

export default SubNav;
