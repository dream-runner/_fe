import React from 'react'
import { withHandlers } from 'recompose'

import i18n from 'signavio-i18n'

import { TimeZoneSelect } from '../../../../packages/organizations'
import { LabeledField, textType } from '../../../../packages/fields'

function Preferences({ model, onTimeZoneChange, onSignatureChange }) {
  return (
    <div className="preferences">
      <h3 className="container-header">{i18n('Preferences')}</h3>

      <TimeZoneSelect
        label={i18n('Time zone')}
        value={model.timeZone}
        onChange={onTimeZoneChange}
      />
      <LabeledField
        type={textType({ multiLine: true })}
        label={i18n('Email signature')}
        description={i18n(
          "Enter your company's email signature. It will be used in all of your email notifications."
        )}
        placeholder={i18n('Enter your email signature here')}
        value={model.emailSignature}
        onComplete={onSignatureChange}
      />
    </div>
  )
}

const enhance = withHandlers({
  onTimeZoneChange: ({ onChange, model }) => timeZone =>
    onChange({ ...model, timeZone }),
  onSignatureChange: ({ model, onChange }) => emailSignature =>
    onChange({ ...model, emailSignature }),
})

export default enhance(Preferences)



// WEBPACK FOOTER //
// ./src/organizations/views/members/Preferences.js