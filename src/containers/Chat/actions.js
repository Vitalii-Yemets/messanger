import ChatConstants from './constants'

const ChatActions = {
    sendMessage: message => ({ type: ChatConstants.SEND_MESSAGE, message }),
    messageSended: () => ({ type: ChatConstants.MESSAGE_SENDED }),
    updateMessages: messages => ({ type: ChatConstants.UPDATE_MESSAGES, messages }),
    updateChatMembers: chatMembers => ({ type: ChatConstants.UPDATE_CHAT_MEMBERS, chatMembers }),
    openMembersModal: () => ({ type: ChatConstants.OPEN_MEMBERS_MODAL }),
    closeMembersModal: () => ({ type: ChatConstants.CLOSE_MEMBERS_MODAL }),
    addMember: memberId => ({ type: ChatConstants.ADD_MEMBER, memberId }),
    memberAdded: () => ({ type: ChatConstants.MEMBER_ADDED }),
    removeMember: memberId => ({ type: ChatConstants.REMOVE_MEMBER, memberId }),
}

export default ChatActions
