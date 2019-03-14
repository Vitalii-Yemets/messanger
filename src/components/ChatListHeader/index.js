import React from 'react'
import './ChatListHeader.css'

const ChatListHeader = (
) => {
    return <div className="sidebar__header">
        <div className="dashboard__status_wrap">
            <p className="dashboard__status">
                <span className="dashboard__status_user">ONTMessanger</span>
            </p>
        </div>
        <a href="/" className="logout">
            logout
        </a>
    </div>
}

export default ChatListHeader