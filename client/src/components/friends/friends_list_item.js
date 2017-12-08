import React, { Component } from 'react';

import '../../css/dashboard_components/booth_main_queue_component_css.css';

class FriendsListItem extends Component{

    isFriend() {
        for(var i=0; i<this.props.friends.length; i++) {
            if(this.props.friends[i][0] === this.props.friend[0]){
                return true;
            }
        }
        return false;
    }

    isBoothCreator() {
        if(this.props.friend[2]) {
            return true;
        }
        else {
            return false;
        }
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

    joinBooth() {
        const response = this.props.friend[2];
        this.props.joinBooth(response);
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
                        <i 
                            onClick={this.addFriend.bind(this)}
                            className="fa fa-plus fa-3 list-icon"
                        />
                    }
                    {this.isBoothCreator()?
                        <i 
                            onClick={this.joinBooth.bind(this)}
                            className="fa fa-users fa-3 list-icon"
                        />
                        :
                        <div></div>
                    }
                </h4>
                
            </div>
        )
    }
}

export default FriendsListItem;
