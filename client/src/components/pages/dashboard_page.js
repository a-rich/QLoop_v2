import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Grid, Row, Col } from 'react-bootstrap';

import FriendsList from '../friends/friends_list';
import { ProfilePictureUploadComponent } from '../dashboard_components/profile_picture_upload_component'
import ProfilePic from '../../profile_pic.jpg';

import '../../css/dashboard_page.css';
import '../../css/dashboard_components/booth_main_queue_component_css.css';
import '../../css/dashboard_components/main.css';

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
                        <Col>
                            <div className="main-list-full-size">
                                <div className= {"main-list-non-scrollable"}>
                                    Friends:
                                </div>

                                <div className="main-list-scrollable">
                                    <FriendsList />
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <h1>{this.props.username}</h1>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    if(!state.credentials.jwt) {
        return{}
    }

    return {
        isAuthenticated: !!state.credentials.jwt,
        username: state.credentials.data.username
    }
}

export default connect(mapStateToProps)(DashboardPage);
