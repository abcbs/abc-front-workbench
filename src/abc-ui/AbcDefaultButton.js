import React, { PropTypes } from 'react'
import classNames           from 'classnames'
import {Button} from '../abc-bootstrap'

export default class AbcDefaultButton extends React.Component
{
    // <Button type="button" bsStyle="default" style=>
    static propTypes =
    {
        bsStyle : PropTypes.string,
        style :PropTypes.string,
    }

    static defaultProps =
    {
        bsStyle : "default",
        style :{display:'inline'},

    }
    render()
    {
        const { bsStyle, style,children, ...other} = this.props
        const button=(<Button bsStyle={bsStyle}  style={style}  {...other}>
            {children}</Button>)
        return button;
    }
}