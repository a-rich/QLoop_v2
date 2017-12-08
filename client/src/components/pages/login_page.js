import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, FormGroup } from 'react-bootstrap';

import LoginForm from '../forms/login_form';
import { login } from '../../actions/auth';
import ForgotPasswordOverlay from '../overlays/forgot_password_overlay';

class LoginPage extends Component {
    submit(data) {
        this.props.login(data, () => {
            this.props.history.push('/myQLoop')
        });
    }

    render() {
        return(
            <div>
                <LoginForm submit={this.submit.bind(this)} />
                <FormGroup>
                    <Col sm={2}>
                        <ForgotPasswordOverlay />
                    </Col>
                </FormGroup>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ login }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginPage);
