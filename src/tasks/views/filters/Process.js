import PropTypes from 'prop-types'
import React, { Component } from 'react'
import i18n from 'signavio-i18n'
import _ from 'lodash'

import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { padding } from 'commons-style'

import ProcessPagination from './ProcessPagination'
import RadioSelect from './RadioSelect'

import FilterList from '../FilterList'

const MAX_PROCESSES = 8

export default class ProcessFilter extends Component {
  static propTypes = {
    processes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }

  constructor() {
    super(...arguments)

    this.state = {
      currentGroup: null,
      showAll: false,
    }
  }

  render() {
    let { active, loading } = this.props

    if (loading) {
      return (
        <FilterList
          title={i18n('Process Filter')}
          hint={this.renderHint()}
          expanded={!!active.process}
        >
          <Hint loading>{i18n('Loading processes...')}</Hint>
        </FilterList>
      )
    }

    return (
      <FilterList
        title={i18n('Process Filter')}
        hint={this.renderHint()}
        expanded={!!active.process}
      >
        {this.renderPagination()}
        {this.renderProcesses()}
        {this.renderExpand()}
      </FilterList>
    )
  }

  renderHint() {
    let { loading } = this.props

    if (loading) {
      return
    }

    let active = this.getActiveProcess()

    if (!active) {
      return
    }

    return i18n('Tasks of process __process__', {
      process: active.name,
    })
  }

  renderPagination() {
    let { processes } = this.props

    if (processes.length <= MAX_PROCESSES) {
      return
    }

    return (
      <ProcessPagination
        processes={processes}
        process={this.getActiveProcess()}
        value={this.state.currentGroup}
        onChange={group => this.changeGroup(group)}
      />
    )
  }

  getActiveProcess() {
    let { processes, active } = this.props

    return _(processes).find(({ id }) => active.process === id)
  }

  getCurrentProcesses() {
    if (!this.state.currentGroup) {
      return this.props.processes
    }

    return this.props.processes.filter(p =>
      this.state.currentGroup.test(p.name)
    )
  }

  renderExpand() {
    if (this.getCurrentProcesses().length <= MAX_PROCESSES) {
      return
    }

    if (this.state.showAll) {
      return
    }

    return (
      <IconButton
        light
        block
        icon="ellipsis"
        style={{ marginTop: padding.xsmall }}
        onClick={() => this.setState({ showAll: true })}
      >
        {i18n('Show all processes')}
      </IconButton>
    )
  }

  renderProcesses() {
    let { processes, active } = this.props
    let { currentGroup, showAll } = this.state

    if (currentGroup) {
      processes = this.getCurrentProcesses()

      if (!showAll) {
        processes = processes.slice(0, MAX_PROCESSES)
      }
    }

    let currentProcess = this.getActiveProcess() || {}

    return (
      <RadioSelect
        filters={processes}
        active={currentProcess.id}
        onChange={filter => this.handleChange(filter)}
      />
    )
  }

  handleChange(filter) {
    this.props.onChange({ process: filter })
  }

  changeGroup(group) {
    this.setState({
      currentGroup: group,
    })
  }
}



// WEBPACK FOOTER //
// ./src/tasks/views/filters/Process.js