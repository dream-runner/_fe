// @flow
import React from 'react'

import Router from 'singleton/Router'

const LegacyView = ({ location }) => {
  return <div>{Router.handleRoute(location)}</div>
}

export default LegacyView



// WEBPACK FOOTER //
// ./packages/main/src/containers/legacy/LegacyView.js