import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import Router from 'singleton/Router'
import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'

import { DocumentTitle } from '@signavio/effektif-commons/lib/components'
import { PrimaryHeader } from '@signavio/effektif-commons/lib/components/headers'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

module.exports = createReactClass({
  displayName: 'CreateProcess',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      creating: false,
    }
  },

  render: function() {
    return (
      <div className="view new-process">
        <DocumentTitle title={i18n('New Process')} />

        {this.renderHeader()}
        {this.renderHelp()}
        {this.renderCreatingHint()}
      </div>
    )
  },

  renderHeader: function() {
    if (this.state.creating) {
      return
    }

    return (
      <div className="view-header">
        <PrimaryHeader
          autoFocus
          placeholder={i18n('What is the goal of this process?')}
          value={this.props.model.get('name')}
          onChange={ev => this.props.model.set('name', ev.target.value)}
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleBlur}
        />
      </div>
    )
  },

  renderCreatingHint: function() {
    if (!this.state.creating) {
      return null
    }

    return (
      <Hint loading view>
        {i18n('Creating new process...')}
      </Hint>
    )
  },

  renderHelp: function() {
    if (this.state.creating) {
      return
    }

    if (this.props.model.get('name').length === 0) {
      return <Hint inline>{i18n('Please enter a name for this process')}</Hint>
    }

    return <Hint inline>{this.renderHint()}</Hint>
  },

  renderHint: function() {
    return i18n('Press __key__ to create new process', {
      key: <kbd title={i18n('Enter')}>&crarr;</kbd>,
    })
  },

  handleBlur: function() {
    if (this.props.model.get('name')) {
      this.create()
    }
  },

  handleKeyDown: function(ev) {
    if (ev.keyCode !== 13) {
      // enter pressed
      return
    }

    if (!ev.target.value.trim()) {
      return
    }

    this.create()
  },

  create: function() {
    this.props.model.once(
      'sync',
      function() {
        var url = Router.reverse('process', { id: this.props.model.id })
        Router.navigate(url, { trigger: true })
      },
      this
    )

    this.props.model.create()

    this.trySetState({ creating: true })
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/CreateView.js