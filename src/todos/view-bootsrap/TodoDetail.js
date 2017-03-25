import React, { findDOMNode, Component, PropTypes } from 'react';
import {FormGroup, ControlLabel, HelpBlock,FormControl ,Button} from '../../abc-bootstrap'
import TodoEvent from '../view-bootsrap/TodoEvent'
import AbcContainer from '../../abc-framework/ui/AbcContainerWrape'
import info from '../../abc-framework/utils/logger'

export default class TodoDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            todovalue:""
        }
        this.verify;
    }
    shouldComponentUpdate() {
        return true;
    }
    componentWillUpdate(){
        if(this.props.enentEmitter&&this.props.enentEmitter){
            let that=this;
            this.props.enentEmitter.on('todos:adding-verfiy', (option,data) =>{
                that.setState({
                    todovalueHelp: data
                })
            })}
    }

    render() {
        info("render,props,",this.props);
        info("render,state,",this.state);

        var {formName,btnName,onAddClick ,enentEmitter,...other}=this.props;
        var valid=this.state.todovalueHelp;

        return (

                <FormGroup
                           controlId="formBasicText"
                    validationState={this.getValidationState()}
                >
                    <FormControl
                        type="text"
                        value={this.state.todovalue}
                        placeholder="Enter text"
                        onChange={this.handleChange.bind(this)}
                        onKeyDown={this.handleSubmit.bind(this)}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>
                        <span>{this.state.todovalueHelp||this.verify}</span>
                    </HelpBlock>

                </FormGroup>


        );
    }

    changeTodo(e){
        let upwd = e.target.value;
        this.setState({
            todovalue: upwd
        })

    }

    handleClick(e) {
        if(this.getValidationState()==='success'){
            if(this.state.todovalue === ""||this.state.todovalue === null){
                this.setState({
                    todovalueHelp: ""
                });
            }
            this.props.onAddClick(this.state.todovalue);
        }else{
            this.setState({
                todovalueHelp: "* Dodo不能为空,长度大于10,目前长度为:".concat(this.state.todovalue.length)
            });
            return ;
        }

    }
    
    handleSubmit(e) {
        const text = e.target.value.trim();
        if (e.which === 13) {
            this.handleClick(e)
        }
    }
    
    getValidationState() {
        const length = this.state.todovalue.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length >= 0) return 'error';
    }

    handleChange(e) {
        this.setState({todovalue: e.target.value});
        if(this.getValidationState()==='success'){
            //由事件机制提交到操作
            this.setState({
                todovalueHelp: ""
            });
            //提交数据
            // this.props.onAddClick(this.state.todovalue);
            if(this.props.enentEmitter){
                //event.emit("todo-adding",null,value);
                this.props.enentEmitter.emit('todos:adding',  {description:"数据保存成功，并且回调执行成功",
                    type:"Sucess"
                },e.target.value);
            }
        }else{
            this.setState({

                todovalueHelp: "* Dodo不能为空,目前长度为:".concat(this.state.todovalue.length)
            });
            return ;
        }

    }
}

TodoDetail.propTypes = {
    onAddClick: PropTypes.func,
    onEditClick:PropTypes.func,
    formName:PropTypes.string,
    btnName:PropTypes.string,
    enentEmitter:PropTypes.object.isRequired
    // onAddTodoVerfiyClick: PropTypes.func,
    // verfiedResult:PropTypes.object

}