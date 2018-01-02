import React from 'react'
import createReactClass from 'create-react-class'
import $ from 'jquery'
import { BaseMixin } from 'commons-mixins'
import ServiceGroup from './ServiceGroupView'
import Item from './ItemView'

module.exports = createReactClass({
  displayName: 'PaletteView',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      openService: null,
    }
  },

  componentDidMount: function() {
    $(document).on('mousedown', this._onDocumentMouseDown)
  },

  componentWillUnmount: function() {
    $(document).off('mousedown', this._onDocumentMouseDown)
  },

  render: function() {
    return (
      <div className="activity-palette">
        {this.renderActionTypes()}
        {this.renderFlowConstructTypes()}
      </div>
    )
  },

  renderActionTypes: function() {
    var coreTypes = this.props.services.get('effektif').get('actionTypes')
      .models
    var externalServices = this.props.services.filter(s => s.isExternal())
    return (
      <ul className="actions-palette-core clearfix">
        {_.map(coreTypes, this.renderPaletteItem)}
        {_.map(externalServices, this.renderServicePaletteGroup)}
      </ul>
    )
  },

  renderFlowConstructTypes: function() {
    var flowTypes = this.props.services.get('bpmn-flow').get('actionTypes')
      .models

    return (
      <ul className="actions-palette-flow clearfix">
        {_.map(flowTypes, this.renderPaletteItem)}
      </ul>
    )
  },

  renderPaletteItem: function(activityType) {
    //todo: remove this if statement
    if (
      activityType.get('key') === 'dmnRuleTask' ||
      activityType.get('key') === 'zapier'
    ) {
      return
    }

    return <Item {...this.props} model={activityType} key={activityType.id} />
  },

  renderServicePaletteGroup: function(service) {
    //todo: remove this if statement
    if (service.get('key') === 'zapier') {
      return
    }

    if (service.get('key') === 'salesforce') {
      return
    }

    return (
      <ServiceGroup
        {...this.props}
        key={service.cid}
        model={service}
        open={this.state.openService === service}
        onToggle={this.handleServiceToggle}
      />
    )
  },

  handleServiceToggle: function(service) {
    this.setState({
      openService: service,
    })
  },

  _onDocumentMouseDown: function(ev) {
    if ($(ev.target).parents('.service-group').length === 0) {
      this.setState({
        openService: null,
      })
    }
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/edit/palette/PaletteView.js