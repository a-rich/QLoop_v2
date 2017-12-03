import React from 'react';
import FriendsListItem from './friends_list_item'

const VideoList = (props) => {
    const videoitems  = props.friends.map(video => {
        return (
            <VideoListItem
                key = {friends.username}
                video = {video} />
        );
    });

    return (
        <ul className = "col-md-4 list-group">
            {videoitems}
        </ul>
    )
}

export default VideoList;
