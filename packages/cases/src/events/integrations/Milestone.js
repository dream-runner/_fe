// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import type { EventT } from '@signavio/workflow-events'
import Event from '@signavio/workflow-events'
import { List } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import { LabeledField, textType } from '@signavio/effektif-fields'

type PropsT = {
  event: EventT,
}

type MilestoneEventT = EventT & {
  milestone: string,
}

export default function MilestoneEvent({ event }: PropsT) {
  const { milestone, pastMilestone } = event

  return (
    <Event
      important
      event={event}
      iconSet="fontAwesome"
      icon="flag-o"
      title={i18n('Milestone: __milestone__', {
        milestone: milestone || <Hint inline>{i18n('Unnamed milestone')}</Hint>
      })}
    >
    
    { pastMilestone &&
      <List>
        <LabeledField
          readOnly
          label={ i18n('Current milestone') }
          value={ milestone || null }
          type={ textType() }
        />

        <LabeledField
          readOnly
          label={ i18n('Past milestone') }
          value={ pastMilestone }
          type={ textType() }
        />
      </List>
    }
    </Event>
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/integrations/Milestone.js