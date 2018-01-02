import React from 'react'

import i18n from 'signavio-i18n'
import {
  FilterList,
  RadioSelect,
} from '@signavio/effektif-commons/lib/components'

import type { WorkflowFiltersT } from '../../types'

const triggerTypes = [
  {
    id: 'approvalWorkflow',
    name: i18n('Approval Workflow'),
  },
  {
    id: 'email',
    name: i18n('Email'),
  },
  {
    id: 'form',
    name: i18n('Form'),
  },
  {
    id: 'manual',
    name: i18n('Manual'),
  },
  {
    id: 'salesforceMessage',
    name: i18n('Salesforce Message'),
  },
]

type PropsT = {
  active: WorkflowFiltersT,
  onChange: (value: WorkflowFiltersT) => void,
}

const getHint = (trigger: string) => {
  if (!trigger) {
    return null
  }

  return triggerTypes.find(triggerType => triggerType.id === trigger).name
}

const Trigger = ({ active, onChange }: PropsT) =>
  <FilterList
    title={i18n('Trigger')}
    hint={getHint(active.trigger)}
    expanded={!!active.trigger}
  >
    <RadioSelect
      filters={triggerTypes}
      active={active.trigger}
      onChange={(id: string) => onChange({ trigger: id })}
    />
  </FilterList>

export default Trigger



// WEBPACK FOOTER //
// ./src/processes/views/filters/Trigger.js