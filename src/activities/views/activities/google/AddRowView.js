import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { FileUtils } from 'commons-utils'
import { Hint } from 'commons-components'
import { BaseMixin } from 'commons-mixins'

import Login from 'singleton/Login'

import ServiceAction from '../service'
import ProvidePath from '../ProvidePath'

import ColumnMapping from './ColumnMapping'
import WorksheetSelect from './WorksheetSelect'

export default createReactClass({
  displayName: 'AddRow',

  mixins: [BaseMixin],

  render: function() {
    let { model, ...rest } = this.props

    return (
      <ServiceAction model={model} {...rest}>
        <div className="application-configuration">
          {this.renderContent()}
          {this.props.children}
        </div>
      </ServiceAction>
    )
  },

  renderContent: function() {
    if (
      this.props.model.get('account') &&
      this.props.model.get('account').hasViewAccess(Login.user())
    ) {
      return this.renderConfiguration()
    }

    return (
      <Hint>
        {i18n('Only the account owner can configure this action.')}
      </Hint>
    )
  },

  renderConfiguration() {
    return (
      <div>
        <ProvidePath
          label={i18n('Spreadsheet')}
          account={this.props.model.get('account')}
          value={this.props.model.get('spreadsheetId')}
          types={['folder', 'spreadsheet']}
          onChange={this.handleSpreadsheetChange}
        />

        {this.renderWorksheetSelect()}

        {this.renderColumnMapping()}
      </div>
    )
  },

  renderWorksheetSelect: function() {
    return (
      <WorksheetSelect
        account={this.props.model.get('account')}
        spreadsheet={this.props.model.get('spreadsheetId')}
        value={this.props.model.get('worksheetId')}
        onChange={this.handleWorksheetSelect}
      />
    )
  },

  renderColumnMapping: function() {
    if (!this.props.model.get('spreadsheetId')) {
      return
    }

    return (
      <ColumnMapping
        model={this.props.model}
        account={this.props.model.get('account')}
        spreadsheet={this.props.model.get('spreadsheetId')}
        worksheet={this.props.model.get('worksheetId')}
      />
    )
  },

  handleSpreadsheetChange: function({ id, mimeType }) {
    if (
      !FileUtils.isExcel(mimeType) &&
      !FileUtils.isGoogleSpreadsheet(mimeType)
    ) {
      return
    }

    this.props.model.set({
      spreadsheetId: id,
      worksheetId: null,
      inputs: null,
    })
    this.props.model.set('inputs', {})

    this.props.model.save()
  },

  handleWorksheetSelect: function(url) {
    this.props.model.set({
      worksheetId: url,
      inputs: null,
    })
    this.props.model.set('inputs', {})

    this.props.model.save()
  },
})



// WEBPACK FOOTER //
// ./src/activities/views/activities/google/AddRowView.js