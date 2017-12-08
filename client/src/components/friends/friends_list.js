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
            searched: false,
            selectedUser: null,
        };

        this.friendSearch('');
    }

    friendSearch(term){
        if (term === "") {
            this.setState({ searched: false });
            return{};
        }
        const request = {
            query: term
        }
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('QLoopJWT');
        axios.post(`${ROOT_URL}/api/find_users/`, request)
            .then((res) => {
                this.setState({
                    users: res.data.data,
                    searched: true
                });
            });
    }

    friends() {
        console.log(this.props.friends);
        var resultJSX = this.props.friends.map(friend => {
            return(
                <div key = {friend[0]}>
                    <div>
                        <FriendsListItem
                            removeFriend={this.props.removeFriend}
                            friend={friend}
                            friends={this.props.friends}
                        />
                    </div>
                </div>
            );
        });
        return resultJSX
    }

    users() {
        var resultJSX = this.state.users.map(user => {
            return(
                <div key = {user[0]}>
                    <div>
                        <FriendsListItem
                            removeFriend={this.props.removeFriend}
                            addFriend={this.props.addFriend}
                            friend={user}
                            friends={this.props.friends}
                        />
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
                <h3>Friends:</h3>
                <FriendsSearchBar className="padding" onSearchtermChange={(term) => friendSearch(term)} />
                <div className={"main-list-scrollable"}>
                    {this.state.searched? this.users() : this.friends()}
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    var friends ={};

    if(!state.credentials.jwt) {
        return{}
    }
    if (!state.friends) {
        friends = [];
    } else {
        friends = state.friends;
    }

    return {
        friends: friends
    }
}

export default connect (mapStateToProps)(FriendsList);
