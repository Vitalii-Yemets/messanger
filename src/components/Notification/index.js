import React from 'react'
import { timer } from 'rxjs'
import { lifecycle } from 'recompose'
import classNames from 'classnames'
import './Notification.css'

const Notification = ({ notification, onClose }) => {
    const styles = notification.getStyles()
    return <div className={classNames('notification', styles.notificationStyleName)} >
        <div className={classNames('notification_icon', styles.iconStyleName)}>
            <i className='material-icons' autoSave='off' autoComplete='off'>{styles.iconName}</i>
        </div>
        <div className='notification_content'>
            <p className='notification_type'>{notification.type}</p>
            <p className='notification_message'>{notification.message}</p>
        </div>
        <div className='notification_close' onClick={onClose}>
            <i className='material-icons' autoSave='off' autoComplete='off'>close</i>
        </div>
    </div>
}

const withLifecycle = lifecycle({
    componentDidMount() {
        // if (this.props.notification.type !== 'error') {
            timer(10000).subscribe(this.props.onClose)
        // }
    }
})(Notification)

export default withLifecycle