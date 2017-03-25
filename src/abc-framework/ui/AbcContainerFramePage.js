import React, { Component, PropTypes, Children } from 'react'
import PageFooter from './AbcPageFooter'
import PageHeader from './AbcPageHeader'
import NotFoundPage from './AbcNotFoundPage'
import AbcNavMain from './AbcNavMain'
import classnames from 'classnames';
import  '../../../resource/styles/css/index.css'
export default class AbcPage extends Component {
    getChildContext() {

    }
    constructor(props, context) {
        super(props, context);
    }

    rederChildren(children){
        return children;
    }
    render() {
        // require( '../../../resource/styles/css/index.css')
        const { children,router,title, subTitle,theme,...other} = this.props;
        return (
            <div className="container container-desktop container-lg " {...other}
                 style={{zIndex:'1060',marginTop:"60px",paddingLeft:"0px",paddingRight:"0px"}}>
                 <AbcNavMain />
                 <PageHeader title={title}  subTitle={subTitle}  />
                 {this.rederChildren(children)}
                 <PageFooter />
            </div>
        )
    }
}
AbcPage.defaultProps={
    router:'app',
    title:"ABC",
    theme:"marginPageTop"
}

AbcPage.propTypes = {
    router:PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    theme:PropTypes.string,
    children: PropTypes.element.isRequired
}
AbcPage.childContextTypes = {

}
