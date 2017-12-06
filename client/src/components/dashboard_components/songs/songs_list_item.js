import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

import '../../../css/dashboard_components/booth_main_queue_component_css.css';

class SongsListItem extends Component{


    removeSong() {
        const response = {
            song: this.props.song.name
        };
        this.props.removeFavoriteSong(response);
    }

    render() {
        return(
            <div className="w3-card w3-hover-shadow">
                <span>{this.props.song.name}</span>
                <Button onClick={this.removeSong.bind(this)}>remove</Button>
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

export default SongsListItem;