import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import OAuthLoadingView from '../views/OAuthLoadingView'

exports.performOAuth = (service, account, clb, ctx) => {
  var left = window.screenLeft
  var top = window.screenTop
  var win = window.open(
    '',
    '',
    'height=600,width=450,left=' + left + ',top=' + top
  )

  var container = win.document.createElement('div')
  win.document.body.appendChild(container)

  // show loading screen
  ReactDOM.render(
    React.createElement(OAuthLoadingView, {
      host: window.STATICS_HOST,
      serviceName: service.get('name'),
      revision: window.EFFEKTIF_REVISION,
    }),
    container
  )

  service.oauth(
    '',
    account && account.id,
    function(resp) {
      win.location = resp.authorizationUrl

      // Check if the redirect is back to effektif
      var interval = window.setInterval(
        function() {
          try {
            var loc = win.location.toString()
            if (loc && loc !== 'about:blank') {
              window.clearInterval(interval)

              if (clb) {
                clb.call(ctx)
              }

              win.close()
            }
          } catch (e) {}
        }.bind(this),
        100
      )
    }.bind(this)
  )
}



// WEBPACK FOOTER //
// ./src/services/utils/OAuthUtils.js