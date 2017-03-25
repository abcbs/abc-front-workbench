import React,{ PropTypes,Component,createElement } from 'react';
import ReactDOM from 'react-dom'
import AbcContainer from '../../abc-framework/ui/AbcContainerWrape'
import AbcPage from '../../abc-framework/ui/AbcContainerFramePage'
import { defineMessages }              from 'react-intl'
import international from '../../abc-framework/international/internationalize'
// import Preloading      from '../../abc-ui/preloading'
// import Snackbar        from '../../abc-ui/snackbar'

import { title }              from '../../abc-framework/react-isomorphic-render/index.es6'
import { preload,goto }            from '../../abc-framework/react-isomorphic-render/redux'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button,ButtonToolbar} from '../../abc-bootstrap'
// import 'bootstrap/less/theme.less'
// import 'bootstrap/less/bootstrap.less';
import container from '../../abc-framework/ui/AbcContainerPage'
import Spinner        from '../../abc-ui/spinner'
// import '../../../resource/styles/abc-components/styles/style.scss'
import {Popover} from '../../abc-bootstrap'
import errorInfo from '../../abc-framework/ui/errorInfo'
import {user_manager_url} from '../../abc-framework/routeres/ModuleURL'

const fetchUsers = () =>
    ({
        // that:_this;
        promise: http => http.get(user_manager_url).then(
            (ids =>
            {
                console.log("idx,",ids)
                goto('./home')

            }),
            (err=>{
                console.log("没有网络，或者网络过慢，请稍等再试,",err);
                 errorInfo(" 没有网络，或者网络过慢，请稍等再试")
                 throw new Error("Final,NO Net");
             }
            )
        ),
        events: ['GET_USERS_PENDING', 'GET_USERS_SUCCESS', 'GET_USERS_FAILURE']
    })
//
const messages = defineMessages
({
        title:
        {
            id             : 'Introduction.title',
            description    : '首页配置',
            defaultMessage : '介绍'
        },
        subTitle:
        {
            id             : 'Introduction.subTitle',
            description    : '商品介绍',
            defaultMessage : '商品介绍'
        }
    }
)

@preload(({ dispatch }) => dispatch(fetchUsers()))
@connect
(
    state    => {
        //.default.authentication.authentication
        // const authn=state.authentication||state.default.authentication;
        // const users=authn.authentication.user;
        // const authn=state.authentication||state.default.authentication;
        // const users=authn.user;
        const authn=state.authentication||state.default.authentication;
        const users=authn.authentication.user;
        return
            ({  users:users,
                loading   : state.users.loading,
                loaded        : state_users.loaded,
                loading_error : state_users.loading_error
            })
    }
    ,
    dispatch => bindActionCreators({ fetchUsers }, dispatch)
)

@international()
@container({title:messages.title, subTitle:messages.subTitle})
export default class IntroductionPage extends Component
{
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
        this.props.fetchUsers();
    }
    render() {
        const { error, loaded } = this.props
        this.state&&this.state.error&&console.log(" this.state.error;,", this.state.error)
        console.log("error,",error)
        console.log("loaded,",loaded)
        return (
          <div>
                        <Spinner/>
                        Hello,商品介绍,Hello,商品介绍
                        <div>
                            <Button onClick={
                                    this.handleClick.bind(this)}
                            >Refresh</Button>
                        </div>
            </div>
        );
    }

    async deleteUsers()
    {
        try
        {
            const count = await this.props.deleteUsers()
            alert(`Deleted ${count} users`)
        }
        catch (error)
        {
            alert(error)
        }
    }
}

