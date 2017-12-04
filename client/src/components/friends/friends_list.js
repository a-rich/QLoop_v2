import React from 'react';
import FriendsListItem from './friends_list_item'

const FriendsList = (props) => {
    const friends  = props.friends.map(friend => {
        return (
            <FriendsListItem
                key = {friend.username}
                friend = {friend} />
        );
    });

    return (
        <ul className = "col-md-4 list-group">
            {friends}
        </ul>
    )
}

export default FriendsList;
