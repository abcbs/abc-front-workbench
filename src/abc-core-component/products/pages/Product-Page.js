import React ,{PropTypes}from 'react';
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import {reduxForm,getFormValues} from 'redux-form';

import { browserHistory } from 'react-router'
import { push } from 'redux-router';

import international from '../../../abc-framework/international/internationalize'
import { preload,goto }            from '../../../abc-framework/react-isomorphic-render/redux'

import container from '../../../abc-framework/ui/AbcContainerPage'
import errorInfo from '../../../abc-framework/ui/errorInfo'

import messages from '../../../abc-framework/messages/messages'
import Spinner        from '../../../abc-ui/spinner'


import {user_manager_url} from '../../../abc-framework/routeres/ModuleURL'
import {Modal,Glyphicon} from '../../../abc-bootstrap'

//ProductList
// import ProductList from '../components/ProductList'
//ProductPage
import ProductList from '../components/ProductManager'

@connect
(
    state    => {
        //权限数据
        const authn=state.authentication;
        const users=authn.authentication.user;
        return(
        {
            users:users,
        })
    }
    ,
    dispatch => bindActionCreators({
            push  },
        dispatch)
)

// @preload(({ dispatch }) => dispatch(fetchUsers()))

@international()
@container({title:messages.producmanager.title,
    subTitle:messages.producmanager.subTitle})
export default class ProductPage extends React.Component {
    static propTypes =
    {
        users      : PropTypes.array,
        fetchUsers : PropTypes.func,
        //数据装载时，状态切换
        adding       : PropTypes.bool,
        loading_error : PropTypes.object,
        adding_error  : PropTypes.object,
    }

    static contextTypes =
    {
        intl: PropTypes.object,

    }

    render(){
        // const data=require('./data').data;
        // //查询数据放入
        // this.props.query&&this.props.query(data);
        return (
            <div>
                <ProductList />
            </div>
        );
    }


}
