import React, { PropTypes } from 'react'
import classNames           from 'classnames'

export default class AbcContainer extends React.Component
{
    static propTypes =
    {
        bsStyle : PropTypes.string,
        bsSize :PropTypes.string,
    }

    static defaultProps =
    {
        bsStyle : "abc",
        // bsSize :"abc",
    }

    render() {
        const { bsStyle, bsSize, children, ...other} = this.props
        return (
            <div bsStyle={bsStyle} bsSize={bsSize} {...other}>
                {
                    children
                }
            </div>
        )
    }
}