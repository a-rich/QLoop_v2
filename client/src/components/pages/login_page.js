import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginForm from '../forms/login_form';
import { login } from '../../actions/auth';

class LoginPage extends Component {
    submit(data) {
        this.props.login(data, () => {
            this.props.history.push('/')
        });
    }

    render() {
        return(
            <div>
                <LoginForm submit={this.submit.bind(this)} />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ login }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginPage);
