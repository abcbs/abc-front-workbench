import React ,{PropTypes}from 'react';
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import {reduxForm,getFormValues} from 'redux-form';
import { browserHistory } from 'react-router'
import { push } from 'redux-router';

import international from '../../../abc-framework/international/internationalize'

import { preload,goto }            from '../../../abc-framework/react-isomorphic-render/redux'
import {Modal,Glyphicon,Grid,Row,Col,Thumbnail,Image,Button,Media} from '../../../abc-bootstrap'

import {AbcPanelOrientation,AbcPanelHeaderTitleAndNumber as HeaderTitleAndNumber}
    from '../../../abc-ui/abc-ui-index'
import Spinner        from '../../../abc-ui/spinner'

//业务功能
import AuthenticationManager from './AuthenticationManager'
import {list} from'./formConfig'

export default class AuthenticationList extends React.Component {

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
        formConfig:list.formConfig
    }

    render() {
        const data=require('./authenication-simulate-data').data;
        const authenticationListHeader=(<HeaderTitleAndNumber numbers="10" title="权限列表"/>);
        const authenticationAdimHeader=(<HeaderTitleAndNumber numbers="2" title="权限底数"/>);
        return (
            <AbcPanelOrientation  header={authenticationListHeader}
                       footer={authenticationAdimHeader}>
                <AuthenticationManager key="01" formName="authentication01"
                                       formConfig={this.props.formConfig} authenticationModel={data[0]}/>
                <AuthenticationManager key="02" formName="authentication02"
                                       formConfig={this.props.formConfig} authenticationModel={data[1]}/>
                <AuthenticationManager key="03"
                                       formName="authentication03"
                                       formConfig={this.props.formConfig} authenticationModel={data[2]}/>
                <AuthenticationManager key="04" formName="authentication04"
                                       formConfig={this.props.formConfig} authenticationModel={data[3]}/>
            </AbcPanelOrientation>

        )
    }

}