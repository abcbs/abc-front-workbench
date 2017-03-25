import React, { PropTypes } from 'react'
import classNames           from 'classnames'
import {Label} from '../abc-bootstrap'

export default class AbcLabel extends React.Component
{
    static propTypes =
    {
        bsStyle : PropTypes.string,
        bsSize :PropTypes.string,
    }
    //label label-bg label-abc
    static defaultProps =
    {
        bsStyle : "abc",
        bsSize :"bg",
    }
    render()
    {
        const { bsStyle, bsSize,children, ...other} = this.props
        const label=(<Label bsStyle={bsStyle}  bsSize={bsSize}  {...other}>
            {children}</Label>)
        return label;
    }
}