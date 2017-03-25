import React, { PropTypes } from 'react'
import classNames           from 'classnames'
import {ButtonToolbar} from '../abc-bootstrap'

export default class AbcButton extends React.Component
{
    //style={{ position: 'relative'}}
    static propTypes =
    {
        style :PropTypes.string,
        bsStyle : PropTypes.string,
        bsSize :PropTypes.string,
    }

    static defaultProps =
    {
         style :{ position: 'relative'},
         bsStyle : "default",
         bsSize :"abc",
    }
    render()
    {
        const {bsStyle, bsSize, style,children, ...other} = this.props
        const buttonToolbar=(<ButtonToolbar   bsStyle={bsStyle} bsSize={bsSize}  style={style}   {...other}>
            {children}</ButtonToolbar>)
        return buttonToolbar;
    }
}