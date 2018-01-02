import PropTypes from 'prop-types'
import React from 'react'
import { filter } from 'lodash'

import i18n from 'signavio-i18n'

import { Popover, List } from '@signavio/effektif-commons/lib/components'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'

import { UserAvatar } from '../../../../../packages/organizations'

module.exports = class extends React.Component {
  static displayName = 'RightsIndicator'

  static propTypes = {
    placement: PropTypes.string,
  }

  static defaultProps = {
    placement: 'left',
  }

  render() {
    const { model, onClick, placement } = this.props

    const editors = this.getEditors()

    return (
      <div>
        <Popover small placement={placement} popover={this.getTooltipMessage()}>
          <IconButton
            iconSet="fontAwesome"
            icon={model ? 'lock' : 'globe'}
            onClick={onClick}
          />
        </Popover>

        {editors.length > 0 &&
          <Popover
            small
            placement="top"
            popover={i18n('People who can edit this process')}
          >
            <List direction="horizontal" style={{ float: 'right' }}>
              {editors.map(({ id }) => <UserAvatar key={id} value={id} />)}
            </List>
          </Popover>}
      </div>
    )
  }

  getTooltipMessage = () => {
    if (this.props.model) {
      return i18n(
        'This process is private. You can review the restrictions in the "Details" tab.'
      )
    }

    return i18n(
      'This process is public. Everyone in the organization can view, edit and start it.'
    )
  }

  getEditors = () => {
    const { model } = this.props

    if (!model) {
      return []
    }

    if (!model.edit) {
      return []
    }

    return filter(model.edit, ({ type }) => type === 'user')
  }
}



// WEBPACK FOOTER //
// ./src/processes/views/edit/access/RightsIndicator.js