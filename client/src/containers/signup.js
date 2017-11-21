import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { validateEmail } from '../utils/misc';

class SignUp extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className=`form-group ${touched && error ? 'is-invalid': ""}`;

        return(
            <div className={className}>
                <label>{field.label}: </label>
                <input
                    className="form-control"
                    type={field.type}
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        console.log(values);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="FirstName"
                        name="firstName"
                        type="text"
                        component={this.renderField}
                    />
                    <Field
                        label="LastName"
                        name="lastName"
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
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
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

    if(!values.firstName) {
        errors.firstName = "Please Enter Your First Name";
    }
    if(!values.lastName) {
        errors.lastName = "Please Enter Your Last Name";
    }
    if (!values.email) {
        errors.email = "Please Enter Your Email";
    }else if (!validateEmail(values.email)) {
        errors.email="Email is not valid";
    }


    return errors;
}

export default reduxForm({
    validate,
    form: 'SignUpForm'  // must be unique
})(SignUp);
