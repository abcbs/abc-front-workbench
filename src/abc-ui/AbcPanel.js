import React, { PropTypes } from 'react'
import classNames           from 'classnames'
import {Panel} from '../abc-bootstrap'

export default class AbcPanel extends React.Component
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
        // style :{marginBottom:"5px"},
        bsStyle : "default",
        bsSize :"abc",
    }
    render()
    {
        const {bsStyle, bsSize, style,children, ...other} = this.props
        const buttonToolbar=(<Panel  bsStyle={bsStyle}  bsSize={bsSize}
                                     style={style}  {...other}>
            {children}</Panel>)
        return buttonToolbar;
    }
}

export class AbcPanelOrientation extends AbcPanel
{

    static defaultProps =
    {
        bsStyle : "orientation",
    }

}