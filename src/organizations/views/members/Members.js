import React from 'react'
import { compose, withHandlers } from 'recompose'
import i18n from 'signavio-i18n'
import { without } from 'lodash'

import { connect, types } from '@signavio/effektif-api'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import { Feature, Modal } from '@signavio/effektif-commons/lib/components'

import { Groups } from '../../../../packages/organizations'

import MemberList from './MemberList'
import FormerMembers from './FormerMembers'
import Invites from './Invites'
import Preferences from './Preferences'
import WorkflowCreation from './WorkflowCreation'

function Members({
  organization,
  style,
  removeUser,
  replaceUser,
  fetchLicenses,
  onAdminGrant,
  onAdminRevoke,
  onRemove,
  onChange,
  onReplace,
}) {
  const needsLicense = organization.licenseRequired
  const deletedUsers = organization.deletedUsers

  return (
    <div className="row">
      <div className="col-sm-6">
        <h3 className="container-header">{i18n('Users')}</h3>

        {(removeUser.rejected || replaceUser.rejected) && (
          <Hint danger>
            {i18n(
              'We could not remove the selected user for the following reason:\n\n__error__',
              {
                error: removeUser.reason || replaceUser.reason,
              }
            )}
          </Hint>
        )}

        <MemberList
          adminIds={organization.adminIds}
          onRemove={onRemove}
          onAdminGrant={onAdminGrant}
          onAdminRevoke={onAdminRevoke}
        />

        {deletedUsers.length > 0 && (
          <FormerMembers
            style={style('formerMembers')}
            formerMembers={deletedUsers}
            onReplace={onReplace}
          />
        )}

        {removeUser.pending && (
          <Modal>
            <Hint loading>{i18n('Removing user ...')}</Hint>
          </Modal>
        )}

        {replaceUser.pending && (
          <Modal>
            <Hint loading>{i18n('Replacing user ...')}</Hint>
          </Modal>
        )}

        <Feature feature="Action.InviteUser" showHint={false}>
          <div {...style('invite')}>
            <h3 className="container-header">{i18n('Invitations')}</h3>

            {!needsLicense && (
              <Invites
                invites={organization.invitations}
                organizationId={organization.id}
              />
            )}
          </div>
        </Feature>
      </div>
      <div className="col-sm-6">
        <h3 className="container-header">{i18n('Groups')}</h3>

        <Groups readOnly={needsLicense} />

        <Preferences model={organization} onChange={onChange} />

        <WorkflowCreation
          onChange={onChange}
          limitedWorkflowCreation={organization.limitedWorkflowCreation}
          workflowCreatorsGroupId={organization.workflowCreatorsGroupId}
          style={style('workflowCreation')}
        />
      </div>
    </div>
  )
}

const styled = defaultStyle(({ padding }) => ({
  invite: {
    marginTop: padding.large,
  },
  formerMembers: {
    marginTop: padding.large,
  },
  workflowCreation: {
    marginTop: padding.large,
  },
}))

export default compose(
  connect(() => ({
    removeUser: {
      type: types.USER_REMOVE,
      method: 'create',
    },
    replaceUser: {
      type: types.USER_REPLACE,
      method: 'create',
    },
  })),
  withHandlers({
    onAdminGrant: ({ organization, onChange }) => user =>
      onChange({
        adminIds: [...organization.adminIds, user.id],
      }),
    onAdminRevoke: ({ organization, onChange }) => user =>
      onChange({
        adminIds: without(organization.adminIds, user.id),
      }),
    onRemove: ({ removeUser }) => ({ userToRemove, replacement }) =>
      removeUser({
        id: userToRemove.id,
        replaceUserId: replacement ? replacement.id : null,
      }),
    onReplace: ({ replaceUser }) => ({ userToRemove, replacement }) =>
      replaceUser({
        id: userToRemove.id,
        replaceUserId: replacement ? replacement.id : null,
      }),
  }),
  styled
)(Members)



// WEBPACK FOOTER //
// ./src/organizations/views/members/Members.js