import React, { Component } from 'react';
import { Nav, NavItem, Modal, Button, FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

class PublicConformationPageOverlay extends Component {
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
        <div  >
            <div onClick={this.open.bind(this)} className= {"cardViewForContent-grid w3-card-4"}>
                <div className={"public-list-item-grid"}>
                    <div className="public-list-container">
                        <span className = {"main-queue-song-in-progress"}>{item.title}</span>
                        <br/><span className = {"public-booth-creator"}> Creator : {this.props.item.creator}</span>
                    </div>
                </div>
            </div>
            
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
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

export default PublicConformationPageOverlay;
