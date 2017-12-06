import React, { Component } from 'react';
import { Nav, NavItem, Modal, Button, FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

class inviteDjOverlay extends Component {
    state = {
        success: false,
        showModal: false
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    submit(values) {
        //add onsubmit stuff here
        this.close();
    }

    render() {
        const { item } = this.props;

        return(
            <div>
                
                <Modal show={this.state.showModal} cd DesonHide={this.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Join {this.props.item.creator} 's booth </Modal.Title>
                </Modal.Header>
        
                <Modal.Footer>
                
                    <Button className = {"buttons-yes w3-card-4"} 
                        type="submit"
                        bsStyle="primary"
                        form="Yes"
                    >
                        Yes
                    </Button>
                    <Button className = {"button-cancel w3-card-4"}onClick={this.close.bind(this)}>Cancel</Button>
                
                </Modal.Footer>
            </Modal>
        </div>
        );
    }
    
}

export default inviteDjOverlay;
