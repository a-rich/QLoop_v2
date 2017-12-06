import React, { Component } from 'react';
import { Nav, NavItem, Modal, Button, FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { validateEmail } from '../../utils/misc';
import { recoverUser } from '../../actions/index';

class ForgotPasswordOverlay extends Component {
    state = {
        success: false,
        showModal: false
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const validationState = touched && error ? 'error': null;

        return(
            <div>
                <FormGroup validationState={validationState}>
                    <ControlLabel>{field.label}: </ControlLabel>
                    <FormControl
                        type={field.type}
                        {...field.input}
                    />
                    <HelpBlock>
                        {touched ? error : ""}
                    </HelpBlock>
                </FormGroup>
            </div>
        );
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    submit(values) {
        this.props.recoverUser(values);
        this.close();
    }

    render() {
        const { handleSubmit } = this.props;

        return(
        <div  >
            <Nav className>
                <NavItem onClick={this.open.bind(this)}>
                    Forgot Password
                </NavItem>
            </Nav>
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Please enter your email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="recover-password" onSubmit={handleSubmit(this.submit.bind(this))}>
                        <Field
                            label="Email"
                            name="email"
                            type="email"
                            component={this.renderField}
                        />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        bsStyle="primary"
                        form="recover-password"
                    >
                        Recover Password
                    </Button>
                    <Button onClick={this.close.bind(this)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
        );
    }
}

function validate(values) {
    const errors={};

    if (!values.email){
        errors.email = "Please enter an email address";
    } else if (!validateEmail(values.email)) {
        errors.email = "Please enter a valid email address";
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'ForgotPasswordOverlay'  // must be unique
})(
    connect(null, {recoverUser})(ForgotPasswordOverlay)
);
