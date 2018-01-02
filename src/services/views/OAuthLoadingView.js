import React from 'react'
import i18n from 'i18n'
import { Hint } from 'commons-components'

module.exports = class extends React.Component {
  static displayName = 'OAuthLoadingView'

  render() {
    return (
      <div className="waiting">
        <link
          href={window.SOURCE_SANS_PRO_CSS}
          rel="stylesheet"
          property="stylesheet"
          type="text/css"
        />
        <link
          href={this.props.host + '/signavio-icon.css?_=' + this.props.revision}
          rel="stylesheet"
          property="stylesheet"
          type="text/css"
        />
        <link
          rel="stylesheet"
          property="stylesheet"
          type="text/css"
          href={this.props.host + '/oauth.css?_=' + this.props.revision}
        />

        <div className="logo" />

        <Hint>
          {i18n(
            'You are automatically redirected to authenticate with __serviceName__.',
            {
              serviceName: this.props.serviceName,
            }
          )}
          <br /><br />
          {i18n('This may take a moment.')}
        </Hint>
      </div>
    )
  }
}



// WEBPACK FOOTER //
// ./src/services/views/OAuthLoadingView.js