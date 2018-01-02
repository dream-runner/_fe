// @flow
import { lifecycle } from 'recompose'
import $ from 'jquery'

import Router from 'singleton/Router'

export default lifecycle({
  componentWillMount() {
    const { onLogout } = this.props

    if (!onLogout) {
      return
    }

    // Register a global ajaxError listener and redirect
    //  - to logout -> login, if a request fails with "unauthorized"
    //  - to the current fallback URL, if a request fails with 404
    $(document).bind('ajaxError', (event, jqxhr, settings, exception) => {
      if (settings.type !== 'GET') {
        return
      }

      if (String(exception).toLowerCase() === 'unauthorized') {
        onLogout()

        return
      }

      if (
        jqxhr.status === 404 &&
        !settings.isAutoFetch &&
        !jqxhr.preventFallback
      ) {
        Router.fallback()
      }
    })
  },
})



// WEBPACK FOOTER //
// ./packages/main/src/components/higher-order/with40xSupport.js