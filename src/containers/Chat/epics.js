import { ofType } from 'redux-observable'
import { timer, of as ObservableOf } from 'rxjs'
import { map, withLatestFrom, switchMap, catchError } from 'rxjs/operators'
import {
    getMessagesCountAsync,
    getMessagesAsync,
    sendMessageAsync,
    getChatMembersAsync,
    addMemberAsync,
    removeMemberAsync
} from '../../utils/api-smart-contract'
import { NotificationModel, NotificationType } from '../../models/notification'
import { getAccountAsync } from '../../utils/api-wallet'
import { isJSON } from '../../utils/utils'
import ChatConstants from './constants'
import ChatActions from './actions'
import DashboardConstants from '../Dashboard/constants'
import DashboardActions from '../Dashboard/actions'

export const getChatMembersEpic = (actions$, state$) => actions$.pipe(
    ofType(DashboardConstants.CHAT_SELECTED),
    withLatestFrom(state$),
    switchMap(([action, state]) => timer(100, 3000).pipe(
        switchMap(() => getChatMembersAsync(state.dashboardState.selectedChatId).pipe(
            map(ChatActions.updateChatMembers),
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

export const getMessagesEpic = (actions$, state$) => actions$.pipe(
    ofType(DashboardConstants.CHAT_SELECTED, ChatConstants.MESSAGE_SENDED),
    withLatestFrom(state$),
    switchMap(([action, state]) => timer(100, 2000).pipe(
        switchMap(() => getMessagesCountAsync(state.dashboardState.selectedChatId).pipe(
            switchMap(messageCount => getAccountAsync().pipe(
                switchMap(userId => getMessagesAsync(userId, state.dashboardState.selectedChatId, messageCount))
            )),
            map(ChatActions.updateMessages),
            catchError(error => {
                const response = isJSON(error) ? JSON.parse(error) : { Result: error }
                const newNotification = new NotificationModel({
                    type: NotificationType.ERROR,
                    message: response.Result
                })
                return ObservableOf(DashboardActions.addNewNotification(newNotification))
            })))
    ))
)

export const sendMessagesEpic = (actions$, state$) => actions$.pipe(
    ofType(ChatConstants.SEND_MESSAGE),
    withLatestFrom(state$),
    switchMap(([action, state]) => getAccountAsync().pipe(
        switchMap(userId => sendMessageAsync(userId, state.dashboardState.selectedChatId, action.message).pipe(
            map(ChatActions.messageSended),
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

export const addMemberEpic = (actions$, state$) => actions$.pipe(
    ofType(ChatConstants.ADD_MEMBER),
    withLatestFrom(state$),
    switchMap(([action, state]) => getAccountAsync().pipe(
        switchMap(userId => addMemberAsync(userId, action.memberId, state.dashboardState.selectedChatId).pipe(
            switchMap(() => getChatMembersAsync(state.dashboardState.selectedChatId).pipe(
                map(ChatActions.updateChatMembers),
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

export const removeMemberEpic = (actions$, state$) => actions$.pipe(
    ofType(ChatConstants.REMOVE_MEMBER),
    withLatestFrom(state$),
    switchMap(([action, state]) => getAccountAsync().pipe(
        switchMap(userId => removeMemberAsync(userId, action.memberId, state.dashboardState.selectedChatId).pipe(
            switchMap(() => getChatMembersAsync(state.dashboardState.selectedChatId).pipe(
                map(ChatActions.updateChatMembers),
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