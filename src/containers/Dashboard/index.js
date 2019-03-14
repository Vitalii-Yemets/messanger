import React from 'react'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import { withRouter } from 'react-router'
import NotificationsBar from '../../components/NotificationsBar'
import ChatList from '../../components/ChatList'
import Chat from '../Chat'
import DashboardActions from './actions'
import './Dashboard.css'


const Dashboard = ({
    chats,
    selectedChatId,
    notifications,
    onCreateChat,
    onChatSelected,
    onRemoveNotification
}) => {

    const notificationsProps = {
        notifications,
        onRemoveNotification
    }

    const chatListProps = {
        chats,
        selectedChatId,
        onCreateChat,
        onChatSelected
    }

    return <div className="dashboard">
        <NotificationsBar {...notificationsProps} />
        <ChatList {...chatListProps} />
        <Chat />
    </div>
}

const withLifecycle = lifecycle({
    componentWillMount() {
        this.props.onWatchChats()
    },
    componentDidMount() {
        const {
            isCyanoWalletAvailable
        } = this.props

        if (!isCyanoWalletAvailable) {
            // TODO: Need replace this line with 'history.push('/')'
            window.location.replace('/')
        }
    }
})(Dashboard)

const mapStateToProps = state => ({
    subscribers: [],
    isCyanoWalletAvailable: state.loginState.isCyanoWalletAvailable,
    chats: state.dashboardState.chats,
    selectedChatId: state.dashboardState.selectedChatId,
    notifications: state.dashboardState.notifications
})

const mapDispatchToProps = dispatch => ({
    onCreateChat: () => dispatch(DashboardActions.createChat()),
    onWatchChats: () => dispatch(DashboardActions.watchChats()),
    onChatSelected: selectedChatId => dispatch(DashboardActions.chatSelected(selectedChatId)),
    onRemoveNotification: notificationIndex => dispatch(DashboardActions.removeNotification(notificationIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withLifecycle))