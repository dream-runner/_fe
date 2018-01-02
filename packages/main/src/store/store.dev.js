import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'

import { saga as apiSaga } from '@signavio/effektif-api'
import { saga as reportingSaga } from '@signavio/effektif-reporting'

import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const { history } = require('../index')

  const sagaMiddleware = createSagaMiddleware()

  const finalCreateStore = compose(
    applyMiddleware(sagaMiddleware, routerMiddleware(history)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)

  const store = finalCreateStore(rootReducer, initialState)
  sagaMiddleware.run(apiSaga, store.getState)
  sagaMiddleware.run(reportingSaga, store.getState)
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers') // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}



// WEBPACK FOOTER //
// ./packages/main/src/store/store.dev.js