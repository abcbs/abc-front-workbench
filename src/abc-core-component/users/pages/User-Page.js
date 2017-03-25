import React ,{PropTypes}from 'react';
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import { push } from 'redux-router';

import { defineMessages }              from 'react-intl'

import international from '../../../abc-framework/international/internationalize'
import { preload,goto }            from '../../../abc-framework/react-isomorphic-render/redux'
// import AbcContainer from '../../../abc-framework/ui/AbcContainer'
// import AbcPage from '../../../abc-framework/ui/AbcPage'
import container from '../../../abc-framework/ui/AbcContainerPage'
import errorInfo from '../../../abc-framework/ui/errorInfo'

import {Modal,Glyphicon,Image} from '../../../abc-bootstrap'
import {Label,Badge,ButtonToolbar,Button,Checkbox,Col,Row ,Panel} from '../../../abc-bootstrap'
import {FormGroup, ControlLabel, HelpBlock,FormControl,Form} from '../../../abc-bootstrap'

import {AbcLabel,AbcBadge,AbcButton,AbcButtonToolbar,AbcFormInline,AbcCol,
    AbcFormGroup,AbcFormControl,AbcDefaultButton,AbcRow,AbcPanel,
    AbcColA,AbcColB,AbcColC,AbcFormHorizontal,AbcRowHz

} from '../../../abc-ui/abc-ui-index'

import {
    AbcPanelHeaderTitleAndNumber as HeaderTitleAndNumber,
    AbcColRedFormHiddenLabelA,AbcColHiddenLabelImage,AbcColRedFormHiddenLabelC}
    from '../../../abc-ui/abc-ui-index'

import {AbcColReduxFormInput,AbcColReduxFormCheckbox,AbcColReduxFormButtons,
    AbcColReduxFormButtonIcons, AbcColReduxFormImage

} from '../../../abc-ui/abc-ui-index'

import {reduxForm,getFormValues} from 'redux-form';

import 'bootstrap/less/theme.less'
import 'bootstrap/less/bootstrap.less';
import UserSearchHeader from '../../../abc-ui/AbcPanelHeaderTitleAndNumber'
import Devices from '../../../abc-framework/utils/Devices'
import {user_manager_url} from '../../../abc-framework/routeres/ModuleURL'
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

const messages = defineMessages
({
        title:
        {
            id             : 'user.title',
            description    : '用户主页，包括用户的增删改查，权限的增删改查，用户图像的修改，后端存储采用mysql',
            defaultMessage : '用户管理'
        },
        subTitle:
        {
            id             : 'user.subTitle',
            description    : '首页子标题',
            defaultMessage : '用户维护信息'
        }
    }
)

