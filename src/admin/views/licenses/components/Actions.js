import PropTypes from 'prop-types'
import React from 'react'
import i18n from 'i18n'
import { each, first, includes, map, uniq } from 'lodash'

import { Hint, Disable } from '@signavio/effektif-commons/lib/components'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'

import License from '../../../models/License'
import Batch from '../../../models/Batch'
import DeleteButton from '../../DeleteButtonView'

module.exports = class extends React.Component {
  static displayName = 'Actions'

  static propTypes = {
    selection: PropTypes.arrayOf(PropTypes.instanceOf(License)).isRequired,
    category: PropTypes.string.isRequired,

    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
  }

  state = {
    performingOperation: false,
  }

  render() {
    return (
      <Disable
        disabled={this.props.selection.length === 0}
        hint={i18n(
          'Please select more than one item to use the bulk operations.'
        )}
      >
        <div className="toolbar">
          <DeleteButton
            message={this.getDeleteMessage()}
            onDelete={this.bulkDelete}
          />

          <IconButton
            light
            icon="edit"
            iconSet="fontAwesome"
            onClick={this.bulkEdit}
          >
            {i18n('Edit')}
          </IconButton>

          {this.renderOperationHint()}
        </div>
      </Disable>
    )
  }

  bulkEdit = () => {
    this.props.onEdit(
      new Batch({
        type: 'licenses',
        references: map(this.props.selection, item => item.id),
        packages: this.getPackages(),
        expirationDate: this.getExpirationDate(),
      })
    )
  }

  getPackages = () => {
    var packages = []

    each(this.props.selection, function(item) {
      if (!item.get('packages')) {
        return
      }

      each(item.get('packages'), function(pkg) {
        if (includes(packages, pkg)) {
          return
        }

        packages.push(pkg)
      })
    })

    return packages
  }

  getExpirationDate = () => {
    var dates = uniq(this.props.selection, function(item) {
      return item.get('expirationDate')
    })

    if (dates.length > 1) {
      return
    }

    return first(dates).get('expirationDate')
  }

  bulkDelete = () => {
    var batch = new Batch({ type: 'licenses' })

    batch.set('references', map(this.props.selection, item => item.id))

    this.setState({
      performingOperation: true,
    })

    batch.once(
      'destroy',
      function() {
        this.setState({
          performingOperation: false,
        })

        this.props.onDelete()
      },
      this
    )

    batch.destroy()
  }

  getDeleteMessage = () => {
    if (this.props.category === 'licenses') {
      return i18n(
        'Do you really want to delete this license?',
        'Do you really want to delete those __count__ licenses?',
        {
          count: this.props.selection.length,
        }
      )
    }

    return i18n(
      'Do you really want to delete this generator?',
      'Do you really want to delete those __count__ generators?',
      {
        count: this.props.selection.length,
      }
    )
  }

  renderOperationHint = () => {
    if (!this.state.performingOperation) {
      return
    }

    return (
      <Hint modal={true} loading={true}>
        {i18n('Performing batch operation, please wait...')}
      </Hint>
    )
  }
}



// WEBPACK FOOTER //
// ./src/admin/views/licenses/components/Actions.js