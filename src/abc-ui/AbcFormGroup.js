import React, { PropTypes } from 'react'
import classNames           from 'classnames'
import {FormGroup} from '../abc-bootstrap'

export default class AbcFormGroup extends React.Component
{
    static propTypes =
    {
        style :PropTypes.string,
    }

    static defaultProps =
    {
        style :{ width: '100%'},
        
    }
    render()
    {
        const { style,children, ...other} = this.props
        const formGroup=(<FormGroup  style={style}  {...other}>
            {children}</FormGroup>)
        return formGroup;
    }
}