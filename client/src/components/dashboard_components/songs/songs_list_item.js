import React, { Component } from 'react';

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
            <div className="w3-card w3-hover-shadow list-item">
                <h4>
                    {this.props.song.name}
                    <i onClick={this.removeSong.bind(this)} 
                        className="fa fa-trash fa-3 list-icon list-icon-danger"
                    />
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

export default SongsListItem;