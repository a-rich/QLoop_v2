import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

import '../../css/dashboard_components/booth_main_queue_component_css.css';

class FriendsListItem extends Component{

    isFriend() {
        for(var i=0; i<this.props.friends.length; i++) {
            if(this.props.friends[i].username === this.props.friend.username){
                return true;
            }
        }
        return false;
    }

    addFriend() {
        const response = {
            email: this.props.friend.email
        };
        this.props.addFriend(response);
    }
    removeFriend() {
        const response = {
            email: this.props.friend.email
        };
        this.props.removeFriend(response);
    }

    render() {
        return(
            <div className="w3-card w3-hover-shadow">
                <span>{this.props.friend.username}</span>
                {this.isFriend()?
                    <Button onClick={this.removeFriend.bind(this)}>remove</Button>
                    :
                    <Button onClick={this.addFriend.bind(this)}>add</Button>
                }
            </div>
        )
    }
}

/*const FriendsListItem = ({friend}) => {
    console.log(this.props.friends);
    return (
        <div className="w3-card w3-hover-shadow">
            <span>{friend.username}</span>
        </div>
    )
}*/

export default FriendsListItem;
