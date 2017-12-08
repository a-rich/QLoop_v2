import React, { Component } from 'react';

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
            username: this.props.friend[0]
        };
        this.props.addFriend(response);
    }
    removeFriend() {
        const response = {
            username: this.props.friend[0]
        };
        this.props.removeFriend(response);
    }

    render() {
        return(
            <div className="w3-card w3-hover-shadow list-item">
                <h4>
                    {this.props.friend[0]}
                    {this.isFriend()?
                        <i 
                            onClick={this.removeFriend.bind(this)}
                            className="fa fa-eraser fa-3 list-icon list-icon-danger"
                        />
                        :
                        <i onClick={this.addFriend.bind(this)}
                            className="fa fa-plus fa-3 list-icon"
                        />
                    }
                </h4>
                
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
