import React, { PropTypes } from 'react'
import classNames           from 'classnames'
import {ButtonToolbar,HelpBlock} from '../abc-bootstrap'

import AbcRow from './AbcRow'
import AbcCol from './AbcCol'
export default class AbcButton extends React.Component
{
     static propTypes =
    {
        style :PropTypes.string,
    }

    static defaultProps =
    {
        style :{ position: 'relative'},
    }
    render()
    {
        const { style,children, ...other} = this.props
        const buttonToolbar=
        (<AbcRow>
            <AbcCol xs={12} sm={12} md={12} lg={12}>
                <ButtonToolbar style={{float:"right"}} {...other} >
                    {children}
                    <HelpBlock></HelpBlock>
                </ButtonToolbar>
            </AbcCol>
            </AbcRow>
         )
        return buttonToolbar;
    }
}