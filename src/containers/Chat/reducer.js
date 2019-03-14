import ChatConstants from './constants'

const chatReducer = (state = null, action) => {
    switch (action.type) {
        case ChatConstants.UPDATE_MESSAGES: {
            const messages = action.messages

            return {
                ...state,
                messages
            }
        }

        case ChatConstants.UPDATE_CHAT_MEMBERS: {
            const chatMembers = action.chatMembers

            return {
                ...state,
                chatMembers
            }
        }

        case ChatConstants.OPEN_MEMBERS_MODAL: {
            const isOpenedMembersModal = true

            return {
                ...state,
                isOpenedMembersModal
            }
        }

        case ChatConstants.CLOSE_MEMBERS_MODAL: {
            const isOpenedMembersModal = false

            return {
                ...state,
                isOpenedMembersModal
            }
        }

        default: {
            return state
        }
    }
}

export default chatReducer