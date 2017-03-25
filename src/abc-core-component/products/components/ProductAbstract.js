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

import {AbcFormInline,AbcRow,AbcPanel,AbcButtonToolbarRight,AbcButton,
    AbcColRedFormA,AbcColRedFormB,AbcColRedFormC,
    AbcPanelHeaderTitleAndNumber as HeaderTitleAndNumber}
    from '../../../abc-ui/abc-ui-index'

import AbcTableTop2Bottom3        from './AbcTableListGridFrame'

//业务功能
// import AuthenticationManager from './AuthenticationManager'
// import {list} from'./formConfig'

export default class ProductAbstract extends React.Component {

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

    handleClick(){
        const node=this.refs.productListHeader;
        const x = ReactDOM.findDOMNode(node);
        console.log("test,",x)
    }

    render() {

        const tableSampleHeader=(<HeaderTitleAndNumber numbers="3,3,3,3" title="样式示例"/>);
        const tableTodayHotHeader=(<HeaderTitleAndNumber numbers="1-2" title="抢购"/>);
        const productEtrHeader=(<HeaderTitleAndNumber numbers="右图" title="电器"/>);
        const productleHeader=(<HeaderTitleAndNumber numbers="3,3,3,3" title="固定宽度"/>);
        const tableGroupHotHeader=(<HeaderTitleAndNumber numbers="上下" title="促销"/>);
        const  productTaobaoHeader=(<HeaderTitleAndNumber numbers="右图" title="淘宝抢购"/>);
        const  priceButtomHeader=(<HeaderTitleAndNumber numbers="1-3/1-3" title="超实惠"/>);
        const tianMaoHeader=(<HeaderTitleAndNumber numbers="3,3,3,3" title="天猫必逛"/>);
        const coomonVenderHeader=(<HeaderTitleAndNumber numbers="4,4,6,6" title="普通商户"/>);
        const  priceTopHeader=(<HeaderTitleAndNumber numbers="1-3/1-3" title="Top10"/>);
        const  priceReadyHeader=(<HeaderTitleAndNumber numbers="1-3/1-3" title="预热"/>);
        const tianMDHeader=(<HeaderTitleAndNumber numbers="2-3" title="天猫"/>);
        const rowProducts=require('./demo-data').rowProducts;
        return (
            <AbcPanel>
                  <AbcPanel  header={tableSampleHeader}>
                    <Grid className="container-list-abc">
                        <Col xs={12} xp={6} sm={6} md={6}  lg={4}>
                            <Table striped={true} bordered={true} condensed={true} hover={true}
                                   style={{border:"1px solid #ddd",cellSpacing:"1",cellPadding:"1",verticalAlign:"middle"}}
                                   cellSpacing="1" cellPadding="1"
                            >
                                <caption>1+2</caption>
                                <tr>
                                    <td rowSpan="2" style={{border:"1px solid #ddd",width:"50%"}}>
                                        A-B</td>
                                    <td className="td-1-2-t">A</td>
                                </tr>
                                <tr>
                                    <td style={{border:"1px solid #ddd"}}>B</td>
                                </tr>
                            </Table>
                        </Col>
                        <Col xs={12} xp={6} sm={6} md={6}  lg={4}>
                            <Table striped={true} bordered={true} condensed={true} hover={true}
                                   style={{border:"1px solid #F00"}}
                            >
                                <caption>1-1-2</caption>
                                <tr align="center">
                                    <td rowSpan="2" style={{border:"1px solid #ddd",width:"50%"}}>A-B</td>
                                    <td colSpan="2" style={{border:"1px solid #ddd"}}>A1-A2</td>
                                </tr>
                                <tr align="center">
                                    <td style={{border:"1px solid #ddd"}}>B1</td>
                                    <td style={{border:"1px solid #ddd"}}>B2</td>
                                </tr>
                            </Table>
                        </Col>
                        <Col xs={12} xp={6} sm={6} md={6}  lg={4}>
                            <Table striped={true} bordered={true} condensed={true} hover={true}
                                   style={{border:"1px solid #F00"}}
                            >
                                <caption>1+6</caption>
                                <tr align="center">
                                    <td rowSpan="2" style={{border:"1px solid #ddd",width:"50%"}}>A-B</td>
                                    <td style={{border:"1px solid #ddd"}}>A1</td>
                                    <td style={{border:"1px solid #ddd"}}>A2</td>
                                    <td style={{border:"1px solid #ddd"}}>A3</td>
                                </tr>
                                <tr align="center">
                                    <td style={{border:"1px solid #ddd"}}>B1</td>
                                    <td style={{border:"1px solid #ddd"}}>B2</td>
                                    <td style={{border:"1px solid #ddd"}}>B3</td>
                                </tr>
                            </Table>
                        </Col>
                        <Col xs={12} xp={6} sm={6} md={6}  lg={4}>
                            <Table striped={true} bordered={true} condensed={true} hover={true}
                                   style={{border:"1px solid #F00"}}
                            >
                                <caption>1+4</caption>
                                <tr align="center">
                                    <td style={{border:"1px solid #ddd" ,width:"40%"}}>A-B</td>
                                    <td style={{border:"1px solid #ddd" ,width:"20%"}}>A1</td>
                                    <td style={{border:"1px solid #ddd" ,width:"20%"}}>A2</td>
                                    <td style={{border:"1px solid #ddd" ,width:"20%"}}>A3</td>
                                </tr>
                                <tr align="center">
                                    <td style={{border:"1px solid #ddd" ,width:"40%"}}>B1</td>
                                    <td style={{border:"1px solid #ddd" ,width:"20%"}}>B2</td>
                                    <td style={{border:"1px solid #ddd" ,width:"20%"}}>B3</td>
                                    <td style={{border:"1px solid #ddd" ,width:"20%"}}>A3</td>
                                </tr>
                            </Table>
                        </Col>
                    </Grid>
                </AbcPanel>
            </AbcPanel>

        )
    }

}