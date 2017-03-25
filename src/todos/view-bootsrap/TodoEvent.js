import React , { PropTypes } from 'react'

import { Button,ButtonToolbar} from '../../abc-bootstrap'
import info from '../../abc-framework/utils/logger'

export default class TodoEvent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.sendData=null;

    }
    render() {
       const { onAddClick,onAddTodoVerfiyClick, onAddBtnName,enentEmitter }=this.props;
        return (
                <ButtonToolbar style={{ position: 'relative',float:'left', left:'10px'}}>
                    <Button type="button" bsStyle="success"
                            onClick={this.handleClick.bind(this)}>
                        {onAddBtnName}
                    </Button>
                </ButtonToolbar>

        )
    }

    handleClick (e) {
         if (this.sendData) {
            this.props.onAddClick(this.sendData);
            // this.props.submmitTodo(this.sendData);
        } else {
            // this.props.onAddTodoVerfiyClick("* Dodo不能为空");
            if(this.props.enentEmitter){
                this.props.enentEmitter.emit('todos:adding-verfiy',  {description:"验证不通过",
                    type:"Verify-Error"
                },"* Dodo不能为空,长度大于10");
            }
        }
    }
    componentDidMount(){
        if(this.props.enentEmitter){
            const that=this;
            this.props.enentEmitter.on('todos:adding', function(option,data) {
                console.log(option.type,option.description,data);
                that.sendData=data;
            });
        }
    }
    shouldComponentUpdate() {
        return true;
    }
    // componentWillUpdate() {
    //     if (this.props.submitResult) {
    //         this.sendData = this.props.submitResult;
    //     }
    // }
}

TodoEvent.propTypes = {
    onAddClick: PropTypes.func,
    onAddBtnName:PropTypes.string.isRequired,
    enentEmitter:PropTypes.object.isRequired,
    // onAddTodoVerfiyClick: PropTypes.func,
    // submitResult:PropTypes.string,
    // submmitTodo:PropTypes.func
};

// export default TodoEvent