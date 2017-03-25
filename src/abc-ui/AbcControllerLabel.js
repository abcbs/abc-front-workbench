import React, { PropTypes } from 'react'
import classNames           from 'classnames'
import {ControlLabel} from '../abc-bootstrap'

export default class AbcControllerLabel extends React.Component
{
    //style={{ position: 'relative'}}
    static propTypes =
    {
        bsStyle : "abc",
        style :PropTypes.string,
    }

    static defaultProps =
    {
        //style :{ zIndex: '1040', paddingLeft:"1px",paddingRight:"1px"},
    }
    render()
    {
        const {bsStyle, style,children, ...other} = this.props
        const buttonToolbar=(<ControlLabel className="control-label-abc"
                                           bsStyle={bsStyle} style={style}  {...other}>
            {children}</ControlLabel>)
        return buttonToolbar;
    }
}