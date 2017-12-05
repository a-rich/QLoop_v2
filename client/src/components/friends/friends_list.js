import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import FriendsListItem from './friends_list_item'
import FriendsSearchBar from './friends_search_bar';
import { mapper } from '../../utils/misc';
import { ROOT_URL } from '../../types';
import '../../css/dashboard_components/booth_main_queue_component_css.css';

class FriendsList extends Component {
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

    friends() {
        var resultJSX = this.props.friends.map(friend => {
            return(
                <div className={"main-queue-item w3-card"} key = {friend.username}>
                    <div className={"main-queue-item-grid"}>
                        <FriendsListItem friend = {friend} />
                    </div>
                </div>
            );
        });
        return resultJSX
    }

    users() {
        if(!this.state.users){
            return <div></div>
        }
        var resultJSX = this.state.users.map(user => {
            return(
                <div className={"main-queue-item w3-card"} key = {user.username}>
                    <div className={"main-queue-item-grid"}>
                        <FriendsListItem friend = {user} />
                    </div>
                </div>
            );
        });
        return resultJSX
    }

    render() {
        const friendSearch = _.debounce((term) => { this.friendSearch(term) }, 500);

        return(
            <div>
                <FriendsSearchBar onSearchtermChange={(term) => friendSearch(term)} />
                {this.friends()}
                <br />
                {this.users()}
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
        friends = mapper(state.credentials.data.friends);
    }

    return {
        friends: friends
    }
}

export default connect (mapStateToProps)(FriendsList);
