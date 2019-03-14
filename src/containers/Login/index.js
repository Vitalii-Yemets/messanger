import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import LoginActions from './actions'
import './Login.css'

const Login = ({
    isCyanoWalletAvailable,
    history
}) => {
    return <div className="login__wrapper">
        <div className="login__container">
            {
                isCyanoWalletAvailable
                    ? <div className="login__inner">
                        <div className="login__top">
                            <h1>ONTMessenger</h1>
                            <h3>Please click on the button to go to chat</h3>
                        </div>
                        <button className="btn m-login__button"
                            onClick={() => history.push('/dashboard')}>
                            Chatting
                        </button>
                    </div>
                    :
                    <div className="login__inner">
                        <div className="login__top">
                            <h1>Ontology Messager Client</h1>
                            <h3 className="logging-in-label">
                                Cyano Wallet browser extension is not available. Please check it out.
                            </h3>
                        </div>
                    </div>
            }

            <div className="login__footer">
                <span className="footer__version">3301</span>
            </div>
        </div>
    </div>
}

const withLifecycle = lifecycle({
    componentDidMount() {
        const { checkCyanoWallet } = this.props
        checkCyanoWallet()
    }
})(Login)

const mapStateToProps = state => ({
    isCyanoWalletAvailable: state.loginState.isCyanoWalletAvailable
})

const mapDispatchToProps = dispatch => ({
    checkCyanoWallet: () => dispatch(LoginActions.checkCyanoWallet())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withLifecycle))