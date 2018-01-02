import PropTypes from 'prop-types'
// @flow

import React, { Component } from 'react'
import i18n from 'signavio-i18n'

import { Organization } from 'commons-propTypes'
import { Autocomplete, Disable, Icon } from 'commons-components'
import { ActionTile, TextTile } from 'commons-components/tiles'
import { IconButton, RemoveButton } from 'commons-components/buttons'
import { QueryContainer } from 'commons-models'

import { Login } from 'singleton'

import { Avatar } from '../../../../../packages/organizations'

import { ProcessQuery } from '../../../models'

import { Process } from 'processes/propTypes'
import type { Process as ProcessType } from 'processes/types'
import { ProcessTile } from 'processes/views'

type Result<T> = {
  value: string,
  id: string,
  entity: T,
}

type Props = {
  value?: ProcessType,

  onSelect: (value: Process) => void,

  readOnly: boolean,
}

type State = {
  query: QueryContainer,
}

export default class ProcessSelect extends Component {
  props: Props

  state: State

  static contextTypes = {
    organization: Organization.isRequired,
    process: Process.isRequired,
  }

  constructor() {
    super(...arguments)

    const { organization, process } = this.context

    this.state = {
      query: new QueryContainer(new ProcessQuery(organization, process)),
    }
  }

  render() {
    const { value, readOnly } = this.props
    const { query } = this.state

    if (!value) {
      return (
        <Autocomplete
          readOnly={readOnly}
          query={query}
          renderItem={item => this.renderProcess(item.entity)}
          onResult={(processes, transform) =>
            this.disableProcesses(processes, transform)}
          placeholder={i18n('Which process should be started?')}
          onComplete={item => this.handleSelect(item.entity.id)}
        />
      )
    }

    return (
      <ProcessTile proc={value} toolbar={this.renderClear()}>
        {value.name}
      </ProcessTile>
    )
  }

  disableProcesses(
    entries: Array<Result<ProcessType>>,
    transform: (value: Array<ProcessType>) => void
  ) {
    transform(this.disableUnpublished(this.disableNonAccessible(entries)))
  }

  disableNonAccessible(entries: Array<Result<ProcessType>>) {
    return entries.map(({ entity, ...rest }) => ({
      ...rest,

      entity,

      disabled: entity.trigger && entity.trigger.type !== 'form',
    }))
  }

  disableUnpublished(entries: Array<Result<ProcessType>>) {
    return entries.map(item => ({
      ...item,

      disabled: item.disabled || !item.entity.published,
    }))
  }

  renderClear() {
    if (this.props.readOnly) {
      return
    }

    return <RemoveButton onClick={ev => this.handleClear(ev)} />
  }

  handleClear(ev: Event) {
    ev.stopPropagation()
    ev.preventDefault()

    this.handleSelect(null)
  }

  renderProcess(proc: ProcessType) {
    return (
      <ProcessTile
        proc={proc}
        style={{ backgroundColor: null }}
        subtitle={this.renderSubtitle(proc)}
      >
        {proc.name}
      </ProcessTile>
    )
  }

  renderSubtitle(proc: ProcessType) {
    if (!proc.published) {
      return i18n('This process is not published.')
    }
  }

  renderAvatar(item: Result<ProcessType>) {
    if (!item.entity.owner) {
      return
    }

    return <Avatar user={item.entity.owner} style={{ verticalAlign: 'top' }} />
  }

  handleSelect(value: ProcessType) {
    this.props.onSelect(value)
  }
}



// WEBPACK FOOTER //
// ./src/activities/views/activities/subprocess/ProcessSelect.js