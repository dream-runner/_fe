import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import Router from 'singleton/Router'

import { BaseMixin } from 'commons-mixins'
import { Hint as LegacyHint } from 'commons-components'
import { PrimaryHeader } from 'commons-components/headers'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

module.exports = createReactClass({
  displayName: 'CreateCase',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      loading: true,
      starting: false,
      startError: false,
    }
  },

  isLoadingOrHasError: function() {
    return this.state.starting || this.state.loading || this.state.startError
  },

  render: function() {
    return (
      <div className="view new-case">
        <div className="view-header">
          {this.renderProcessInfo()}
          {this.renderHeader()}
          {this.renderHelp()}
          {this.renderStartHint()}
          {this.renderLoadHint()}
          {this.renderErrorHint()}
        </div>
      </div>
    )
  },

  renderLoadHint: function() {
    if (!this.state.loading) {
      return
    }

    return (
      <Hint loading view>
        {i18n('Loading process information...')}
      </Hint>
    )
  },

  renderErrorHint: function() {
    if (!this.state.startError) {
      return null
    }

    return (
      <Hint danger view>
        {i18n("You don't have permission to start this case")}
      </Hint>
    )
  },

  renderHeader: function() {
    if (this.isLoadingOrHasError()) {
      return
    }

    return (
      <PrimaryHeader
        autoFocus
        placeholder={i18n('Type the topic to start the case')}
        value={this.props.model.get('name')}
        onChange={ev => this.props.model.set('name', ev.target.value)}
        onKeyDown={this.handleKeyDown}
      />
    )
  },

  renderProcessInfo: function() {
    if (!this.props.model.get('sourceWorkflow')) {
      return
    }

    return (
      <div className="process-name">
        <i className="icon fa fa-cogs" />
        {this.props.model.get('sourceWorkflow').get('name')}
      </div>
    )
  },

  renderStartHint: function() {
    if (!this.state.starting) {
      return null
    }

    return (
      <Hint loading view>
        {this.props.model.get('process')
          ? i18n('Starting your process...')
          : i18n('Starting new case...')}
      </Hint>
    )
  },

  renderHelp: function() {
    if (this.isLoadingOrHasError()) {
      return
    }

    if (!this.props.model.get('name')) {
      return
    }

    return (
      <LegacyHint inline header>
        {this.renderHint()}
      </LegacyHint>
    )
  },

  renderHint: function() {
    if (this.props.model.get('process')) {
      return i18n('Press __key__ to create new case of "__processName__"', {
        key: <kbd title={i18n('Enter')}>&crarr;</kbd>,
        processName: this.props.model.get('process').get('name'),
      })
    }

    return i18n('Press __key__ to create new case', {
      key: <kbd title={i18n('Enter')}>&crarr;</kbd>,
    })
  },

  /**
     * Auto-focus name input and preselect '#xy' name appendix
     */
  componentDidMount: function() {
    var process =
      this.props.model.get('triggerInstance') &&
      this.props.model.get('triggerInstance').get('sourceWorkflow')

    if (!process) {
      this.setState({
        loading: false,
      })

      return
    }

    process.fetchStartInfo((info, error) => {
      if (info) {
        var url = Router.reverse('process_start_form', { id: process.id })
        Router.navigate(url, { trigger: true })
        return
      }

      this.setState({ startError: error })

      this.setState({
        loading: false,
      })
    })
  },

  handleKeyDown: function(ev) {
    if (ev.keyCode === 13) {
      // enter pressed
      this.create()
    }
  },

  create: function() {
    this.props.model.once(
      'sync',
      function() {
        var url = Router.reverse('case', { id: this.props.model.id })
        Router.navigate(url, { trigger: true })
      },
      this
    )

    this.props.model.create()
  },
})



// WEBPACK FOOTER //
// ./src/cases/views/case/CreateView.js