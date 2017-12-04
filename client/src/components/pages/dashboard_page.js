import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import FriendsList from '../friends/friends_list';
import FriendsSearchBar from '../friends/friends_search_bar';
import { ProfilePictureUploadComponent } from '../dashboard_components/profile_picture_upload_component'
import ProfilePic from '../../profile_pic.jpg';
import { mapper } from '../../utils/misc';
import { ROOT_URL } from '../../types';
import '../../css/dashboard_page.css';

class DashboardPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            users: [],
            selectedUser: null,
        };

        this.friendSearch('');
    }

    friendSearch(term){
        if (term === "") {
            return{};
        }
        const request = {
            query: term
        }
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('QLoopJWT');
        axios.post(`${ROOT_URL}/api/find_users/`, request)
            .then((res) => {
                const values = mapper(res.data.data)
                this.setState({users: values});
            });
    }

    render() {
        const friendSearch = _.debounce((term) => { this.friendSearch(term) }, 500);

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
                            <FriendsSearchBar onSearchtermChange={(term) => friendSearch(term)} />
                            <FriendsList friends = {this.props.friends} users={this.state.users} />
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
    var friends ={};

    if(!state.credentials.jwt) {
        return{}
    }
    if (!state.credentials.data.friends) {
        friends = {};
    } else {
        /*friends = JSON.stringify(state.credentials.data.friends);
        friends = JSON.parse(friends);
        for(var i=0; i < friends.length; i++) {
            friends[i] = JSON.parse(friends[i]);
        }*/
        friends = mapper(state.credentials.data.friends);
    }

    return {
        isAuthenticated: !!state.credentials.jwt,
        username: state.credentials.data.username,
        friends: friends
    }
}

export default connect(mapStateToProps)(DashboardPage);
