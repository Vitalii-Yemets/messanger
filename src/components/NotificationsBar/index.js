import React from 'react'

import Notification from '../Notification'

import './NotificationsBar.css'

const NotificationsBar = ({ notifications, onRemoveNotification }) => {
    return <div className='notification_bar'>
        {
            notifications && notifications.map((notification, index) => <Notification
                notification={notification}
                onClose={() => onRemoveNotification(index)}
                key={index} />)
        }
    </div>
}

export default NotificationsBar