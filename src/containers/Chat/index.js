import React from 'react'
import { connect } from 'react-redux'
import ChatHeader from '../../components/ChatHeader'
import MessageSender from '../../components/MessageSender'
import Message from '../../components/Message'
import MembersModal from '../../components/MembersModal'

import ChatActions from './actions'

import './Chat.css'

const Chat = ({
    selectedChatId,
    chatsAdmin,
    messages,
    chatMembers,
    isOpenedMembersModal,
    onSendMessage,
    onOpenMembersModal,
    onCloseMembersModal,
    onAddMember,
    onRemoveMember
}) => {

    const membersModalProps = {
        isOpenedMembersModal,
        chatMembers,
        onCloseMembersModal,
        onAddMember,
        onRemoveMember
    }

    const chatHeaderProps = {
        selectedChatId,
        chatsAdmin,
        chatMembers,
        onOpenMembersModal
    }

    const messageSenderProps = {
        selectedChatId,
        onSendMessage
    }

    return <div className="content">
        <MembersModal {...membersModalProps} />
        <ChatHeader {...chatHeaderProps} />
        <div className="content__inner">
            {
                messages.length > 0
                    ? <div className="messages">
                        {
                            messages.map((message, key) => <Message key={key} {...message} />)
                        }
                    </div>
                    : <div className="welcome__message">
                        <p>Please select you opponent to start chatting.</p>
                    </div>
            }
            {
                selectedChatId && <MessageSender {...messageSenderProps} />
            }
        </div>
    </div>
}

const mapStateToProps = state => ({
    subscribers: [],
    selectedChatId: state.dashboardState.selectedChatId,
    chatsAdmin: state.dashboardState.chatsAdmin,
    chatMembers: state.chatState.chatMembers,
    messages: state.chatState.messages,
    isOpenedMembersModal: state.chatState.isOpenedMembersModal,
})

const mapDispatchToProps = dispatch => ({
    onSendMessage: message => dispatch(ChatActions.sendMessage(message)),
    onOpenMembersModal: () => dispatch(ChatActions.openMembersModal()),
    onCloseMembersModal: () => dispatch(ChatActions.closeMembersModal()),
    onAddMember: memberId => dispatch(ChatActions.addMember(memberId)),
    onRemoveMember: memberId => dispatch(ChatActions.removeMember(memberId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)