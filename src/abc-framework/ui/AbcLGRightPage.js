import React, { PropTypes } from 'react'
import classNames           from 'classnames'
import {Navbar,Panel} from '../../abc-bootstrap'
export default class AbcRightLGPage extends React.Component
{
    static propTypes =
    {
        bsStyle : PropTypes.string,
        bsSize :PropTypes.string,
    }

    static defaultProps =
    {
        bsStyle : "abc",
        bsSize :"bg",
    }
    render()
    {
        return (  <div className="container-frame right-background">

            </div>);
    }
}