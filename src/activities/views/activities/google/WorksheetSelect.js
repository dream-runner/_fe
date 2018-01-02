import PropTypes from 'prop-types'
import React, { Component } from 'react'
import i18n from 'i18n'

import { fetchChild } from 'services/utils/PathUtils'

import { Select, Hint } from 'commons-components'

import { FieldStructure } from '../../../../../packages/fields'

export default class WorksheetSelect extends Component {
  static propTypes = {
    spreadsheet: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  }

  constructor() {
    super()

    this.state = {
      loading: false,
      data: [],
    }
  }

  componentWillMount() {
    let { spreadsheet } = this.props

    if (!spreadsheet) {
      return
    }

    this.fetchWorksheets(spreadsheet)
  }

  fetchWorksheets(spreadsheet) {
    this.setState({
      loading: true,
    })

    let { account } = this.props

    fetchChild(
      account,
      { id: spreadsheet },
      'type:worksheet'
    ).then(({ [spreadsheet]: { children } }) => {
      this.setState({
        data: children,
        loading: false,
      })
    })
  }

  componentWillUpdate(nextProps, nextState) {
    let { spreadsheet } = nextProps

    if (spreadsheet !== this.props.spreadsheet) {
      this.fetchWorksheets(spreadsheet)
    }
  }

  render() {
    if (!this.props.spreadsheet) {
      return (
        <Hint info>
          {i18n('Please select a spreadsheet in order to configure this task.')}
        </Hint>
      )
    }

    return (
      <FieldStructure narrowLabel label={i18n('Worksheet')}>
        {this.renderField()}
      </FieldStructure>
    )
  }

  renderField() {
    let { spreadsheet } = this.props

    if (!spreadsheet) {
      return (
        <Hint inline>
          {i18n('Please first select a spreadsheet')}
        </Hint>
      )
    }

    if (this.state.loading) {
      return (
        <Hint inline loading>
          {i18n('Loading worksheets...')}
        </Hint>
      )
    }

    let { value, onChange } = this.props
    let options = this.getOptions()

    if (!value && options.length > 0) {
      value = options[0].id
    }

    return (
      <Select
        options={options}
        placeholder={i18n('Please select a worksheet')}
        value={value}
        onChange={onChange}
      />
    )
  }

  getOptions() {
    return this.state.data.map(({ title, id }) => ({
      id,
      value: title,
    }))
  }
}



// WEBPACK FOOTER //
// ./src/activities/views/activities/google/WorksheetSelect.js