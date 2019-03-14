import { ofType } from 'redux-observable'
import { map, switchMap } from 'rxjs/operators'
import { getAccountAsync } from '../../utils/api-wallet'

import LoginConstants from './constants'
import LoginActions from './actions'

export const loginEpic = action$ => action$.pipe(
    ofType(LoginConstants.CHECK_CYANO_WALLET),
    switchMap(getAccountAsync),
    map(LoginActions.setUserId)
)