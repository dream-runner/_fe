import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import $ from 'jquery'
import i18n from 'i18n'
import _ from 'underscore'

import { BaseMixin } from 'commons-mixins'
import { List } from 'commons-components'
import { Hint } from 'commons-components/hints'

import { LabeledBinding } from '../../../../../packages/fields'

export default createReactClass({
  displayName: 'ColumnMapping',

  propTypes: {
    spreadsheet: PropTypes.string,
    worksheet: PropTypes.string,
    onChange: PropTypes.func,
  },

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      loading: true,
      columns: [],
    }
  },

  componentWillMount: function() {
    let { account, spreadsheet, worksheet } = this.props

    if (!spreadsheet && !worksheet) {
      return
    }

    this.fetchColumns(spreadsheet, worksheet)
  },

  componentWillUpdate: function(nextProps, nextState) {
    let { spreadsheet, worksheet } = nextProps

    if (
      spreadsheet &&
      (spreadsheet !== this.props.spreadsheet ||
        worksheet !== this.props.worksheet)
    ) {
      this.fetchColumns(spreadsheet, worksheet)
    }
  },

  fetchColumns: function(spreadsheet, worksheet) {
    worksheet = worksheet || ''

    this.setState({
      loading: true,
      error: null,
    })

    return $.ajax({
      type: 'GET',
      url: `${this.props.account.url()}/inputs/resource/${spreadsheet}/${worksheet}`,
      contentType: 'application/json',
    })
      .then(resp => {
        this.setState({
          loading: false,
          columns: resp,
        })
      })
      .fail((error = {}) => {
        this.setState({
          loading: false,
          error: error.responseJSON.message,
        })
      })
  },

  render: function() {
    return (
      <div className="column-mapping-container">
        {this.renderHint()}
        {this.renderLoading()}
        {this.renderMappings()}
      </div>
    )
  },

  renderHint: function() {
    if (this.state.error) {
      return <Hint danger>{this.state.error}</Hint>
    }

    return (
      <Hint>
        {i18n(
          'Select fields or type some values that shall be inserted into the cells of the row.'
        )}
      </Hint>
    )
  },

  renderMappings: function() {
    if (this.state.loading || this.state.error) {
      return
    }

    return <List>{this.state.columns.map(this.renderMapping)}</List>
  },

  renderMapping: function({ key, metadata, type }) {
    const binding = this.props.model.getInput(key)

    return (
      <LabeledBinding
        narrowLabel
        key={key}
        label={metadata.header}
        binding={binding}
        type={type}
        allowStatic
        canClear
        onChange={binding => this.handleBindingChange(key, metadata, binding)}
      />
    )
  },

  renderLoading: function() {
    if (!this.state.loading) {
      return
    }

    return <Hint loading>{i18n('Fetching the spreadsheet columns')}</Hint>
  },

  handleBindingChange: function(key, metadata, binding) {
    let inputs = this.props.model.get('inputs').toJSON()

    // only keep inputs that still match the current spreadsheet columns
    var newInputs = {}
    _.each(this.state.columns, col => {
      newInputs[col.key] =
        col.key === key
          ? {
              ...binding,
              metadata,
            }
          : inputs[col.key]
    })

    this.props.model.set('inputs', newInputs)
    this.props.model.save()
  },
})



// WEBPACK FOOTER //
// ./src/activities/views/activities/google/ColumnMapping.js