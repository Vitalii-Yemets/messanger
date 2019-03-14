export class NotificationModel {
    constructor({ type, message }) {
        this.type = type
        this.message = message
    }

    getStyles() {
        switch (this.type) {
            case 'success':
                return {
                    iconName: 'check_circle',
                    iconStyleName: 'notification_icon__success',
                    notificationStyleName: 'notification__success'
                }

            case 'error':
                return {
                    iconName: 'error',
                    iconStyleName: 'notification_icon__error',
                    notificationStyleName: 'notification__error'
                }

            default:
                return {
                    iconName: 'info',
                    iconStyleName: 'notification_icon__info',
                    notificationStyleName: 'notification__info'
                }
        }
    }

}

export const NotificationType = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info'
}