import React, { PropTypes } from 'react'
import classNames           from 'classnames'
import {Form} from '../abc-bootstrap'

export default class AbcFormInline extends React.Component
{
    static propTypes =
    {
        style :PropTypes.string,
        bsStyle : PropTypes.string,
        bsSize :PropTypes.string,
    }
    static defaultProps =
    {
        bsStyle : "default",
        bsSize :"abc",

    }
    //<Form inline onSubmit={this.handleClick.bind(this)}>
    render()
    {
        //inline
        // horizontal
        const {style,bsStyle, bsSize, children, ...other} = this.props
        const form=(<Form inline  bsStyle={bsStyle}  bsSize={bsSize} style={style}  {...other}>
            {children}</Form>)
        return form;
    }
}