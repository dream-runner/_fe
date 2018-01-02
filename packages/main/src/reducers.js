import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as apiReducer } from '@signavio/effektif-api'
import { reducer as reportingReducer } from '@signavio/effektif-reporting'

import { LOGIN } from './actions'

function session(state = {}, action) {
  if (action.type === LOGIN) {
    return {
      ...action.payload,
    }
  }
  return state
}

export default combineReducers({
  reporting: reportingReducer,
  kraken: apiReducer,
  router: routerReducer,
  session,
})



// WEBPACK FOOTER //
// ./packages/main/src/reducers.js