import ActionConstants from './constants'

const loginReducer = (state = null, action) => {
    switch (action.type) {
        case ActionConstants.SET_USER_ID: {
            const userId = action.userId
            const isCyanoWalletAvailable = !!userId

            return {
                ...state,
                isCyanoWalletAvailable,
                userId
            }
        }

        default: {
            return state
        }
    }
}

export default loginReducer