import DashboardConstants from './constants'

const DashboardActions = {
    createChat: () => ({ type: DashboardConstants.CREATE_CHAT }),
    addNewChat: newChatId => ({ type: DashboardConstants.ADD_NEW_CHAT, newChatId }),
    watchChats: () => ({ type: DashboardConstants.WATCH_CHATS }),
    updateChats: chats => ({ type: DashboardConstants.UPDATE_CHATS, chats }),
    chatSelected: selectedChatId => ({ type: DashboardConstants.CHAT_SELECTED, selectedChatId }),
    updateChatsAdmin: chatsAdmin => ({ type: DashboardConstants.UPDATE_CHATS_ADMIN, chatsAdmin }),
    addNewNotification: newNotification => ({ type: DashboardConstants.ADD_NEW_NOTIFICATION, newNotification }),
    removeNotification: notificationIndex => ({ type: DashboardConstants.REMOVE_NOTIFICATION, notificationIndex }),
    updateNotifications: notifications => ({ type: DashboardConstants.UPDATE_NOTIFICATIONS, notifications })
}

export default DashboardActions
