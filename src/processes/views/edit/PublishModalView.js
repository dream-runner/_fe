import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import ReactDOM from 'react-dom'
import i18n from 'i18n'

import { Confirm, Hint } from 'commons-components'
import { BaseMixin } from 'commons-mixins'
import Process from 'processes/models/Process'

module.exports = createReactClass({
  displayName: 'ProcessPublishModal',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(Process).isRequired,
  },

  getInitialState: function() {
    return {
      commitMessage: null,
      publishing: false,
      error: false,
    }
  },

  getDefaultProps: function() {
    return {
      onPublish: function() {},
    }
  },

  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.commitMessage).focus()
  },

  render: function() {
    const { error, publishing } = this.state

    return (
      <Confirm
        title={i18n('Publish changes')}
        disabled={error || publishing}
        confirmText={publishing ? i18n('Publishing...') : i18n('Publish')}
        onCancel={this.hideModal}
        onConfirm={this.publish}
      >

        {this.state.error ? this.renderError() : this.renderContent()}
      </Confirm>
    )
  },

  renderContent: function() {
    const { commitMessage } = this.state

    return (
      <div className="content">
        <Hint>
          {i18n(
            'Publish a new version of this process to put your changes into effect. ' +
              'New cases will then use the updated version of the process.'
          )}
        </Hint>
        <input
          type="text"
          ref="commitMessage"
          style={{ width: '100%' }}
          placeholder={i18n('Enter a comment summarizing your changes')}
          value={commitMessage}
          onChange={ev => this.setState({ commitMessage: ev.target.value })}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    )
  },

  renderError: function() {
    return (
      <div className="content">
        <Hint error>
          {i18n('Something went wrong publishing this process:')}
          <ul>
            {this.state.error.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </Hint>
      </div>
    )
  },

  handleKeyDown: function(event) {
    if (event.keyCode !== 13) {
      return
    }

    this.publish()
  },

  renderFooter: function() {
    return [
      <button
        className="btn btn-text"
        onClick={this.hideModal}
        disabled={this.state.publishing}
      >

        {i18n('Cancel')}
      </button>,
      this.renderPublishButton(),
    ]
  },

  publish: function() {
    this.props.onPublish(this.props.model)
    this.setState({ publishing: true })

    this.props.model.publish(
      this.state.commitMessage,
      () => {
        this.setState({ publishing: false })
        this.hideModal()

        this.props.onPublished(this.props.model)
      },
      errMsg => {
        this.setState({
          publishing: false,
          error: errMsg.split('\n'),
        })
      }
    )
  },

  hideModal: function() {
    this.props.onHide()
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/edit/PublishModalView.js