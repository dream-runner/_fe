import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'

import { saga as apiSaga } from '@signavio/effektif-api'
import { saga as reportingSaga } from '@signavio/effektif-reporting'

import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const { unsyncedHistory } = require('../index')
  const sagaMiddleware = createSagaMiddleware()

  const finalCreateStore = compose(
    applyMiddleware(sagaMiddleware, routerMiddleware(unsyncedHistory))
  )(createStore)

  const store = finalCreateStore(rootReducer, initialState)
  sagaMiddleware.run(apiSaga, store.getState)
  sagaMiddleware.run(reportingSaga, store.getState)
  return store
}



// WEBPACK FOOTER //
// ./packages/main/src/store/store.prod.js