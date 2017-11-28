import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

import { validateEmail } from '../utils/misc';
import { createUser } from '../actions';

class SignupForm extends Component {
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

    onSubmit(values) {
        this.props.createUser(values);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Username"
                        name="username"
                        type="text"
                        component={this.renderField}
                    />
                    <Field
                        label="E-Mail"
                        name="email"
                        type="email"
                        component={this.renderField}
                    />
                    <Field
                        label="Password"
                        name="password"
                        type="password"
                        component={this.renderField}
                    />
                    <Field
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        component={this.renderField}
                    />
                    <Button type="submit" className="btn btn-primary">
                        Submit
                    </Button>
                    <Link to="/" className="btn btn-danger">
                        Cancel
                    </Link>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors={};

    if(!values.username) {
        errors.user = "Please Enter a Username";
    }
    if (!values.email) {
        errors.email = "Please Enter Your Email";
    } else if (!validateEmail(values.email)) {
        errors.email="Email is not valid";
    }

    if (!values.password) {
        errors.password = "Password Cannot Be Empty";
    } else if (values.password.length < 8) {
        errors.password = "Password Must Be 8 Characters Long";
    } else if (! /^[a-zA-Z0-9]+$/.test(values.password)) {
        errors.password = "Password Must Be Alphanumeric only";
    } else if (! /[A-Z]/.test(values.password)) {
        errors.password = "Password Must contain 1 UpperCase letter";
    }

    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password and Confirm Password Doesn't Match";
    }


    return errors;
}

export default reduxForm({
    validate,
    form: 'SignUpForm'  // must be unique
})(
    connect(null, {createUser})(SignupForm)
);
