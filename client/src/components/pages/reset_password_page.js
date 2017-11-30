import React, { Component } from 'react';

import ResetPasswordForm from '../forms/reset_password_form';

class ResetPasswordPage extends Component {
    render() {
        return(
            <div>
                <ResetPasswordForm token={this.props.match.params.token}/>
            </div>
        );
    }
}

export default ResetPasswordPage;
