// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { List } from '@signavio/effektif-commons/lib/components'
import {
  Field,
  LabeledField,
  listType,
  userType,
  textType,
  emailAddressType,
} from '@signavio/effektif-fields'
import Event from '@signavio/workflow-events'

import type { CalendarEventT } from '../../../types'

type PropsT = {
  event: CalendarEventT,
}

export default function GoogleAddCalendarEvent({ event, ...rest }: PropsT) {
  const { links = [], attendeeIds = [], emailAttendees = [], logs } = event

  const link = links[0]

  return (
    <Event
      {...rest}
      event={event}
      icon="calendar"
      title={
        !link ? (
          i18n('Could not add the event to Google calendar.')
        ) : (
          i18n('__event__ was added to Google calendar', {
            event: link.name,
          })
        )
      }
    >
      {link ? (
        <List>
          <LabeledField
            readOnly
            label={link.name}
            type={{ name: 'link' }}
            value={link.url}
          />

          <LabeledField
            readOnly
            type={{ name: 'date', kind: 'datetime' }}
            value={event.startDate}
            label={i18n('Starts at')}
          />

          <LabeledField
            readOnly
            type={{ name: 'date', kind: 'datetime' }}
            value={event.endDate}
            label={i18n('Ends at')}
          />

          {attendeeIds.length > 0 && (
            <LabeledField
              readOnly
              type={listType(userType)}
              value={attendeeIds}
              label={i18n('Attendee', 'Attendees', {
                count: attendeeIds.length,
              })}
            />
          )}

          {emailAttendees.length > 0 && (
            <LabeledField
              readOnly
              type={listType(emailAddressType)}
              value={emailAttendees}
              label={i18n('External attendee', 'External attendees', {
                count: emailAttendees.length,
              })}
            />
          )}
        </List>
      ) : (
        <Field readOnly type={listType(textType())} value={logs.split('\n')} />
      )}
    </Event>
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/integrations/google/AddCalendarEvent.js