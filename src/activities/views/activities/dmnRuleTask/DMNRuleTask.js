/* @flow */
import React from 'react'
import i18n from 'signavio-i18n'

import DynamicMappingsContainer from '../DynamicMappingsContainer'

type Props = {
  model: any,

  readOnly: boolean,
}

export default function DMNRuleTask({ model, readOnly }: Props) {
  return (
    <div>
      <h3>
        {i18n('DMN Rule Task')}
      </h3>

      <DynamicMappingsContainer
        autoCreateOutputs
        readOnly={readOnly}
        model={model}
      />
    </div>
  )
}



// WEBPACK FOOTER //
// ./src/activities/views/activities/dmnRuleTask/DMNRuleTask.js