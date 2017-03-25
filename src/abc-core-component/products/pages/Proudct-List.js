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
import ProductList from '../components/ListTableSample'


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
@container({title:messages.produclist.title,
    subTitle:messages.produclist.subTitle})
export default class ProudctList extends React.Component {
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
        return (
            <div>
                <ProductList />
            </div>
        );
    }
}
