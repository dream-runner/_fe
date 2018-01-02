import i18n from 'i18n'
import PropTypes from 'prop-types'
import React from 'react'

import Trigger from '../../models/Trigger'
import SystemConfiguration from 'container/models/SystemConfiguration'

import { Hint } from 'commons-components/hints'

export default function EmailTrigger({ model, systemConfiguration }) {
  const startMail = `process-${model.getProcess()
    .id}@${systemConfiguration.getRecipientMailDomain()}`

  return (
    <div className="configuration-content">
      <div className="activity-configuration email-trigger">
        <Hint>
          {i18n('This process can be started by sending an email to:')}
        </Hint>
        <h3 className="email-address">
          <a href={`mailto:${startMail}`}>{startMail}</a>
        </h3>
        <Hint>
          {i18n(
            'This email address can also be added to your mailing list like support@example.com.'
          )}
        </Hint>
      </div>
    </div>
  )
}

EmailTrigger.propTypes = {
  model: PropTypes.instanceOf(Trigger).isRequired,

  systemConfiguration: PropTypes.instanceOf(SystemConfiguration).isRequired,
}



// WEBPACK FOOTER //
// ./src/activities/views/triggers/EmailTriggerView.js