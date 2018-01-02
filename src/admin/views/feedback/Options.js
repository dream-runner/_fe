import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import { BaseMixin } from 'commons-mixins'
import { getFeedbackOptions } from '@signavio/effektif-api'

import { Select } from 'commons-components'

import Options from '../OptionsView'
import Option from '../OptionView'

module.exports = createReactClass({
  display: 'FeedbackOptions',

  mixins: [BaseMixin],

  render: function() {
    return (
      <Options model={this.props.model} onChange={this.props.onChange}>
        <Option title={i18n('Subject')}>{this.renderSubject()}</Option>
      </Options>
    )
  },

  renderSubject: function() {
    const { model } = this.props

    return (
      <Select
        allowClear
        options={getFeedbackOptions()}
        value={model.get('subject')}
        onChange={subject => model.set('subject', subject)}
      />
    )
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/feedback/Options.js