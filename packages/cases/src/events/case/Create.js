// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import { Form } from '@signavio/workflow-forms'

import Event from '@signavio/workflow-events'

import type { EventT } from '../../types'

import { Mail } from '../components'

type Props = {
  event: EventT,
}

const getTitle = ({ email, actor, name }: EventT) => {
  const interpolations = { case: name }

  if (email) {
    if (actor) {
      return i18n('started __case__ via email', interpolations)
    }

    return i18n('__case__ was started via email', interpolations)
  }

  if (actor) {
    return i18n('started __case__', interpolations)
  }

  return i18n('__case__ was started', interpolations)
}

const getIcon = ({ email, actor }: EventT) => {
  if (email) {
    return 'envelope'
  }

  if (!actor) {
    return 'folder-open-o'
  }

  return null
}

export default function CaseCreateEvent({ event, ...rest }: Props) {
  const { email, form, actor } = event

  return (
    <Event
      {...rest}
      important
      iconSet={!email && 'fontAwesome'}
      icon={getIcon(event)}
      event={event}
      title={getTitle(event)}
    >
      {email && <Mail email={email} />}
      {form && <Form readOnly hideDoneButton {...form} />}
    </Event>
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/case/Create.js