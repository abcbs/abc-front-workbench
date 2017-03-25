/**
 * 手机内容页
 */
import React,{ Component, PropTypes, Children } from 'react'
import classnames from 'classnames';
import map  from 'lodash/map';
import AbcNavMain from './AbcNavMain'
import {Container} from '../../abc-ui/abc-ui-index'

export default class AbcContainer extends Component {
       render() {
        const { children,isMovedTop,isContainer,...others} = this.props;
        // const children.map=children.map||map;
        return (
            <Container className={
                    classnames({
                      'container':this.props.isContainer,
                       'container-fixed':this.props.isMovedTop
                    })}
            >
                  {
                    //Children.only(children)
                    children
                }
            </Container>
        )
    }
}

AbcContainer.propTypes = {
    children: PropTypes.element.isRequired,
    isMovedTop:PropTypes.bool.isRequired,
    isContainer:PropTypes.bool.isRequired,
}

AbcContainer.defaultProps={
    isMovedTop:false,
    isContainer:true,
}

AbcContainer.childContextTypes = {
  
}
