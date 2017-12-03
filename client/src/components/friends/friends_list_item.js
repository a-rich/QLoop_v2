import React from 'react';

const FriendsListItem = ({friends, onFriendSelect}) => {
    return (
        <li className = "list-group-item">
                <div className = "friend-body">
                    <div className = "friend-username">{friends.username}</div>
                </div>
        </li>
    )
}

export default FriendsListItem;
