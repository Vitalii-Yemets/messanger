import { from as ObservableFrom } from 'rxjs'
import { map } from 'rxjs/operators'
import * as Ontology from 'ontology-dapi'
import { toBytes, toUtf8, fromUtf8 } from '../utils'
import Constants from './constants'
import MessageModel from '../../models/message'

/* PRIVATE METHODS */
const writeData = ({ params, scriptHash, method, gasLimit, gasPrice }) => {
    const options = {
        scriptHash,
        operation: method,
        args: params,
        gasLimit,
        gasPrice
    }

    return ObservableFrom(Ontology.client.api.smartContract.invoke(options))
}

const readData = ({ params, scriptHash, method }) => {
    const options = {
        scriptHash,
        operation: method,
        args: params
    }

    return ObservableFrom(Ontology.client.api.smartContract.invokeRead(options))
}

/* PUBLIC METHODS */
export const createChatAsync = userId => writeData({
    params: [{ type: 'ByteArray', value: toBytes(userId) }],
    scriptHash: Constants.SMART_CONTRACT,
    method: Constants.SMART_CONTRACT_METHODS.CREATE_CHAT,
    gasPrice: Constants.GAS_PRICE,
    gasLimit: Constants.GAS_LIMIT
})

export const getChatsByUserIdAsync = userId => readData({
    params: [{ type: 'ByteArray', value: toBytes(userId) }],
    scriptHash: Constants.SMART_CONTRACT,
    method: Constants.SMART_CONTRACT_METHODS.GET_CHATS_BY_USER_ID
}).pipe(
    map(chatsIds => chatsIds ? chatsIds : [])
)

export const getMessagesCountAsync = chatId => readData({
    params: [{ type: 'ByteArray', value: chatId }],
    scriptHash: Constants.SMART_CONTRACT,
    method: Constants.SMART_CONTRACT_METHODS.GET_MESSAGE_COUNT
})

export const getMessagesAsync = (userId, chatId, count) => readData({
    params: [
        { type: 'ByteArray', value: toBytes(userId) },
        { type: 'ByteArray', value: chatId },
        { type: 'Integer', value: Number(count) },
    ],
    scriptHash: Constants.SMART_CONTRACT,
    method: Constants.SMART_CONTRACT_METHODS.RECAIVE_MESSAGES
}).pipe(
    map(rawMessages => {
        const messages = Array.isArray(rawMessages)
            ? rawMessages
                .map(raw => {
                    // TODO: In the future, we will replace the symbol '7c' ('|') with another separator
                    const userIdTextArray = raw.split('7c')
                    const userId = userIdTextArray[0] ? Ontology.client.api.utils.hexToStr(userIdTextArray[0]) : 'UserId'
                    const text = fromUtf8(userIdTextArray[1])
                    const message = new MessageModel({ userId, text })
                    return message
                })
            : []

        return messages.reverse()
    })
)

export const sendMessageAsync = (userId, chatId, text) => writeData({
    params: [
        { type: 'ByteArray', value: toBytes(userId) },
        { type: 'ByteArray', value: chatId },
        { type: 'ByteArray', value: toUtf8(text) },
    ],
    scriptHash: Constants.SMART_CONTRACT,
    method: Constants.SMART_CONTRACT_METHODS.SEND_MESSAGE,
    gasPrice: Constants.GAS_PRICE,
    gasLimit: Constants.GAS_LIMIT
}).pipe(
    map(() => new MessageModel({ userId, text }))
)

export const getChatsAdminAsync = userId => readData({
    params: [{ type: 'ByteArray', value: toBytes(userId) }],
    scriptHash: Constants.SMART_CONTRACT,
    method: Constants.SMART_CONTRACT_METHODS.GET_CHAT_ADMIN
})

export const getChatMembersAsync = chatId => readData({
    params: [{ type: 'ByteArray', value: chatId }],
    scriptHash: Constants.SMART_CONTRACT,
    method: Constants.SMART_CONTRACT_METHODS.GET_CHAT_MEMBERS
}).pipe(
    map(rawChatMembers => {
        const chatMembers = !!rawChatMembers ? rawChatMembers.map(Ontology.client.api.utils.hexToStr) : []
        return chatMembers
    })
)

export const addMemberAsync = (userId, memberId, chatId) => writeData({
    params: [
        { type: 'ByteArray', value: toBytes(userId) },
        { type: 'ByteArray', value: toBytes(memberId) },
        { type: 'ByteArray', value: chatId },
    ],
    scriptHash: Constants.SMART_CONTRACT,
    method: Constants.SMART_CONTRACT_METHODS.ADD_MEMBER,
    gasPrice: Constants.GAS_PRICE,
    gasLimit: Constants.GAS_LIMIT
})

export const removeMemberAsync = (userId, memberId, chatId) => writeData({
    params: [
        { type: 'ByteArray', value: toBytes(userId) },
        { type: 'ByteArray', value: toBytes(memberId) },
        { type: 'ByteArray', value: chatId },
    ],
    scriptHash: Constants.SMART_CONTRACT,
    method: Constants.SMART_CONTRACT_METHODS.REMOVE_MEMBER,
    gasPrice: Constants.GAS_PRICE,
    gasLimit: Constants.GAS_LIMIT
})
