import React, { PropTypes } from 'react'
import classNames           from 'classnames'
import {Button} from '../abc-bootstrap'

export default class AbcButton extends React.Component
{
    // <Button type="button" bsStyle="default" style=>
    static propTypes =
    {
        bsStyle : PropTypes.string,
        bsSize :PropTypes.string,
    }

    static defaultProps =
    {
        bsStyle : "default",
        bsSize :"abc",
        
    }
    render()
    {
        const { bsStyle, bsSize,style,children, ...other} = this.props
        const button=(<Button bsStyle={bsStyle} bsSize={bsSize}  style={style}  {...other}>
            {children}</Button>)
        return button;
    }
}