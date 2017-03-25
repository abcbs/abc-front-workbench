import React from 'react';
import Button from '../../abc-bootstrap';
import Modal from '../../abc-bootstrap/react-overlays/Modal';

let rand = ()=> (Math.floor(Math.random() * 20) - 10);

const modalStyle = {
    position: 'fixed',
    zIndex: 1040,
    top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
    ...modalStyle,
    zIndex: 'auto',
    backgroundColor: '#000',
    opacity: 0.5
};

const dialogStyle = function() {
    // we use some psuedo random coords so nested modals
    // don't sit right on top of each other.
    let top = 50 + rand();
    let left = 50 + rand();

    return {
        position: 'absolute',
        width: 400,
        top: top + '%', left: left + '%',
        transform: `translate(-${top}%, -${left}%)`,
        border: '1px solid #e5e5e5',
        backgroundColor: 'white',
        boxShadow: '0 5px 15px rgba(0,0,0,.5)',
        padding: 20
    };
};


const ModalExample = React.createClass({

    getInitialState(){
        return { showModal: true };
    },
    close(e) {
        this.setState({ showModal: false });
    },
    render() {

        return (
                <Modal
                    aria-labelledby='modal-label'
                    style={modalStyle}
                    backdropStyle={backdropStyle}
                    show={this.state.showModal}
                    onHide={this.close}
                >
                    <div style={dialogStyle()} >
                        <h4 id='modal-label'>Text in a modal</h4>
                        <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </div>
                </Modal>

        );
    },

    close(){
        this.setState({ showModal: false });
    },

    open(){
        this.setState({ showModal: true });
    }
});

export default ModalExample;
