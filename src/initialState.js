import initialLoginState from './containers/Login/initialState'
import initialDashboardState from './containers/Dashboard/initialState'
import initialChatState from './containers/Chat/initialState'

const initialAppState = {
    loginState: initialLoginState,
    dashboardState: initialDashboardState,
    chatState: initialChatState
}

export default initialAppState