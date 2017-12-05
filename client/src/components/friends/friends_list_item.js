import React from 'react';

import '../../css/dashboard_components/booth_main_queue_component_css.css';

const FriendsListItem = ({friend}) => {
    return (
        <div className="main-list-title-container">
            <span className="main-list-friend-title">{friend.username}</span>
        </div>
    )
}

export default FriendsListItem;
