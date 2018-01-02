// @flow
import React, { Component } from 'react'
import i18n from 'signavio-i18n'

import {
  DropDown,
  Disable,
  Confirm,
  List,
  Hint as LegacyHint,
} from '@signavio/effektif-commons/lib/components'
import { ActionTile } from '@signavio/effektif-commons/lib/components/tiles'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { KeyUtils } from '@signavio/effektif-commons/lib/utils'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import { Field } from '../../../../packages/fields/lib/components/fields'

import type { Case } from '../../types'

import Cancel from './CancelCaseView'

type Props = {
  case: Case,

  onCancel: (reason: string) => void,
  onDelete: (cascade: boolean) => void,
  onRefresh: () => void,
  onPrint: () => void,

  readOnly: boolean,
  print: boolean,
}

type State = {
  showCancelWarning: boolean,
  showDeleteWarning: boolean,
  cancelComment: string,
  cascadeDelete: boolean,
}

class Action extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.cancelCommentChanged = this.cancelCommentChanged.bind(this)
    this.changeCancelCommentVaild = this.changeCancelCommentVaild.bind(this)
    this.submitOnEnter = this.submitOnEnter.bind(this)

    this.state = {
      showCancelWarning: false,
      showDeleteWarning: false,
      cancelComment: '',
      cascadeDelete: false,
    }
  }

  render() {
    return (
      <div {...this.props.style}>
        <DropDown
          style={this.props.style('dropdown')}
          toggleIcon="ellipsis"
          closeOnClick
          pushRight
        >
          <List>
            {this.renderRefresh()}
            {this.renderPrint()}
            {this.renderCancel()}
            {this.renderDelete()}
          </List>
        </DropDown>

        {this.renderWarnings()}
      </div>
    )
  }

  commentLengthIsValid(event) {
    return event.target.value.length > 3
  }

  cancelCommentChanged(event) {
    this.setState({
      cancelComment: event.target.value,
    })
  }

  changeCancelCommentVaild(isValid) {
    this.setState({ cancelCommentValid: isValid })
  }
  submitOnEnter(event) {
    if (KeyUtils.isEnter(event) && this.commentLengthIsValid(event)) {
      this.acceptWarning()
    }
  }

  renderWarnings() {
    if (this.state.showCancelWarning) {
      return (
        <Confirm
          danger
          style={this.props.style('cancelWarning')}
          title={i18n('Close this case?')}
          onCancel={() => this.discardWarnings()}
          onConfirm={() => this.acceptWarning()}
          disabled={this.state.cancelComment.length <= 3}
        >
          <LegacyHint warning>
            {i18n(
              'Are you sure you want to close this case? This action cannot be undone.'
            )}
          </LegacyHint>

          <div className="control">
            <input
              autoFocus
              type="text"
              placeholder={i18n(
                'Please enter the reason for closing this case'
              )}
              style={{ width: '100%' }}
              onKeyDown={this.submitOnEnter}
              onChange={this.cancelCommentChanged}
            />
          </div>
        </Confirm>
      )
    }

    if (this.state.showDeleteWarning) {
      const { cascadeDelete } = this.state

      return (
        <Confirm
          danger
          style={this.props.style('deleteWarning')}
          title={i18n('Delete this case?')}
          onCancel={() => this.discardWarnings()}
          onConfirm={() => this.acceptWarning()}
        >
          <Hint warning style={this.props.style('cascadeDelete')}>
            <Field
              style={{ '&regular': { paddingTop: 0, paddingBottom: 0 } }}
              regularBoolean
              label={i18n('Delete all sub-cases')}
              type={{ name: 'boolean' }}
              value={cascadeDelete}
              onChange={checked => this.setState({ cascadeDelete: checked })}
            />
          </Hint>

          <LegacyHint>
            {i18n(
              'Are you sure you want to delete this case? This action cannot be undone.'
            )}
          </LegacyHint>
        </Confirm>
      )
    }
  }

  acceptWarning() {
    if (this.state.showCancelWarning) {
      this.props.onCancel(this.state.cancelComment)
    }

    if (this.state.showDeleteWarning) {
      this.props.onDelete(this.state.cascadeDelete)
    }

    this.discardWarnings()
  }

  discardWarnings() {
    this.setState({
      showCancelWarning: false,
      showDeleteWarning: false,
      cancelComment: '',
      cascadeDelete: false,
    })
  }

  renderRefresh() {
    return (
      <ActionTile
        style={this.props.style('refresh')}
        icon="refresh"
        onClick={() => this.props.onRefresh()}
      >
        {i18n('Refresh case')}
      </ActionTile>
    )
  }

  renderPrint() {
    return (
      <ActionTile
        style={this.props.style('print')}
        icon="printer"
        onClick={() => this.props.onPrint()}
      >
        {this.getPrintLabel()}
      </ActionTile>
    )
  }

  getPrintLabel() {
    if (this.props.print) {
      return i18n('Switch to regular view')
    }

    return i18n('Switch to print view')
  }

  renderCancel() {
    return (
      <Disable
        hint={this.getDisabledHint()}
        placement="left"
        disabled={!!(this.props.readOnly || this.props.case.closed)}
      >
        <Cancel
          style={this.props.style('cancel')}
          onCancel={() => this.handleCancel()}
        />
      </Disable>
    )
  }

  handleCancel() {
    this.setState({
      showCancelWarning: true,
    })
  }

  renderDelete() {
    return (
      <Disable disabled={!!this.props.readOnly}>
        <ActionTile
          style={this.props.style('delete')}
          icon="trash"
          onClick={() => this.handleDelete()}
        >
          {i18n('Delete case')}
        </ActionTile>
      </Disable>
    )
  }

  handleDelete() {
    this.setState({
      showDeleteWarning: true,
    })
  }

  getDisabledHint() {
    if (this.props.readOnly) {
      return i18n(
        'You are not allowed to edit this case and therefore cannot close it.'
      )
    }

    if (this.props.case.closed) {
      return i18n('This case is already closed.')
    }
  }
}

export default defaultStyle()(Action)



// WEBPACK FOOTER //
// ./src/cases/views/case/Actions.js