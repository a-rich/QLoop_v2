import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardPage extends Component {
    render() {
        return(
            <div>profile</div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.credentials.token
    }
}

export default connect(mapStateToProps)(DashboardPage);
