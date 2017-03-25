import React,{ Component, PropTypes, Children } from 'react'
import {Popover,Modal,Button} from '../../abc-bootstrap'
import ReactDOM from 'react-dom'
let nShow=0;
export default class AbcErrorPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal:true
        }
    }
    componentWillUnmount() {
        this.state = {
            showModal:true
        }
    }

    close(e) {

        this.setState({ showModal:false });
        const mountNode= document.getElementById('root');
        ReactDOM.unmountComponentAtNode(mountNode);
    }
    open() {
        this.setState({ showModal: true });
    }
    render() {
        const { errorMessage,show} = this.props;
        // return (
        //          <Popover
        //             id="popover-basic"
        //             placement="right"
        //             positionLeft={200}
        //             positionTop={50}
        //             title="错误信息"
        //         >
        //             {errorMessage}
        //         </Popover>
        // )
        return (
            <Modal bsSize="small" show={this.state.showModal}
                   onHide={this.close.bind(this)}
                   onExited={this.close.bind(this)}
                   aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-ms">错误提示</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage}
                </Modal.Body>
            </Modal>
        )
    }
}

AbcErrorPage.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    show:PropTypes.bool.isRequired,
}


