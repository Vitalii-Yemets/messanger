import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware, combineEpics } from 'redux-observable'

import logger from './logger'

import initialAppState from './initialState'

// Login
import loginReducer from './containers/Login/reducer'
import { loginEpic } from './containers/Login/epics'

// Dashboar
import dashboardReducer from './containers/Dashboard/reducer'
import {
    createChatEpic,
    getChatsEpic,
    getChatsAdminEpic,
    removeNotificationEpic
} from './containers/Dashboard/epics'

// Chat
import chatReducer from './containers/Chat/reducer'
import {
    getMessagesEpic,
    sendMessagesEpic,
    getChatMembersEpic,
    addMemberEpic,
    removeMemberEpic
} from './containers/Chat/epics'

const reducers = combineReducers({
    loginState: loginReducer,
    dashboardState: dashboardReducer,
    chatState: chatReducer
})

const epicMiddleware = createEpicMiddleware()

const middlewares = applyMiddleware(logger, epicMiddleware)

export const store = createStore(reducers, initialAppState, composeWithDevTools(middlewares))

const combinedEpics = combineEpics(
    loginEpic,
    createChatEpic,
    getChatsEpic,
    getChatsAdminEpic,
    getMessagesEpic,
    sendMessagesEpic,
    getChatMembersEpic,
    addMemberEpic,
    removeMemberEpic,
    removeNotificationEpic
)

epicMiddleware.run(combinedEpics)
