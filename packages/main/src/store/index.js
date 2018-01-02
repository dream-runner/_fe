// eslint-disable global-require
import createProductionStore from './store.prod'
import createDevelopmentStore from './store.dev'

let store

if (process.env.NODE_ENV === 'production') {
  store = createProductionStore()
} else {
  store = createDevelopmentStore()
}

export default store



// WEBPACK FOOTER //
// ./packages/main/src/store/index.js