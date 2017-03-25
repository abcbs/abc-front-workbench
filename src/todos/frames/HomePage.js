import React ,{PropTypes}from 'react';
import AbcContainer from '../../abc-framework/ui/AbcContainerWrape'
import AbcPage from '../../abc-framework/ui/AbcContainerFramePage'
import {Label,Badge,ButtonToolbar,Button,Checkbox} from '../../abc-bootstrap'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import 'bootstrap/less/theme.less'
import 'bootstrap/less/bootstrap.less';
import { defineMessages }              from 'react-intl'
import international from '../../abc-framework/international/internationalize'
import { preload,goto }            from '../../abc-framework/react-isomorphic-render/redux'
import container from '../../abc-framework/ui/AbcContainerPage'
import { browserHistory } from 'react-router'
import { push } from 'redux-router';
import errorInfo from '../../abc-framework/ui/errorInfo'
import {user_manager_url} from '../../abc-framework/routeres/ModuleURL'
function fetchUsers()
{
    return {
        promise: http => http.get(user_manager_url).then(
            ids =>
               console.log("ids,",ids),
            (err=>{
                    console.log("没有网络，或者网络过慢，请稍等再试,",err);
                    errorInfo(" 没有网络，或者网络过慢，请稍等再试")
                    throw new Error("Final,NO Net");
                }
            )
        ),
        events: ['GET_USERS_PENDING', 'GET_USERS_SUCCESS', 'GET_USERS_FAILURE']
    }
}

const messages = defineMessages
({
    title:
    {
        id             : 'home.title',
        description    : '首页配置',
        defaultMessage : '首页'
    },
    subTitle:
        {
            id             : 'home.subTitle',
            description    : '首页子标题',
            defaultMessage : '欢迎光临'
     }
}
)

@connect
(
    state    => {
        //.default.authentication.authentication
        // const authn=state.authentication||state.default.authentication;
        // const users=authn.user;
        const authn=state.authentication||state.default.authentication;
        const users=authn.authentication.user;
        return
        { users:users }
    }
    ,
    dispatch => bindActionCreators({ fetchUsers,
        push  }, dispatch)
)
@preload(({ dispatch }) => dispatch(fetchUsers()))
@international()
@container({title:messages.title, subTitle:messages.subTitle})
export default class HomePage extends React.Component {
    static propTypes =
    {
        users      : PropTypes.array,
        fetchUsers : PropTypes.func,
        loading       : PropTypes.bool,
        loaded        : PropTypes.bool,
        loading_error : PropTypes.object
    }
    static contextTypes =
    {
        intl: PropTypes.object,
        // router: React.PropTypes.object
    }


    handleClick(e) {
        console.log("e,",e.target.value);
        //this.props.fetchUsers();
        // this.centex("/app")
        browserHistory.push("/app")
        // goto('/app')
    }

    render() {
        //var root=$&&$("root");
        //label-primary-bg
        // const { translate } = this.props;
        // const title=translate(messages.title);
        return (
        <span >
            <Checkbox onClick={this.handleClick.bind(this)}></Checkbox>
            <input type="checkbox"/>
            <input type="checkbox"/>
            <input type="checkbox"/>
            <Label bsStyle="abc" bsSize="bg">test</Label>
            {
                // this.props.translate("home.title")
            }
            <span>
              <Button type="button" bsStyle="default" style={{display:'inline'}}>
                  确定
               </Button><Badge bsStyle="info" bsSize="abc">4</Badge>
             </span>
            <ButtonToolbar style={{ position: 'relative'}}>
                Messages<Badge bsStyle="abc">17</Badge>
            </ButtonToolbar>
            <form onSubmit={this.handleClick.bind(this)}>
              <input type="text" placeholder="userName"/>
              <input type="text" placeholder="repo"/>
              <button type="submit">Go</button>
            </form>
            <Button onClick={this.handleClick.bind(this)}>Refresh</Button>
        </span>
     );
    }
    //
    // render() {
    //     //var root=$&&$("root");
    //     //label-primary-bg
    //     const { translate } = this.props;
    //     const title=translate(messages.title);
    //     return (
    //         <AbcPage title={translate(messages.title)}
    //                  router="home"
    //                  subTitle={translate(messages.subTitle)} >
    //             <AbcContainer>
    //                     <span style={{ position: 'absolute' ,display:'inline-block'}}>
    //                         <Checkbox onClick={this.handleClick.bind(this)}></Checkbox>
    //                         <input type="checkbox"/>
    //                         <input type="checkbox"/>
    //                         <input type="checkbox"/>
    //                         <Label bsStyle="abc" bsSize="bg">test</Label>
    //                         {
    //                             // this.props.translate("home.title")
    //                         }
    //                         <span>
    //                          <Button type="button" bsStyle="default" style={{display:'inline'}}>
    //                          确定
    //                         </Button><Badge bsStyle="info" bsSize="abc">4</Badge>
    //                             </span>
    //                         <ButtonToolbar style={{ position: 'relative'}}>
    //                             Messages<Badge bsStyle="abc">17</Badge>
    //                             </ButtonToolbar>
    //
    //                          <Button onClick={
    //                                 this.handleClick.bind(this)}>Refresh</Button>
    //                         </span>
    //             </AbcContainer>
    //
    //         </AbcPage>
    //     );
    // }
}
