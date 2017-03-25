import React ,{PropTypes}from 'react';
import ReactDOM from 'react-dom';

import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import {reduxForm,getFormValues} from 'redux-form';
import { browserHistory } from 'react-router'
import { push } from 'redux-router';

import international from '../../../abc-framework/international/internationalize'

import { preload,goto }            from '../../../abc-framework/react-isomorphic-render/redux'
import {Modal,Glyphicon,Grid,Row,Col,Thumbnail,
    Image,Button,Media,Checkbox,ButtonToolbar,FormControl,Table} from '../../../abc-bootstrap'

import {AbcPanel,AbcPanelHeaderTitleAndNumber as HeaderTitleAndNumber}
    from '../../../abc-ui/abc-ui-index'

import {AbcTableRow4} from './AbcTableInRow'

export default class ProductManager extends React.Component {

    static propTypes =
    {
        //数据装载时，状态切换
        formConfig:PropTypes.object
    }

    static contextTypes =
    {
        intl: PropTypes.object,

    }

    static defaultProps =
    {
        // formConfig:list.formConfig
    }

    handleHeaderProductClick(e){
        const node=this.refs[e.currentTarget.id];
        const x = ReactDOM.findDOMNode(node);
        console.log("test,",x);
        console.log("e id,",e.currentTarget.id);
        console.log("manageredProductHeader id->",x.id);
        e.preventDefault();

    }

    handleClick(e){
        const node=this.refs[e.currentTarget.id];
        const x = ReactDOM.findDOMNode(node);
        console.log("test,",x);
        console.log("e id,",e.currentTarget.id);
        console.log("shelvedProductHeader id->",x.id);
        e.preventDefault();
    }

    render() {
        const  manageredProductHeader=(<HeaderTitleAndNumber numbers="" title="商品维护"/>);
        const  manageredProductHeader1=(<HeaderTitleAndNumber numbers="" title="商品维护1"/>);
        const  productHeader=(<HeaderTitleAndNumber numbers="" title="商品汇总"/>);
        const  shelvedProductHeader=(<HeaderTitleAndNumber numbers="每行四个" title="已上架商品"/>);
        const rowProducts4=require('./demo-data').rowProducts4;
        return (

           <AbcPanel header={manageredProductHeader}
                          id="manageredProductHeader001" ref="manageredProductHeader001"
                          key="manageredProductHeader"
                     onDoubleClick={this.handleHeaderProductClick.bind(this)}
                     // onClick={this.handleHeaderProductClick.bind(this)}
           >

                <AbcTableRow4 header={shelvedProductHeader} rowProducts={rowProducts4}
                              id="shelvedProductHeader" ref="shelvedProductHeader"
                              headerId="shelvedProductHeader" headerRef="shelvedProductHeader"
                              key="shelvedProductHeader"
                              handleHeaderClick={this.handleClick.bind(this)}
                />

            </AbcPanel>
        )
    }

}