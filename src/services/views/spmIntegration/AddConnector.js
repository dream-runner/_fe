import React from 'react'
import i18n from 'signavio-i18n'

import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import { LabeledField, userType } from '../../../../packages/fields'

export default function AddConnectorPage({ onUserSelect }) {
  return (
    <div>
      <Hint>
        {i18n(
          'Workflow needs to use a user account to communicate with the Process Manager. This user has to be registered in both applications.'
        )}
      </Hint>

      <LabeledField
        noClear
        label={i18n('User account used for communication with Process Manager')}
        type={userType}
        onComplete={onUserSelect}
      />
    </div>
  )
}



// WEBPACK FOOTER //
// ./src/services/views/spmIntegration/AddConnector.js