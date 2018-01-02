import React from 'react'
import createReactClass from 'create-react-class'
import _ from 'underscore'

import { BaseMixin } from 'commons-mixins'

import Binding from 'processes/views/BindingView'

module.exports = createReactClass({
  displayName: 'Parameters',

  mixins: [BaseMixin],

  render: function() {
    return (
      <div className="application-parameters">
        {_.map(this.props.collection, this.renderBinding)}
      </div>
    )
  },

  renderBinding: function(parameter) {
    var workflow = this.props.model.getProcess()
    var bindables = workflow.getBindables(parameter.get('type'))

    return (
      <Binding
        model={this.props.model}
        attribute={parameter.get('key')}
        bindables={bindables}
        canClear={true}
        onChange={this.props.onChange}
        label={parameter.get('name')}
        readOnly={this.props.readOnly}
        key={parameter.get('key')}
      />
    )
  },
})



// WEBPACK FOOTER //
// ./src/activities/views/activities/service/ParametersView.js