@connect
(
    state    => {
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

@reduxForm({
    form: 'usersMangerForm',
    // validate: authenticationValidation,
    // warn:warnAuthentication,
})
@international()
@container({title:messages.title, subTitle:messages.subTitle})
export default class UserPage extends React.Component {
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
    constructor(props, context) {
        super(props, context);
        this.initStates();
    }

    handleClick(e) {
        console.log("e,",e.target.value);
        browserHistory.push("/app")
    }

    validatedStateUserName() {
        const length = this.state.userName.length;;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length >= 0) return 'error';
    }

    handleChangeUserName(e) {
        this.setState({userName: e.target.value});
        if(this.validatedStateUserName()==='success'){
            //由事件机制提交到操作
            this.setState({
                userNameHelp: ""
            });
        }else{
            this.setState({
                userNameHelp: "* 姓名不能为空,长度大于8,目前长度:".concat(this.state.userName.length)
            });
            return ;
        }

    }

    validatedStatePassword() {
        const length = this.state.password.length;;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length >= 0) return 'error';
    }

    handleChangePassword(e){
        this.setState({password: e.target.value});
        if(this.validatedStatePassword()==='success'){
            this.setState({
                passwordHelp: ""
            });
        }else{
            this.setState({
                passwordHelp: "* 密码不能为空,长度大于8,目前长度:".concat(this.state.passwordHelp.length)
            });
            return ;
        }
    }
    initStates(){
        this.state = {
            userName:"",
            password:"",
            userNameHelp: "",
            passwordHelp: "",
        }
    }
    render() {
        const dv=Devices();
        //                 手机      平板         笔记本     台式
        //Class 前缀	.col-xs-	.col-sm-	.col-md-	.col-lg-
        const userSearchHeader=(<UserSearchHeader numbers="17" title="用户查询"/>);
        const formInstance = (
            <AbcFormHorizontal>
                <AbcRowHz>
                    <Image className="image-abc"
                           src="/external/images/restau05i.jpg">
                    </Image>
                    <AbcCol  xs={12} xp={6} sm={6} lg={3} >
                        <FormGroup controlId="formHorizontalUserName">
                            <AbcRow>
                                <AbcCol componentClass={ControlLabel}  xp={3}>
                                    Name
                                </AbcCol>
                                <AbcCol xp={8}>
                                    <FormControl type="name" placeholder="Name" />
                                </AbcCol>
                            </AbcRow>
                        </FormGroup>
                    </AbcCol>
                    <AbcCol  xs={12} xp={6} sm={6} lg={3} >
                        <FormGroup controlId="formHorizontalEmail">
                            <AbcRow>
                                <AbcCol componentClass={ControlLabel}  xp={3}>
                                    Email
                                </AbcCol>
                                <AbcCol xp={8}>
                                    <FormControl type="email" placeholder="Email" />
                                </AbcCol>
                            </AbcRow>
                        </FormGroup>
                    </AbcCol>
                    <AbcCol  xs={12} xp={6} sm={6} lg={3}>
                        <FormGroup controlId="formHorizontalPassword">
                            <AbcRow>
                                <AbcCol componentClass={ControlLabel} xp={3}>
                                    Password
                                </AbcCol>
                                <AbcCol   xp={8}>
                                    <FormControl type="password" placeholder="Password" />
                                </AbcCol>
                            </AbcRow>
                        </FormGroup>
                    </AbcCol>
                    <AbcCol xs={12} xp={6} sm={6} lg={1}>
                        <FormGroup>
                            <AbcRow>
                                <AbcCol xpOffset={3} xp={9}>
                                    <Checkbox>记住我</Checkbox>
                                </AbcCol>
                            </AbcRow>
                        </FormGroup>
                    </AbcCol>
                     <AbcCol   xs={12} xp={6} sm={6} lg={3}>
                        <AbcRow>
                            <AbcCol xpOffset={3} xp={9}>
                                <ButtonToolbar>
                                    <AbcButton>确定</AbcButton>
                                    <AbcButton>取消</AbcButton>
                                    <AbcButton>重置</AbcButton>
                                    <HelpBlock></HelpBlock>
                                </ButtonToolbar>

                            </AbcCol>
                        </AbcRow>
                    </AbcCol>

                        <AbcCol xs={12} xp={6} sm={6} lg={3}>
                            <FormGroup>
                                <AbcRow>
                                    <AbcCol xpOffset={3} xp={9}>
                                        <ButtonToolbar className="abc-toolbar">
                                            <Button className="thumbnail-btn">
                                                <Glyphicon glyph="save"/></Button>
                                            <Button className="thumbnail-btn">
                                                <Glyphicon glyph="plus"/></Button>
                                            <Button className="thumbnail-btn">
                                                <Glyphicon glyph="pencil"/></Button>
                                            <Button className="thumbnail-btn">
                                                <Glyphicon glyph="trash"/></Button>

                                        </ButtonToolbar>
                                    </AbcCol>
                                </AbcRow>
                            </FormGroup>
                        </AbcCol>

                </AbcRowHz>
            </AbcFormHorizontal>
        );
        const formHorizontal = (
            <AbcFormHorizontal>
               <Image className="image-abc"
                       src="/external/images/restau05i.jpg">
               </Image>
                <AbcRowHz>

                    <AbcColReduxFormImage
                        colStyle={{width:"85%"}}
                        name="name"
                        controlId="email"
                        type='text'
                        label='姓名'
                        data="abc@qq.com"
                        placeholder='姓名'/>
                    <AbcColReduxFormImage
                        name="email"
                        controlId="email"
                        type='text'
                        label='Email'
                        data="abc@qq.com"
                        placeholder='邮箱'/>
                    <AbcColReduxFormImage
                        name="password"
                        controlId="password"
                        type='text'
                        label='密码'
                        data="111111"
                        placeholder='密码'/>
                    <AbcColReduxFormImage
                        name="acent"
                        controlId="acent"
                        type='text'
                        label='籍贯'
                        data="111111"
                        placeholder='北京'/>
                    <AbcColReduxFormImage
                        name="currentResident"
                        controlId="currentResident"
                        type='text'
                        label='住址'
                        data="111111"
                        placeholder='北京东方'/>
                    <AbcColReduxFormImage
                        name="education"
                        controlId="education"
                        type='text'
                        label='学历'
                        data="111111"
                        placeholder='理学学士'/>
                    <AbcColReduxFormCheckbox
                        name="rememberMe"
                        controlId="rememberMe"
                        type='text'
                        label='记住我'
                        data="1"
                        placeholder='密码'/>
                    <AbcColReduxFormButtons/>
                    <AbcColReduxFormButtonIcons/>

                </AbcRowHz>
            </AbcFormHorizontal>
        );
        const userMangerHeader=(<UserSearchHeader numbers="4" title="用户添加"/>);
        return (
            <div>
                <AbcPanel header={userMangerHeader}>
                    {
                        formHorizontal
                    }
                </AbcPanel>
                <AbcPanel header="新建用户">
                     <AbcFormInline onSubmit={this.handleClick.bind(this)}>

                         <Image className="image-abc"
                                src="/external/images/restau05i.jpg">
                         </Image>

                        <AbcRow>

                            <AbcColHiddenLabelImage
                                colStyle={{width:"70%"}}
                                controlId="userName"
                                type="text"
                                ref="userName"
                                label="用户"
                                placeholder="Must Enter userName"

                            />
                            <AbcColHiddenLabelImage
                                colStyle={{width:"70%"}}
                                controlId="password"
                                type="text"
                                ref="password"
                                label="密码"
                                placeholder="Must Enter password"
                            />
                            <AbcColHiddenLabelImage
                                colStyle={{width:"70%"}}
                                controlId="password"
                                type="text"
                                ref="password"
                                label="密码"
                                placeholder="Must Enter password"
                            />
                            <AbcColHiddenLabelImage
                                colStyle={{width:"70%"}}
                                controlId="password"
                                type="text"
                                ref="password"
                                label="密码"
                                placeholder="Must Enter password"
                            />
                            <AbcColHiddenLabelImage
                                colStyle={{width:"70%"}}
                                controlId="password"
                                type="text"
                                ref="password"
                                label="密码"
                                placeholder="Must Enter password"
                            />
                        </AbcRow>
                        <AbcRow>
                            <AbcCol   xs={12} sm={12} md={12} lg={12}>
                                <ButtonToolbar style={{float:"left"}}>
                                    <AbcButton type="submit">确定</AbcButton>
                                    <AbcButton type="submit">取消</AbcButton>
                                    <HelpBlock></HelpBlock>
                                </ButtonToolbar>
                            </AbcCol>
                        </AbcRow>

                    </AbcFormInline>
                </AbcPanel>
                <AbcPanel header={userMangerHeader}>
                    {
                        //formInstance
                    }
                </AbcPanel>
                <AbcPanel header={userSearchHeader}>

                <AbcFormInline onSubmit={this.handleClick.bind(this)}>
                 <AbcRow >
                     <AbcCol xs={6} sm={4} md={4} lg={4}>
                         <AbcRow >
                         <AbcFormGroup controlId="userName"
                                       validationState={this.validatedStateUserName()}>
                             <AbcCol  md={2} lg={2} xsHidden ={true} smHidden ={true} >
                                <ControlLabel style={{marginTop: "6px"}}>姓名</ControlLabel>
                             </AbcCol>
                             <AbcCol xs={12} sm={12} md={10} lg={10}>
                             <AbcFormControl type="text"
                                             value={this.state.userName}
                                             ref="userName"
                                             placeholder="Must Enter userName"
                                             onChange={this.handleChangeUserName.bind(this)}
                             />
                             <AbcFormControl.Feedback />
                             <HelpBlock>
                                 <span>{this.state.userNameHelp}</span>
                             </HelpBlock>
                              </AbcCol>
                         </AbcFormGroup>
                         </AbcRow>
                     </AbcCol>
                     <AbcCol xs={6} sm={4} md={4} lg={4}>
                         <AbcRow >
                             <AbcFormGroup validationState={this.validatedStatePassword()}>
                                 <AbcCol              md={2} lg={2} xsHidden ={true} smHidden ={true}>
                                    <ControlLabel style={{marginTop: "6px"}}>密码</ControlLabel>
                                  </AbcCol>
                                 <AbcCol xs={12} sm={12} md={10} lg={10}>
                                 <AbcFormControl type="text"
                                                 value={this.state.password}
                                                 ref="password"
                                                 onChange={this.handleChangePassword.bind(this)}
                                                 placeholder="Must Enter password"/>
                                 <FormControl.Feedback />
                                 <HelpBlock>
                                     <span>{this.state.passwordHelp}</span>
                                 </HelpBlock>
                                 </AbcCol>
                             </AbcFormGroup>
                        </AbcRow>
                     </AbcCol>
                     <AbcCol  sm={4} md={4} lg={4} xsHidden ={true}  >
                         <AbcFormGroup validationState={this.validatedStateUserName()}>
                             <AbcCol   sm={2}       md={2} lg={2} xsHidden ={true} smHidden ={true}>
                                <ControlLabel style={{marginTop: "6px"}}>性别</ControlLabel>
                             </AbcCol>
                             <AbcCol xs={12} sm={10} md={10} lg={10}>
                                 <AbcFormControl type="text" placeholder="sex"/>
                                 <FormControl.Feedback />
                                 <HelpBlock></HelpBlock>
                             </AbcCol>
                         </AbcFormGroup>
                     </AbcCol>

                 </AbcRow>
                 <AbcRow>
                    <AbcCol xs={5} sm={6} md={7} lg={4}>
                        <AbcFormGroup controlId="userName"
                                      validationState={this.validatedStateUserName()}>
                          <AbcFormControl type="text"
                                           value={this.state.userName}
                                            ref="userName"
                                            placeholder="Must Enter userName"
                                            onChange={this.handleChangeUserName.bind(this)}
                                          />
                            <AbcFormControl.Feedback />
                            <HelpBlock>
                                <span>{this.state.userNameHelp}</span>
                            </HelpBlock>
    
                        </AbcFormGroup>
                     </AbcCol>
                    <AbcCol xs={5} sm={4} md={3} lg={4}>
                        <AbcFormGroup validationState={this.validatedStatePassword()}>
                          <AbcFormControl type="text"
                                          value={this.state.password}
                                          ref="password"
                                          onChange={this.handleChangePassword.bind(this)}
                                          placeholder="Must Enter password"/>
                          <FormControl.Feedback />
                          <HelpBlock>
                              <span>{this.state.passwordHelp}</span>
                          </HelpBlock>
    
                         </AbcFormGroup>
                    </AbcCol>
                    <AbcCol  sm={2} md={3} lg={3} xsHidden ={true} smHidden ={true} mdHidden ={true} >
                        <AbcFormGroup validationState={this.validatedStateUserName()}>
                            <AbcFormControl type="text" placeholder="sex"/>
                            <FormControl.Feedback />
                            <HelpBlock></HelpBlock>
                        </AbcFormGroup>
                    </AbcCol>
                    <AbcCol xs={2} sm={2} md={2} lg={1}>
                         <AbcFormGroup>
                               <AbcButton type="submit">确定</AbcButton>
                               <FormControl.Feedback />
                               <HelpBlock></HelpBlock>
                         </AbcFormGroup>
                    </AbcCol>
                </AbcRow>
                <AbcRow>
                        <AbcCol xs={5} sm={6} md={7} lg={4}>
                                <AbcFormGroup controlId="userName"
                                          validationState={this.validatedStateUserName()}>
                                <AbcFormControl type="text"
                                                value={this.state.userName}
                                                ref="userName"
                                                placeholder="Must Enter userName"
                                                onChange={this.handleChangeUserName.bind(this)}
                                />
                                <AbcFormControl.Feedback />
                                <HelpBlock>
                                    <span>{this.state.userNameHelp}</span>
                                </HelpBlock>

                            </AbcFormGroup>
                        </AbcCol>
                        <AbcCol xs={5} sm={4} md={3} lg={4}>
                            <AbcFormGroup validationState={this.validatedStatePassword()}>
                                <AbcFormControl type="text"
                                                value={this.state.password}
                                                ref="password"
                                                onChange={this.handleChangePassword.bind(this)}
                                                placeholder="Must Enter password"/>
                                <FormControl.Feedback />
                                <HelpBlock>
                                    <span>{this.state.passwordHelp}</span>
                                </HelpBlock>

                            </AbcFormGroup>
                        </AbcCol>
                        <AbcCol  sm={2} md={3} lg={3} xsHidden ={true} smHidden ={true} mdHidden ={true} >
                            <AbcFormGroup validationState={this.validatedStateUserName()}>
                                <AbcFormControl type="text" placeholder="sex"/>
                                <FormControl.Feedback />
                                <HelpBlock></HelpBlock>
                            </AbcFormGroup>
                        </AbcCol>
                        <AbcCol xs={2} sm={2} md={2} lg={1}>
                            <AbcFormGroup>
                                <AbcButton type="submit">确定</AbcButton>
                                <FormControl.Feedback />
                                <HelpBlock></HelpBlock>
                            </AbcFormGroup>
                        </AbcCol>
                    </AbcRow>
             </AbcFormInline>
            </AbcPanel>
            <AbcPanel header="测试页">
                <Checkbox onClick={this.handleClick.bind(this)}></Checkbox>
                <input type="checkbox"/>
                <input type="checkbox"/>
                <input type="checkbox"/>
                <AbcLabel>test-AbcLabel</AbcLabel>

                <span>
                  <AbcDefaultButton type="button">
                      确定<AbcBadge>4</AbcBadge>
                   </AbcDefaultButton>
                 </span>
            <AbcButtonToolbar>
                Messages<AbcBadge>17</AbcBadge>
            </AbcButtonToolbar>
            </AbcPanel>
            <AbcPanel header="新建用户">
                <AbcFormInline onSubmit={this.handleClick.bind(this)}>
                    <AbcRow>
                        <AbcColA controlId="userName"
                                 validationState={this.validatedStateUserName()}
                                 type="text"
                                 ref="userName"
                                 label="用户"
                                 placeholder="Must Enter userName"
                                 help={this.state.userNameHelp}
                                 handleChange={this.handleChangeUserName.bind(this)}
                         />
                        <AbcColB controlId="password"
                                 validationState={this.validatedStatePassword()}
                                 type="text"
                                 ref="password"
                                 label="密码"
                                 placeholder="Must Enter password"
                                 help={this.state.passwordHelp}
                                 handleChange={this.handleChangePassword.bind(this)}
                        />
                        <AbcColC controlId="sex"
                                 validationState={this.validatedStatePassword()}
                                 type="text"
                                 ref="sex"
                                 label="性别"
                                 placeholder="Sex"
                        />
                    </AbcRow>
                    <AbcRow>
                        <AbcCol   xs={12} sm={12} md={12} lg={12}>
                            <ButtonToolbar style={{float:"right"}}>
                                <AbcButton type="submit">确定</AbcButton>
                                <AbcButton type="submit">取消</AbcButton>
                                <HelpBlock></HelpBlock>
                            </ButtonToolbar>
                        </AbcCol>
                    </AbcRow>

                    </AbcFormInline>
            </AbcPanel>
        </div>
        );
    }
   
}
