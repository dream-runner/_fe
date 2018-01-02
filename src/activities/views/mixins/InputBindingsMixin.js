import React from 'react'
import BindingView from 'processes/views/BindingView'

module.exports = {
  renderBindings: function() {
    var params = this.props.model
      .get('type')
      .get('inputDescriptors')
      .chain()
      .filter(desc => !desc.get('hidden'))
      .map(desc => desc.get('key'))
      .value()

    if (!params || params.length === 0) {
      return
    }

    return (
      <div className="application-parameters">
        {params.map(this.renderBinding)}
      </div>
    )
  },

  renderBinding: function(parameterKey, allowStatic, label) {
    var param = this.props.model
      .get('type')
      .get('inputDescriptors')
      .get(parameterKey)

    if (param.get('fixed')) {
      return
    }

    var process = this.props.model.getProcess()
    var bindables = process.getBindables(param.get('type'))

    return (
      <BindingView
        model={this.props.model}
        attribute={parameterKey}
        bindables={bindables}
        canClear={true}
        allowStatic={allowStatic}
        onChange={this.save}
        label={param.get('name') || label}
        readOnly={this.props.readOnly}
        key={parameterKey}
      />
    )
  },

  save: function() {
    this.props.model.save()
  },
}



// WEBPACK FOOTER //
// ./src/activities/views/mixins/InputBindingsMixin.js