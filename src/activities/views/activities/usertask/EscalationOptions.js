// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { map, reject } from 'lodash'
import { withHandlers } from 'recompose'

import type { UserT, GroupT } from '@signavio/effektif-api'

import {
  Group,
  ContextHelp,
  List,
  Disable,
} from '@signavio/effektif-commons/lib/components'

import { UserSelect } from '../../../../../packages/organizations'
import {
  FieldStructure,
  userType,
  groupType,
} from '../../../../../packages/fields'
import type {
  ValueBindingT,
  UserIdT,
  GroupIdT,
} from '../../../../../packages/fields'

import type { TimeSpanT } from '../../../types'

import DependentField from './DependentField'

type PropsT = {
  escalate: ?TimeSpanT,
  escalateToIds: ?Array<ValueBindingT<string, UserIdT>>,
  escalateToGroupIds: ?Array<ValueBindingT<string, GroupIdT>>,

  onEscalationChange: (timespan: ?TimeSpanT) => void,
  onUserSelect: (user: UserT) => void,
  onGroupSelect: (group: GroupT) => void,
  onRemove: (entity: UserT | GroupT) => void,
}

function EscalationOptions({
  escalate,
  escalateToIds,
  escalateToGroupIds,
  onEscalationChange,
  onUserSelect,
  onGroupSelect,
  onRemove,
}: PropsT) {
  const users = map(
    escalateToIds,
    ({ value }: ValueBindingT<string, UserIdT>) => ({ id: value })
  )
  const groups = map(
    escalateToGroupIds,
    ({ value }: ValueBindingT<string, GroupIdT>) => ({ id: value })
  )

  return (
    <Group
      title={
        <span>
          {i18n('Escalation')}
          <ContextHelp>
            {i18n(
              'An escalation represents a deadline at which the task is automatically delegated to another user if it has not been completed.'
            )}
          </ContextHelp>
        </span>
      }
    >
      <List>
        <DependentField
          value={escalate}
          onChange={onEscalationChange}
          label={i18n('After')}
          description={i18n(
            'Define the duration after which this task should be escalated.'
          )}
        />

        <Disable
          disabled={!escalate}
          hint={i18n('Please first choose when the escalation should happen.')}
        >
          <FieldStructure label={i18n('Escalate to')}>
            <UserSelect
              showGroups
              items={{ users, groups }}
              onUserSelect={onUserSelect}
              onGroupSelect={onGroupSelect}
              onRemove={onRemove}
            />
          </FieldStructure>
        </Disable>
      </List>
    </Group>
  )
}

type EscalatePartialT = {
  escalate?: TimeSpanT,
  escalateToIds?: Array<ValueBindingT<string, UserIdT>>,
  escalateToGroupIds?: Array<ValueBindingT<string, GroupIdT>>,
}

type ApiPropsT = PropsT & {
  onChange: (value: EscalatePartialT) => void,
}

const enhance = withHandlers({
  onEscalationChange: ({ onChange }: ApiPropsT) => (value: TimeSpanT) =>
    onChange({
      escalate: value,
    }),
  onUserSelect: ({ escalateToIds, onChange }: ApiPropsT) => (user: UserT) =>
    onChange({
      escalateToIds: [
        ...(escalateToIds || []),
        {
          type: userType,
          value: user.id,
        },
      ],
    }),
  onGroupSelect: ({ escalateToGroupIds, onChange }: ApiPropsT) => (
    group: GroupT
  ) =>
    onChange({
      escalateToGroupIds: [
        ...(escalateToGroupIds || []),
        {
          type: groupType,
          value: group.id,
        },
      ],
    }),
  onRemove: ({ escalateToIds, escalateToGroupIds, onChange }: ApiPropsT) => (
    value: UserT | GroupT,
    { isGroup }
  ) => {
    if (isGroup) {
      onChange({
        escalateToGroupIds: reject(escalateToGroupIds, { value: value.id }),
      })
    } else {
      onChange({ escalateToIds: reject(escalateToIds, { value: value.id }) })
    }
  },
})

export default enhance(EscalationOptions)



// WEBPACK FOOTER //
// ./src/activities/views/activities/usertask/EscalationOptions.js