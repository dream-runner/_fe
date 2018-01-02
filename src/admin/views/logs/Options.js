import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { BaseMixin } from 'commons-mixins'

import { Select } from 'commons-components'

import LogQuery from '../../models/params/LogQuery'
import Options from '../OptionsView'
import Option from '../OptionView'

module.exports = createReactClass({
  displayName: 'Options',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(LogQuery).isRequired,

    onChange: PropTypes.func.isRequired,
  },

  render: function() {
    return (
      <Options model={this.props.model} onChange={this.props.onChange}>

        {this.renderOption(i18n('Debug'), 'debug')}

        <Option title={i18n('Method')}>
          {this.renderMethodSelect()}
        </Option>

        {this.renderOption(i18n('Start date'), 'after')}
        {this.renderOption(i18n('End date'), 'before')}
        {this.renderOption(i18n('Duration'), 'dur')}

        <Option title={i18n('Sort by')}>
          {this.renderSortBy()}
        </Option>

        {this.renderOption(i18n('Path'), 'path')}
        {this.renderOption(i18n('Message'), 'msg')}
        {this.renderOption(i18n('Process instance'), 'piid')}
        {this.renderOption(i18n('Case ID'), 'caseId')}
      </Options>
    )
  },

  renderOption: function(title, field) {
    return (
      <Option
        title={title}
        field={field}
        model={this.props.model}
        onChange={this.props.onChange}
      />
    )
  },

  getMethodOptions: function() {
    return [
      this.getSelectOption('get', 'GET'),
      this.getSelectOption('post', 'POST'),
      this.getSelectOption('put', 'PUT'),
      this.getSelectOption('delete', 'DELETE'),
    ]
  },

  renderMethodSelect: function() {
    return (
      <Select
        allowClear
        options={this.getMethodOptions()}
        value={this.props.model.get('method')}
        onChange={this.handleMethodChange}
      />
    )
  },

  handleMethodChange: function(method) {
    this.props.model.set('method', method)
    this.props.onChange()
  },

  getSelectOption: function(id, title) {
    return {
      id: id,
      value: title,
    }
  },

  getSortingOptions: function() {
    return [
      this.getSelectOption('false', i18n('Sort by time')),
      this.getSelectOption('dur', i18n('Sort by duration')),
    ]
  },

  renderSortBy: function() {
    return (
      <Select
        allowClear
        options={this.getSortingOptions()}
        value={this.props.model.get('sortby')}
        onChange={this.handleSortChange}
      />
    )
  },

  handleSortChange: function(value) {
    this.props.model.set('sortby', value)
    this.props.onChange()
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/logs/Options.js