import { ofType } from 'redux-observable'
import { timer, of as ObservableOf } from 'rxjs'
import { map, withLatestFrom, switchMap, catchError } from 'rxjs/operators'
import {
    createChatAsync,
    getChatsByUserIdAsync,
    getChatsAdminAsync
} from '../../utils/api-smart-contract'
import { getAccountAsync } from '../../utils/api-wallet'
import { isJSON } from '../../utils/utils'
import ChatListItemModel from '../../models/chat-list-item'
import { NotificationModel, NotificationType } from '../../models/notification'
import DashboardConstants from './constants'
import DashboardActions from './actions'

export const createChatEpic = (action$, state$) => action$.pipe(
    ofType(DashboardConstants.CREATE_CHAT),
    withLatestFrom(state$),
    switchMap(() => getAccountAsync().pipe(
        switchMap(userId => createChatAsync(userId).pipe(
            map(({ result }) => {
                // TODO: Why? Need to change this in the future.
                const chatId = result[0]
                //
                const newChat = new ChatListItemModel({
                    chatId,
                    lastMessage: 'Last post support will be implemented soon.',
                    timeLastMessage: '00:00'
                })
                return DashboardActions.addNewChat(newChat)
            }),
            catchError(error => {
                const response = isJSON(error) ? JSON.parse(error) : { Result: error }
                const newNotification = new NotificationModel({
                    type: NotificationType.ERROR,
                    message: response.Result
                })
                return ObservableOf(DashboardActions.addNewNotification(newNotification))
            })
        ))
    ))
)

export const getChatsEpic = (actions$, state$) => actions$.pipe(
    ofType(DashboardConstants.WATCH_CHATS),
    withLatestFrom(state$),
    switchMap(() => timer(500, 2000).pipe(
        switchMap(() => getAccountAsync().pipe(
            switchMap(userId => getChatsByUserIdAsync(userId).pipe(
                map(DashboardActions.updateChats),
                catchError(error => {
                    const response = isJSON(error) ? JSON.parse(error) : { Result: error }
                    const newNotification = new NotificationModel({
                        type: NotificationType.ERROR,
                        message: response.Result
                    })
                    return ObservableOf(DashboardActions.addNewNotification(newNotification))
                })
            ))
        ))
    ))
)

export const getChatsAdminEpic = (actions$, state$) => actions$.pipe(
    ofType(DashboardConstants.WATCH_CHATS),
    withLatestFrom(state$),
    switchMap(() => timer(500, 2000).pipe(
        switchMap(() => getAccountAsync().pipe(
            switchMap(userId => getChatsAdminAsync(userId).pipe(
                map(chatsAdmin => DashboardActions.updateChatsAdmin(Array.isArray(chatsAdmin) ? chatsAdmin : [])),
                catchError(error => {
                    const response = isJSON(error) ? JSON.parse(error) : { Result: error }
                    const newNotification = new NotificationModel({
                        type: NotificationType.ERROR,
                        message: response.Result
                    })
                    return ObservableOf(DashboardActions.addNewNotification(newNotification))
                })
            ))
        ))
    ))
)

export const removeNotificationEpic = (actions$, state$) => actions$.pipe(
    ofType(DashboardConstants.REMOVE_NOTIFICATION),
    withLatestFrom(state$),
    map(([action, state]) => {
        const notifications = state.dashboardState.notifications
            .slice(0, action.notificationIndex)
            .concat(state.dashboardState.notifications.slice(action.notificationIndex + 1, state.dashboardState.notifications.length))
        return DashboardActions.updateNotifications(notifications)
    })
)

