import PropTypes from 'prop-types'
import React, { Component } from 'react'
import _ from 'underscore'
import i18n from 'i18n'

import { Organization } from 'commons-propTypes'
import { padding } from 'commons-style'
import { Divider } from 'commons-components'

import { retrieveWorkflows } from '../utils/WorkflowUtils'

import { Involvement, Assignment, DueDate, Process, More } from './filters'

export default class Controls extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
  }

  static defaultProps = {
    filters: {},
  }

  static contextTypes = {
    organization: Organization.isRequired,
  }

  constructor() {
    super(...arguments)

    this.state = {
      currentQuery: {},
      loadingProcesses: true,
      processes: [],
    }
  }

  componentWillMount() {
    retrieveWorkflows(this.context.organization).then(processes => {
      this.setState({
        loadingProcesses: false,

        processes,
      })
    })
  }

  render() {
    return (
      <div className="controls">
        {this.renderControl(Involvement)}

        <Divider />

        {this.renderControl(Assignment)}

        <Divider />

        <Process
          loading={this.state.loadingProcesses}
          processes={this.state.processes}
          active={this.props.filters}
          onChange={(filters, query) => this.handleFilterChange(filters, query)}
        />

        <Divider />

        {this.renderControl(DueDate)}

        <Divider />

        {this.renderControl(More)}
      </div>
    )
  }

  renderControl(Component) {
    return (
      <Component
        active={this.props.filters}
        onChange={(filters, query) => this.handleFilterChange(filters, query)}
      />
    )
  }

  handleFilterChange(query) {
    let { filters } = this.props

    let newQuery = _.reduce(
      { ...filters, ...query },
      (query, value, key) => {
        if (typeof value === 'underfined' || value === null) {
          return query
        }

        return {
          ...query,

          [key]: value,
        }
      },
      {}
    )

    this.props.onFilter(newQuery)
  }
}

const defautStyle = {
  control: index => ({
    marginTop: index > 0 ? padding.normal : 0,
  }),
}



// WEBPACK FOOTER //
// ./src/tasks/views/Controls.js