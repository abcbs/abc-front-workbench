import React,{ Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {Modal,Button} from '../../abc-bootstrap'
import AbcErrorPage from './AbcErrorPage'
import ModalExample from './ModalExample'
// const  errorInfo =(errorMessage)=>{
//         const mountNode= document.getElementById('root');
//         let isShow=true;
//         let onHide = () =>(
//               isShow= false
//         );
//         ReactDOM.render((
//                 <Modal bsSize="small" show={isShow}
//                                        aria-labelledby="contained-modal-title-lg">
//                     <Modal.Header closeButton>
//                         <Modal.Title id="contained-modal-title-lg">Error</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {errorMessage}
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button onClick={onHide.bind(this)}>Close</Button>
//                     </Modal.Footer>
//                 </Modal>
//         ), mountNode);
// }


// export  default errorInfo;

// class AbcErrorPage extends Component {
//     // constructor(props, context) {
//     //     super(props, context);
//     //     this.state = {
//     //         isShow:true
//     //     }
//     //
//     // }
//     // render(){
//     //     // let onHide = () => this.setState({ isShow: false });
//     //     return
//     //         (
//     //             <div>"test"</div>
//     //         )
//     // }
//
//     // render(){
//     //     let onHide = () => this.setState({ isShow: false });
//     //     return
//     //     (<Modal bsSize="small" show={this.state.isShow}
//     //             aria-labelledby="contained-modal-title-lg">
//     //             <Modal.Header closeButton>
//     //                 <Modal.Title id="contained-modal-title-lg">Error</Modal.Title>
//     //             </Modal.Header>
//     //             <Modal.Body>
//     //                 {this.props.errorMessage}
//     //             </Modal.Body>
//     //             <Modal.Footer>
//     //                 <Button onClick={onHide.bind(this)}>Close</Button>
//     //             </Modal.Footer>
//     //         </Modal>
//     //     )
//     // }
// }

// AbcErrorPage.propTypes = {
//     errorMessage: PropTypes.string,
//
// }
//
const  errorInfo =(message)=>{
    try{
    const root= React.createElement(AbcErrorPage, {errorMessage:message ,show:true} );
    const mountNode= document.getElementById('root');
    ReactDOM.render(root, mountNode)
    // ReactDOM.unmountComponentAtNode(mountNode);
    }catch(error){
        console.log("err,",error)
    }
}
//
export  default errorInfo;