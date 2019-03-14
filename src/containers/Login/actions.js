import LoginConstants from './constants'

const LoginActions = {
    checkCyanoWallet: () => ({ type: LoginConstants.CHECK_CYANO_WALLET }),
    setUserId: userId => ({ type: LoginConstants.SET_USER_ID, userId }),
}

export default LoginActions
