import React from 'react'
import {
  HashRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import Login from '../Login'
import Dashboard from '../Dashboard'

import './Root.css'

const Root = () => {
  return <div className="root">
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Redirect from='*' to='/' />
      </Switch>
    </HashRouter>
  </div>
}

export default Root
