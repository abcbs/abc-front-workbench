import React, { PropTypes } from 'react'
import classNames           from 'classnames'
import { FormControl} from '../abc-bootstrap'


export default class AbcFeedback extends React.Component
{
    //style={{ position: 'relative'}}
    static propTypes =
    {
        bsStyle : "abc",
        style :PropTypes.string,
    }

    static defaultProps =
    {
        style :{paddingRight:"2px"},
    }
    render()
    {
        const {bsStyle, style,children, ...other} = this.props
        const feedback=(<FormControl.Feedback   bsStyle={bsStyle} style={style}  {...other}>
           </FormControl.Feedback>)
        return feedback;
    }
}