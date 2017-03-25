import React, { PropTypes } from 'react'
import classNames           from 'classnames'
import {Panel} from '../../abc-bootstrap'
export default class AbcNestLeftPage extends React.Component
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
        const { bsStyle, bsSize,children, ...other} = this.props
        return (
            <div className="container container-desktop container-lg">
                <hr />
                <ul style={{marginTop:"10px", marginLeft:"-38px"}}>
                    <li>test1 Rwwwe 111</li>
                    <li>123456789012</li>
                    <li>中国人民共和国</li>
                    <li>京菜京宫保鸡丁</li>
                    <li>Beijing async  system</li>
                    <li>test1 Rwwwe 111</li>
                    <li>123456789012</li>
                    <li>中国人民共和国</li>
                    <li>京菜京宫保鸡丁</li>
                    <li>Hello ABC async  system</li>
                    <li>test1 Rwwwe 111</li>
                    <li>123456789012</li>
                    <li>中国人民共和国</li>
                    <li>京菜京宫保鸡丁</li>
                    <li>Hello async  system</li>
                </ul>
            </div>
        );
    }
}