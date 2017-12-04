import React from 'react';

const FriendsListItem = ({friend}) => {
    return (
        <li className = "list-group-item">
                <div>
                    <div>{friend.username}</div>
                </div>
        </li>
    )
}

export default FriendsListItem;
