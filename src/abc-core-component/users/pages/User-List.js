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

//业务功能实现
import UserManager from '../components/UserManager'
import WizardForm from '../samples/WizardForm'
import ReactWidgetsForm from '../samples/ReactWidgetsForm'
function fetchUsers()
{
    return {
        promise: http => http.get(user_manager_url).then(
            ids =>
                console.log("ids,",ids),
            (err=>{
                    console.log("没有网络，或者网络过慢，请稍等再试,",err);
                    errorInfo(" 没有网络，或者网络过慢，请稍等再试")
                    // throw new Error("Final,NO Net");

                }
            )
        ),
        events: ['GET_USERS_PENDING', 'GET_USERS_SUCCESS', 'GET_USERS_FAILURE']
    }
}

const showResults = values =>
    new Promise(resolve => {
        setTimeout(() => {  // simulate server latency
            window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
            resolve()
        }, 500)
    })

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
            fetchUsers,
            // query:simulateAuthenicationData,
            push  },
        dispatch)
)

@preload(({ dispatch }) => dispatch(fetchUsers()))

@international()
@container({title:messages.user.title, subTitle:messages.user.subTitle})
export default class UserList extends React.Component {
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
                <UserManager/>
                <ReactWidgetsForm onSubmit={showResults}/>

            </div>
        );
    }


}
