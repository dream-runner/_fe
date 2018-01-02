import React from 'react'
import i18n from 'i18n'

import Router from 'singleton/Router'

import EffektifDetails from './EffektifDetails'

import { Modal } from 'commons-components'
import { TextButton } from 'commons-components/buttons'
import { applicationName } from '@signavio/effektif-commons'

module.exports = class extends React.Component {
  static displayName = 'AboutEffektif'

  render() {
    return (
      <Modal
        className="about"
        title={i18n('About __applicationName__', { applicationName })}
        footer={this.renderFooter()}
        onRequestHide={this.closeAbout}
      >
        <EffektifDetails {...this.props} />
      </Modal>
    )
  }

  renderFooter = () => {
    return (
      <TextButton primary block onClick={this.closeAbout}>
        {i18n('Close')}
      </TextButton>
    )
  }

  closeAbout = () => {
    this.props.onClose(false)
  }
}



// WEBPACK FOOTER //
// ./packages/main/src/components/AboutEffektif.js