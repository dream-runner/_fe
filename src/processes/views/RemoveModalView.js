import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import { find, defer } from 'lodash'
import $ from 'jquery'

import { Effektif } from 'singleton'

import { Confirm, Hint as LegacyHint } from 'commons-components'
import { BaseMixin } from 'commons-mixins'

import Process from '../models/Process'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

module.exports = createReactClass({
  displayName: 'ProcessRemoveModal',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(Process).isRequired,
  },

  getInitialState: function() {
    return {
      confirmationText: '',
      invalidInput: false,

      cascadeDelete: false,
      openCasesCount: null,
      closedCasesCount: null,
    }
  },

  componentWillMount: function() {
    const { model } = this.props

    $.ajax({
      type: 'GET',
      url: Effektif.makeUrl('info/cases'),
    }).done(data => {
      const { open = 0, closed = 0 } =
        find(
          data,
          ({ editorWorkflow }) =>
            editorWorkflow && editorWorkflow.id === model.id
        ) || {}

      this.setState({
        openCasesCount: open,
        closedCasesCount: closed,
      })
    })
  },

  componentDidUpdate: function() {
    defer(() => {
      if (this.state.confirmationText === '' && this.refs.confirm) {
        this.refs.confirm.focus()
      }
    })
  },

  render: function() {
    var title = i18n('Delete process: __process__', {
      process: this.props.model.get('name'),
    })

    const isLoading = this.casesCountLoading()
    const isValid = this.confirmationTextIsValid()

    return (
      <Confirm
        danger
        disabled={isLoading || !isValid}
        confirmText={isLoading ? i18n('Waiting...') : i18n('Delete')}
        title={title}
        onCancel={this.hideModal}
        onConfirm={this.deleteProcess}
      >

        {this.renderCaseInfo()}
        {this.renderContent()}
      </Confirm>
    )
  },

  renderContent: function() {
    if (this.casesCountLoading()) {
      return
    }

    const { confirmationText } = this.state

    return (
      <div className="content">
        <p>
          {i18n(
            'This action cannot be undone! To delete, type __word__ to confirm',
            {
              word: (
                <code>
                  {this.props.model.get('name').toLowerCase() ||
                    i18n('unnamed')}
                </code>
              ),
            }
          )}
        </p>

        <input
          type="text"
          style={{ width: '100%' }}
          ref="confirm"
          className="confirm-input"
          value={confirmationText}
          onChange={ev => this.setState({ confirmationText: ev.target.value })}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    )
  },

  handleKeyDown: function(event) {
    if (event.keyCode !== 13) {
      return
    }

    if (this.confirmationTextIsValid()) {
      this.deleteProcess()
    }
  },

  deleteProcess: function() {
    this.props.model.destroy({
      cascade: this.state.cascadeDelete,
    })

    this.props.onRemove(this.props.model)

    this.hideModal()
  },

  renderCaseInfo: function() {
    if (this.casesCountLoading()) {
      return (
        <Hint loading>
          {i18n('Checking if there are cases of this process...')}
        </Hint>
      )
    }

    if (this.state.openCasesCount === 0 && this.state.closedCasesCount === 0) {
      return (
        <LegacyHint info>
          {i18n('There are no cases of this process')}
        </LegacyHint>
      )
    }

    const { cascadeDelete } = this.state

    return (
      <LegacyHint warning>
        <label>
          <input
            type="checkbox"
            value={cascadeDelete}
            onChange={ev => this.setState({ cascadeDelete: ev.target.checked })}
          />

          {i18n('Also delete')}
        </label>
        <ul>
          <li>
            {i18n(
              '__count__ open case of this process',
              '__count__ open cases of this process',
              {
                count: this.state.openCasesCount,
              }
            )}
          </li>
          <li>
            {i18n(
              '__count__ closed case of this process',
              '__count__ closed cases of this process',
              {
                count: this.state.closedCasesCount,
              }
            )}
          </li>
        </ul>
      </LegacyHint>
    )
  },

  hideModal: function() {
    this.props.onHide()
  },

  casesCountLoading: function() {
    return (
      this.state.openCasesCount === null || this.state.closedCasesCount === null
    )
  },

  confirmationTextIsValid: function() {
    return (
      this.state.confirmationText ===
      (this.props.model.get('name') || i18n('unnamed')).toLowerCase()
    )
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/RemoveModalView.js