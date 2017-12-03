import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Grid, Row, Col } from 'react-bootstrap';
import { ProfilePictureUploadComponent } from '../dashboard_components/profile_picture_upload_component'
import ProfilePic from '../../profile_pic.jpg';
import '../../css/dashboard_page.css';

class DashboardPage extends Component {
    render() {
        return(
            <div>
                <Grid>
                    <Row>
                        <Col xs={6} md={3}>
                            <Image src={ProfilePic} responsive />
                            <ProfilePictureUploadComponent/>
                        </Col>
                        <Col id="username" xs={6} md={4}>
                            <h1>{this.props.username}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col id="container" xs={6} md={5}>
                            <h1>{this.props.username}</h1>
                        </Col>
                        <Col id="container" xs={6} md={5}>
                            <h1>{this.props.username}</h1>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

    



}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.credentials.token,
        username: state.credentials.data.username
    }
}

export default connect(mapStateToProps)(DashboardPage);
