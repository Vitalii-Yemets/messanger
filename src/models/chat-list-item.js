import { makeRandomColor } from '../utils/utils'

class ChatListItemModel {
    constructor({
        chatId,
        lastMessage,
        timeLastMessage,
        colorPallet
    }) {
        this.chatId = chatId
        this.lastMessage = lastMessage
        this.timeLastMessage = timeLastMessage
        this.colorPallet = colorPallet ? colorPallet : {
            iconBackgroundColor: makeRandomColor(),
            iconColor: 'white'
        }
    }

    // static merge(existingChatListItem, incomingChatIds) {
    //     const hash = {}

    //     existingChatListItem.forEach(item => hash[item.chatId] = item)

    //     incomingChatIds.forEach(chatId => {
    //         if (!hash.hasOwnProperty(chatId)) {
    //             hash[chatId] = new ChatListItemModel({
    //                 chatId,
    //                 lastMessage: 'Last post support will be implemented soon.',
    //                 timeLastMessage: '00:00'
    //             })
    //         }
    //     })

    //     const uniqChatListItemModels = Object.keys(hash).map(key => hash[key])

    //     return uniqChatListItemModels
    // }

    static merge(existingChatListItem, incomingChatIds) {
        const hash = {}
        existingChatListItem.forEach(item => hash[item.chatId] = item)
        const result = incomingChatIds.map(chatId => {
            if (!hash.hasOwnProperty(chatId)) {
                return new ChatListItemModel({
                    chatId,
                    lastMessage: 'Last post support will be implemented soon.',
                    timeLastMessage: '00:00'
                })
            } else {
                return hash[chatId]
            }
        })
        return result
    }
}

export default ChatListItemModel