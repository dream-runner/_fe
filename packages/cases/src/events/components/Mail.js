// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { map } from 'lodash'

import { List, Divider } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import {
  LabeledField,
  Field,
  fileType,
  emailAddressType,
  textType,
} from '@signavio/effektif-fields'

import type { EmailT } from '../../types'

type PropsT = {
  email: EmailT,
}

function Mail({ email, style }: PropsT) {
  return (
    <List>
      {map(email.from, (sender: string) =>
        <LabeledField
          readOnly
          label={i18n('From')}
          type={emailAddressType}
          value={extractEmailAddress(sender)}
        />
      )}

      {map(email.replyTo, (recipient: string) =>
        <LabeledField
          readOnly
          label={i18n('Reply to')}
          type={emailAddressType}
          value={extractEmailAddress(recipient)}
        />
      )}

      <LabeledField
        readOnly
        label={i18n('Subject')}
        type={textType}
        value={extractEmailAddress(email.subject)}
      />

      <Divider title={i18n('Message')} />

      {email.bodyText
        ? <pre {...style('body')}>
            {email.bodyText}
          </pre>
        : <Hint inline>
            {i18n('Message is empty')}
          </Hint>}

      {email.attachments &&
        <div>
          <Divider title={i18n('Attachments')} />

          {map(email.attachments, attachment =>
            <Field readOnly type={fileType} value={attachment.id} />
          )}
        </div>}
    </List>
  )
}

const extractEmailAddress = (email: string) =>
  (email.match(/[^\s<]+@[^\s>]+/) || [email])[0]

const styled = defaultStyle(({ font }) => ({
  body: {
    maxHeight: 230,

    border: 'none',

    fontSize: font.size.small,
    fontFamily: font.family.normal,
  },
}))

export default styled(Mail)



// WEBPACK FOOTER //
// ./packages/cases/src/events/components/Mail.js