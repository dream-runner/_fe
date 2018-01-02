// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { withStateHandlers } from 'recompose'

import { Menu, Box } from '@signavio/effektif-commons/lib/components'

import ReminderOptions from './ReminderOptions'
import EscalationOptiosn from './EscalationOptions'
import AutoCloseOptions from './AutoCloseOptions'

type ViewT = 'reminders' | 'escalation' | 'autoClose'

type PropsT = {
  view: ViewT,

  onViewChange: (view: ViewT) => void,
}

function Reminders({ action, view, onChange, onViewChange }: PropsT) {
  return (
    <Box white>
      <div className="row">
        <div className="col-md-3">
          <Menu options={getOptions()} value={view} onChange={onViewChange} />
        </div>
        <div className="col-md-9">
          {view === 'reminders' && (
            <ReminderOptions
              dueDate={action.dueDate}
              reminder={action.reminder}
              reminderRepeat={action.reminderRepeat}
              onChange={onChange}
            />
          )}

          {view === 'escalation' && (
            <EscalationOptiosn
              escalate={action.escalate}
              escalateToIds={action.escalateToIds}
              escalateToGroupIds={action.escalateToGroupIds}
              onChange={onChange}
            />
          )}

          {view === 'autoClose' && (
            <AutoCloseOptions
              autoClose={action.autoClose}
              onChange={onChange}
            />
          )}
        </div>
      </div>
    </Box>
  )
}

const getOptions = () => [
  {
    id: 'reminders',
    title: i18n('Reminders'),
  },
  {
    id: 'escalation',
    title: i18n('Escalation'),
  },
  {
    id: 'autoClose',
    title: i18n('Automatic close'),
  },
]

const enhance = withStateHandlers(
  { view: 'reminders' },
  {
    onViewChange: () => (view: string) => ({ view }),
  }
)

export default enhance(Reminders)



// WEBPACK FOOTER //
// ./src/activities/views/activities/usertask/Reminders.js