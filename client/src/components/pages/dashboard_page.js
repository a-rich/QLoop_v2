import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Grid, Row, Col , Well} from 'react-bootstrap';


import FriendsList from '../friends/friends_list';
import SongsList from '../dashboard_components/songs/songs_list';
import { addFriend, removeFriend, getFriends } from '../../actions/friends'; 
import { joinBooth } from '../../actions/createBooth';
import { removeFavoriteSong } from '../../actions/index';
import { ProfilePictureUploadComponent } from '../dashboard_components/profile_picture_upload_component'
import ProfilePic from '../../profile_pic.jpg';

import '../../css/dashboard_page.css';
import '../../css/dashboard_components/booth_main_queue_component_css.css';
import '../../css/dashboard_components/main.css';

class DashboardPage extends Component {

    addFriend(data) {
        this.props.addFriend(data);
    }

    removeFriend(data) {
        this.props.removeFriend(data);
    }

    getFriends() {
        this.props.getFriends();
    }

    removeFavoriteSong(data) {
        this.props.removeFavoriteSong(data);
    }

    joinBooth(data){
        this.props.joinBooth(data);
    }

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
                    <br />
                    <Row>
                        <Col xs={6} md={6}>
                            <Well bsSize="large">
                                <FriendsList
                                    joinBooth={this.joinBooth.bind(this)}
                                    removeFriend={this.removeFriend.bind(this)}
                                    addFriend={this.addFriend.bind(this)}
                                    getFriends={this.getFriends.bind(this)}
                                />
                            </Well>
                        </Col>
                        <Col xs={6} md={6}>
                            <Well bsSize="large">
                                <SongsList removeFavoriteSong={this.removeFavoriteSong.bind(this)}/>
                            </Well>
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

export default connect(mapStateToProps, { addFriend, removeFriend, removeFavoriteSong, getFriends, joinBooth })(DashboardPage);
