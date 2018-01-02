import React from 'react'
import i18n from 'signavio-i18n'
import { map } from 'lodash'
import { withHandlers, compose } from 'recompose'

import { connect, types, fulfillRequestThen } from '@signavio/effektif-api'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import {
  Remove,
  Popover,
  List,
  Modal,
} from '@signavio/effektif-commons/lib/components'
import { Tile } from '@signavio/effektif-commons/lib/components/tiles'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import { Field, organizationType } from '../../../packages/fields'

function Organizations({ admin, user, style, leaveOrganization, onLeave }) {
  return (
    <List>
      {leaveOrganization.rejected && (
        <Hint danger>{leaveOrganization.reason}</Hint>
      )}

      {map(user.organizationIds, (organizationId: string) => (
        <Tile
          key={organizationId}
          toolbar={
            <Popover
              small
              placement="left"
              popover={i18n('Leave this organization')}
            >
              <Remove
                icon="reopened"
                style={style('remove')}
                onRemove={() => onLeave(organizationId)}
              />
            </Popover>
          }
        >
          <Field
            admin={admin}
            readOnly
            type={organizationType}
            value={organizationId}
          />
        </Tile>
      ))}

      {leaveOrganization.pending && (
        <Modal>
          <Hint loading>{i18n('Leaving organization...')}</Hint>
        </Modal>
      )}
    </List>
  )
}

export default compose(
  connect(() => ({
    leaveOrganization: {
      type: types.LEAVE_ORGANIZATION,
      method: 'create',
    },
  })),
  fulfillRequestThen({
    leaveOrganization: ({ onLeave }) => onLeave(),
  }),
  withHandlers({
    onLeave: ({ user, leaveOrganization }) => (organizationId: string) =>
      leaveOrganization({ userId: user.id, organizationId }),
  }),
  defaultStyle({
    remove: {
      trash: {
        transform: 'rotate(90deg)',
      },
    },
  })
)(Organizations)



// WEBPACK FOOTER //
// ./src/users/views/OrganizationsView.js