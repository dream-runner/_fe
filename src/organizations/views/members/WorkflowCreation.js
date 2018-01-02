// @flow
import React from 'react'
import { compose, withHandlers } from 'recompose'
import i18n from 'signavio-i18n'
import { List } from '@signavio/effektif-commons/lib/components'
import {
  booleanType,
  groupType,
  LabeledField,
} from '../../../../packages/fields'

type UserGroupT = {
  id: string,
}

type ItemT = {
  entity: UserGroupT,
  disabled?: boolean,
  type: string,
  value: string,
}

type OrganizationPropT = {
  [key: string]: string,
}

type InnerPropsT = {
  onGroupComplete: (value: ItemT) => void,
  onRestrictionComplete: (value: boolean) => void,
}

type PropsT = {
  limitedWorkflowCreation?: boolean,
  onChange: (newProp: OrganizationPropT) => void,
  workflowCreatorsGroupId?: string,
} & InnerPropsT

const WorkflowCreation = ({
  limitedWorkflowCreation,
  onGroupComplete,
  onRestrictionComplete,
  workflowCreatorsGroupId,
  style,
}: PropsT) =>
  <div {...style}>
    <h3 className="container-header">
      {i18n('Process creation')}
    </h3>

    <List>
      <LabeledField
        description={i18n(
          'Enable this option to configure which group of users can create processes.'
        )}
        label={i18n('Activate restriction')}
        onComplete={onRestrictionComplete}
        type={booleanType}
        value={limitedWorkflowCreation}
      />

      <LabeledField
        label={i18n('Group')}
        onComplete={onGroupComplete}
        type={groupType}
        value={workflowCreatorsGroupId}
      />
    </List>
  </div>

export default compose(
  withHandlers({
    onGroupComplete: ({ onChange }: PropsT) => (item: ItemT) =>
      onChange({ workflowCreatorsGroupId: item ? item.entity.id : null }),
    onRestrictionComplete: ({ onChange }: PropsT) => value =>
      onChange({ limitedWorkflowCreation: value }),
  })
)(WorkflowCreation)



// WEBPACK FOOTER //
// ./src/organizations/views/members/WorkflowCreation.js