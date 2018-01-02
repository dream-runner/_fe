import PropTypes from 'prop-types'
import React, { Component } from 'react'
import i18n from 'i18n'

import { Confirm, Hint } from 'commons-components'
import { IconButton } from 'commons-components/buttons'

export default class DeleteButton extends Component {
  static propTypes = {
    onDelete: PropTypes.func,

    message: PropTypes.string,
  }

  constructor() {
    super(...arguments)

    this.state = {
      confirmDelete: false,
    }
  }

  render() {
    return (
      <IconButton icon="trash" light onClick={() => this.handleDelete()}>
        {i18n('Delete')}

        {this.renderConfirmDelete()}
      </IconButton>
    )
  }

  renderConfirmDelete() {
    if (!this.state.confirmDelete) {
      return
    }

    let { onDelete, message } = this.props

    return (
      <Confirm onConfirm={onDelete} onCancel={() => this.cancelDelete()}>
        <Hint warning>
          {message || i18n('Are you sure you want to delete this item?')}
        </Hint>
      </Confirm>
    )
  }

  cancelDelete() {
    this.setState({
      confirmDelete: false,
    })
  }

  handleDelete() {
    this.setState({
      confirmDelete: true,
    })
  }
}



// WEBPACK FOOTER //
// ./src/admin/views/DeleteButtonView.js