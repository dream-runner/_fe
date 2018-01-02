import React from 'react'
import { Provider } from 'react-redux'
import { EnhancerProvider } from 'substyle'
import Radium, { StyleRoot } from 'radium'

import createBrowserHistory from 'history/createBrowserHistory'
import createHashHistory from 'history/createHashHistory'

import { ConnectedRouter } from 'react-router-redux'

import store from './store'
import Main from './containers'

export { login as loginAction } from './actions'
export store from './store'

const createHistory = window.history.pushState
  ? createBrowserHistory
  : createHashHistory

export const history = createHistory()

const SignavioWorkflowAccelerator = () => (
  <StyleRoot>
    <EnhancerProvider enhancer={Radium}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Main />
        </ConnectedRouter>
      </Provider>
    </EnhancerProvider>
  </StyleRoot>
)

export default SignavioWorkflowAccelerator


