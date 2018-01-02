import React from 'react'
import createReactClass from 'create-react-class'
import { BaseMixin } from 'commons-mixins'

import { DynamicMappings } from '../../../../packages/workflows-app'

export default createReactClass({
  displayName: 'DynamicMappingsContainer',

  mixins: [BaseMixin],

  render() {
    const { model, refresh, ...rest } = this.props
    const inputs = model.get('inputs') || {}
    const outputs = model.get('outputs') || {}

    const workflow = model.getProcess()

    return (
      <DynamicMappings
        workflowId={workflow.id}
        actionId={model.id}
        refresh={refresh}
        outputs={outputs.toJSON ? outputs.toJSON() : outputs}
        inputs={inputs.toJSON ? inputs.toJSON() : inputs}
        onOutputRename={variable => {
          model
            .getProcess()
            .get('variables')
            .get(variable.id)
            .set('name', variable.name)
          model.save()
        }}
        onChangeOutputs={(newOutputs, newVariables) => {
          model.getProcess().get('variables').add(newVariables)

          model.set('outputs', newOutputs)
          model.save()
        }}
        onChangeInputs={(newInputs, newVariables) => {
          model.getProcess().get('variables').add(newVariables)

          model.set('inputs', newInputs)
          model.save()
        }}
        {...rest}
      />
    )
  },
})



// WEBPACK FOOTER //
// ./src/activities/views/activities/DynamicMappingsContainer.js