import ChatListItemModel from '../../models/chat-list-item'
import DashboardConstants from './constants'

const dashboardReducer = (dashboardState = null, action) => {
    switch (action.type) {
        case DashboardConstants.ADD_NEW_CHAT: {
            const newChats = action.newChatId
            const chats = [...dashboardState.chats, newChats]
            return {
                ...dashboardState,
                chats
            }
        }

        case DashboardConstants.UPDATE_CHATS: {
            const chats = ChatListItemModel.merge(dashboardState.chats, action.chats)
            return {
                ...dashboardState,
                chats
            }
        }

        case DashboardConstants.CHAT_SELECTED: {
            const selectedChatId = action.selectedChatId
            return {
                ...dashboardState,
                selectedChatId
            }
        }

        case DashboardConstants.UPDATE_CHATS_ADMIN: {
            const chatsAdmin = action.chatsAdmin
            return {
                ...dashboardState,
                chatsAdmin
            }
        }

        case DashboardConstants.ADD_NEW_NOTIFICATION: {
            const newNotification = action.newNotification
            let isUnique = true
            dashboardState.notifications.forEach(notification => {
                if (notification.message === newNotification.message) {
                    isUnique = false
                }
            })
            const notifications = new Array(...dashboardState.notifications)
            if (isUnique) {
                notifications.push(newNotification)
            }
            return {
                ...dashboardState,
                notifications
            }
        }

        case DashboardConstants.UPDATE_NOTIFICATIONS: {
            const notifications = action.notifications
            return {
                ...dashboardState,
                notifications
            }
        }

        default: {
            return dashboardState
        }
    }
}

export default dashboardReducer