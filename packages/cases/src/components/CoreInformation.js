// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { compose } from 'recompose'

import { connect, types } from '@signavio/effektif-api'

import { Divider, List } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import { LabeledField, userType, dateTimeType } from '@signavio/effektif-fields'

import { Form } from '@signavio/workflow-forms'

import { withPeriodicAction } from './higher-order'

import type { CaseT } from '../types'

type PropsT = {
  caze: CaseT,
}

function CoreInformation({ fetchCase }: PropsT) {
  if (fetchCase.pending && !fetchCase.value) {
    return <Hint loading>{i18n('Loading case information')}</Hint>
  }

  const caze = fetchCase.value

  return (
    <div>
      <List>
        <LabeledField
          readOnly
          label={i18n('Created by')}
          value={caze.creator}
          type={userType}
        />
        <LabeledField
          readOnly
          label={i18n('Created on')}
          value={caze.createTime}
          type={dateTimeType()}
        />
      </List>

      {caze.coreInformation ? (
        <div>
          <Divider />
          <Form readOnly hideDoneButton fields={caze.coreInformation.fields} />
        </div>
      ) : (
        <Hint info>
          {i18n(
            'The core information for this case can be displayed here. Have a look at our docs to find out more about this feature.'
          )}
        </Hint>
      )}
    </div>
  )
}

export default compose(
  connect(({ caseId }) => ({
    fetchCase: {
      id: caseId,
      type: types.CASE,
    },
  })),
  withPeriodicAction(({ fetchCase }) => fetchCase())
)(CoreInformation)



// WEBPACK FOOTER //
// ./packages/cases/src/components/CoreInformation.js