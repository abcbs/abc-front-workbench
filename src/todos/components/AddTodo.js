import React, { findDOMNode, Component, PropTypes } from 'react';

export default class AddTodo extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName: "",
            userPassword: "",
            isRemember: false,
            unameHelp: "",
            upwdHelp: "",
            todovalue:""
        }
    }

    render() {
        return (
            <div>
                <div className="login-box">
                    <div className="login-title">登   录</div>
                    <form action="" className="form-horizontal">
                        <div className="form-group input-text">
                            <label  htmlFor="uname">账号</label>
                            <input name="username" id="uname" onChange={this.changeUsername.bind(this)}
                                   value={this.state.userName}
                                   type="text" placeholder="手机号/用户名" className="form-control" ref="uname" />
                                <span className="help-block">{this.state.unameHelp}</span>
                        </div>

                        <div className="form-group input-text">
                            <label  htmlFor="upwd">密码</label>
                            <input name="password" id="upwd"
                                   onChange={this.changePassword.bind(this)}
                                   type="password" placeholder="密码" className="form-control"
                                   value={this.state.userPassword} ref="upwd" />
                                <span className="help-block">{this.state.upwdHelp}</span>
                        </div>

                        <div className="form-group">
                            <label className="check"  htmlFor="chk">
                                <input id="chk" onClick={this.handleCheckbox.bind(this)}
                                       type="checkbox"
                                       checked={this.state.isRemember}
                                    />
                                 <span>记住密码</span>
                            </label>
                        </div>
                        <div className="form-group">
                            <button onClick={this.handleClickLogin.bind(this,this.state.userName,this.state.userPassword)}
                                    type="button" className="btn btn-primary login-btn">登录</button>
                        </div>

                    </form>
                </div>
            <div>
                <div>
                <div >Todo</div>
                <input type='text' ref='todovalue' id='todovalue' placeholder="Todos不能为空值"
                       value={this.state.todovalue}
                       onChange={this.changeTodo.bind(this)}

                />
                    <span className="help-block" style={{color: "red"}}>{this.state.todovalueHelp}</span>
                </div>
                <button onClick={e => this.handleClick(e)}>
                    Add
                </button>
            </div>
            </div>
        );
    }
    //监听input中的数据，保存到state中
    changeUsername(e){
        let uname = e.target.value;
        this.setState({
            userName: uname
        });
        console.log(this.state.userName);
    }

    changePassword(e){
        let upwd = e.target.value;
        this.setState({
            userPassword: upwd
        })
    }

    //是否记住密码
    handleCheckbox(e){
        let isChecked = e.target.checked;
        if(isChecked){
            this.setState({
                isRemember: true
            })
        }else{
            this.setState({
                isRemember: false
            })
        }
    }

    //点击登录按钮，触发后台接口提供的验证，对数据的处理等方法
    handleClickLogin(e){
        if(this.state.userName === ""||this.state.userName === null){
            this.setState({
                unameHelp: "* 用户名不能为空"
            })

        }else if(this.state.userPassword === ""||this.state.userPassword === null){
            this.setState({
                unameHelp: "",
                upwdHelp: "* 密码不能为空"
            })

        }else{
            this.setState({ //清除help-block提示文字
                unameHelp: "",
                upwdHelp: ""
            });

            if(this.state.isRemember === true){ //是否记住密码，若记住，则保存至localstorage，反之，清除
                // let loginData = {this.state.userName,this.state.userPassword};
                let loginData = {};
                loginData.userName = this.state.userName;
                loginData.userPassword = this.state.userPassword;

            }
            this.props.login(this.state.userName,this.state.userPassword);
            console.log(this.state);
        }
    }

    // getInitialState() {
    //     return {todovalue:'Hello!'};
    // }

    changeTodo(e){
        let upwd = e.target.value;
        this.setState({
            todovalue: upwd
        })

    }
    handleClick(e) {
        if(this.state.todovalue === ""||this.state.todovalue === null){
            this.setState({
                todovalueHelp: "* Dodo不能为空"
            })
            return ;
        }
        const node = this.refs.todovalue.value.trim();
        this.props.onAddClick(node);
        this.refs.todovalue.value= '';
    }
}

AddTodo.propTypes = {
    onAddClick: PropTypes.func.isRequired,

}