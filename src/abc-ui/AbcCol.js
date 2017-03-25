import React, { PropTypes } from 'react'
import classNames           from 'classnames'
import {Col} from '../abc-bootstrap'
// import {deviceType }from '../abc-framework/utils/Devices'
export default class AbcCol extends React.Component
{
    //style={{ position: 'relative'}}
    static propTypes =
    {

        style :PropTypes.string,
        bsStyle : PropTypes.string,
        bsSize :PropTypes.string,
    }

    static defaultProps =
    {
        // style :{ zIndex: '1040', paddingLeft:"1px",paddingRight:"1px"},
        bsStyle : "default",
        bsSize :"abc",
    }
    render()
    {
        // const isMobile=deviceType().mobile;
        const {bsStyle, bsSize,style,children,colStyle, ...other} = this.props
        const _style={...colStyle,...style};
        // style={isMobile?_style:style}
        const col=(<Col   bsStyle={bsStyle} bsSize={bsSize}  style={_style}  {...other}>
            {children}</Col>)
        return col;
    }
}