import React, { PropTypes } from 'react'
import classNames           from 'classnames'
import {Badge} from '../abc-bootstrap'

export default class AbcBadge extends React.Component
{
    //<Badge bsStyle="info" bsSize="abc">
    static propTypes =
    {
        bsStyle : PropTypes.string,
        bsSize :PropTypes.string,
    }

    static defaultProps =
    {
        bsStyle : "info",
        bsSize :"abc",
    }
    render()
    {
        const { bsStyle, bsSize,children, ...other} = this.props
        const badge=(<Badge bsStyle={bsStyle}  bsSize={bsSize}  {...other}>
            {children}</Badge>)
        return badge;
    }
}