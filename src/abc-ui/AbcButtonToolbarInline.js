import React, { PropTypes } from 'react'
import classNames           from 'classnames'

export default class AbcButtonToolbarInline extends React.Component
{
    //style={{ position: 'relative'}}
    static propTypes =
    {
        bsStyle : PropTypes.string,
    }

    static defaultProps =
    {
        bsStyle :"inline-abc",
    }
    render()
    {
        const {bsStyle, children, ...other} = this.props
        const buttonToolbar=(<span   className={bsStyle} {...other}>
            {children}</span>)
        return buttonToolbar;
    }
}