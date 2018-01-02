// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { withHandlers } from 'recompose'

import { Group, List } from '@signavio/effektif-commons/lib/components'

import type { TimeSpanT, ReminderOptionT } from '../../../types'

import DependentField from './DependentField'

type PropsT = {
  dueDate?: TimeSpanT,
  reminder?: TimeSpanT,
  reminderRepeat?: TimeSpanT,

  onDueDateChange: (dueDate: TimeSpanT) => void,
  onReminderChange: (reminder: TimeSpanT) => void,
  onReminderRepeatChange: (reminderRepeat: TimeSpanT) => void,
}

function ReminderOptions({
  dueDate,
  reminder,
  reminderRepeat,
  onDueDateChange,
  onReminderChange,
  onReminderRepeatChange,
}: PropsT) {
  return (
    <Group title={i18n('Reminders')}>
      <List>
        <DependentField
          value={dueDate}
          onChange={onDueDateChange}
          label={i18n('Due date')}
          description={i18n(
            'A due date represents the deadline until when this task needs to be completed. After you have set a due date, the tasks in the inboxes of users will be sorted accordingly.'
          )}
        />

        <DependentField
          value={reminder}
          onChange={onReminderChange}
          label={i18n('Reminder')}
          description={i18n(
            'A reminder can be used to inform the assignee or candidates of open tasks before they are due. Also, reminder emails are not affected by the notification settings of users which means they will always be sent.'
          )}
        />

        <DependentField
          dependsOn={reminder || null}
          value={reminderRepeat}
          onChange={onReminderRepeatChange}
          label={i18n('Continue reminding every')}
          description={i18n(
            'After the initial reminder has been sent to the user this setting can be used to send further, reoccuring reminders to the assignee or candidates. Be aware, the maximum number of reoccuring reminders is limited to 25.'
          )}
        />
      </List>
    </Group>
  )
}

type ApiPropsT = PropsT & {
  onChange: (option: ReminderOptionT, value: TimeSpanT) => void,
}

const enhance = withHandlers({
  onDueDateChange: ({ onChange }: ApiPropsT) => (value: TimeSpanT) =>
    onChange({ dueDate: value }),
  onReminderChange: ({ onChange }: ApiPropsT) => (value: TimeSpanT) =>
    onChange({ reminder: value }),
  onReminderRepeatChange: ({ onChange }: ApiPropsT) => (value: TimeSpanT) =>
    onChange({ reminderRepeat: value }),
})

export default enhance(ReminderOptions)



// WEBPACK FOOTER //
// ./src/activities/views/activities/usertask/ReminderOptions.js