import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import { omit } from 'lodash'

import { BaseMixin } from 'commons-mixins'
import { Hint } from 'commons-components'

import License from '../../../models/License'
import Batch from '../../../models/Batch'

import AuthDetails from './Details'
import AuthBatchDetails from './BatchDetails'

module.exports = createReactClass({
  displayName: 'ManageAuthDetails',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      saving: false,
      error: null,
    }
  },

  propTypes: {
    model: PropTypes.instanceOf(License).isRequired,

    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onBatchSave: PropTypes.func.isRequired,

    batch: PropTypes.instanceOf(Batch),
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (prevProps.model && prevProps.model !== this.props.model) {
      prevProps.model.off(null, null, this)
    }

    if (prevProps.batch && prevProps.batch !== this.props.batch) {
      prevProps.batch.off(null, null, this)
    }
  },

  componentWillUnmount: function() {
    if (this.props.model) {
      this.props.model.off(null, null, this)
    }

    if (this.props.batch) {
      this.props.batch.off(null, null, this)
    }
  },

  render: function() {
    return (
      <div className="manage-auth-details">
        {this.renderContent()}
        {this.renderSaveHint()}
        {this.renderError()}
      </div>
    )
  },

  renderContent: function() {
    var { model, batch, ...rest } = this.props

    if (this.props.batch) {
      return (
        <AuthBatchDetails
          model={batch}
          onDiscard={this.handleDiscard}
          onSave={this.handleBulkSave}
          {...omit(rest, 'onSave')}
        />
      )
    }

    return (
      <AuthDetails
        model={model}
        onDelete={this.handleDelete}
        onSave={this.handleSave}
        {...omit(rest, 'onSave')}
      />
    )
  },

  renderSaveHint: function() {
    if (!this.state.saving) {
      return
    }

    return (
      <Hint loading={true} modal={true}>
        {i18n('Saving changes...')}
      </Hint>
    )
  },

  renderError: function() {
    if (!this.state.error) {
      return
    }

    return (
      <Hint
        modal={true}
        error={true}
        onDismiss={() => this.setState({ error: null })}
      >

        {i18n(
          'The operation could not be completed. The server returned the following error: **__error__**',
          {
            markdown: true,
            error: this.state.error,
          }
        )}
      </Hint>
    )
  },

  handleBulkSave: function() {
    this.setState({
      saving: true,
    })

    this.props.batch.once(
      'sync',
      function() {
        this.setState({
          saving: false,
        })

        this.props.onBatchSave()
      },
      this
    )

    this.props.batch.save()
  },

  handleSave: function() {
    const { model, onSave } = this.props
    if (!model.hasUnsavedChanges()) {
      onSave(model)

      return
    }

    this.setState({
      saving: true,
    })

    model.once(
      'sync',
      () => {
        this.setState({
          saving: false,
        })

        onSave(model)
      },
      this
    )

    model.once(
      'error',
      (model, response) => {
        this.setState({
          saving: false,
          error: response.responseJSON.message,
        })
      },
      this
    )

    model.save()
  },

  handleDelete: function() {
    this.props.model.destroy()

    this.props.onDelete()
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/licenses/components/ManageDetails.js