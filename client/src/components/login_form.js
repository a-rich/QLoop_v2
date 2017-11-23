import React, { Component } from 'react';
import { Form, Col, FormControl, ControlLabel, FormGroup, Button, HelpBlock } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { validateEmail } from '../utils/misc';

class LoginForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: {
                email: '',
                password: ''
            },
            touched: {
                email: false,
                password: false,
            },
            loading: false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(event) {
        this.setState({
            data: {...this.state.data, [event.target.name]: event.target.value}
        });
    }

    onBlur(event) {
        this.setState({
            touched: { ...this.state.touched, [event.target.name]: true },
        });

        const errors = this.validate(this.state.data);
        this.setState({ errors: errors });
    }

    onSubmit(event) {
        event.preventDefault();

        if(Object.keys(this.state.errors).length === 0) {
            this.props.submit(this.state.data);
        }
    }

    validate(data) {
        const errors = {};

        if(!data.email){
            errors.email = "Email Cannot Be Empty";
        }else if(!validateEmail(data.email)) {
            errors.email = "Invalid Email";
        }
        if(!data.password) {
            errors.password = "Cannot Be Blank";
        }

        return errors;
    }

    render() {
        const { data, errors, touched } = this.state;

        return(
            <div>
                <Form horizontal onSubmit={this.onSubmit}>
                    <FormGroup validationState={touched.email && errors.email ? 'error': null}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Email
                        </Col>
                        <Col sm={4}>
                            <FormControl
                                type="email"
                                placeholder="example@example.com"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={this.onChange}
                                onBlur={this.onBlur}
                            />
                        </Col>
                        <HelpBlock>
                            {touched.email ? errors.email : ""}
                        </HelpBlock>
                    </FormGroup>

                    <FormGroup validationState={touched.password && errors.password ? 'error': null}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={4}>
                            <FormControl type="password"
                                placeholder="Password"
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={this.onChange}
                                onBlur={this.onBlur}
                            />
                        </Col>
                        <HelpBlock>
                            {touched.password ? errors.password : ""}
                        </HelpBlock>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={4}>
                            <Button type="submit">
                                Sign in
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default LoginForm;
