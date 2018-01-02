// @flow

import React from 'react'

import i18n from 'signavio-i18n'
import { Clearfix } from '@signavio/effektif-commons/lib/components'

import WorkflowMan from './WorkflowMan'

export default function NotFound() {
  return (
    <div style={{ marginTop: 100 }}>
      <WorkflowMan style={{ float: 'left' }} />

      <div style={{ paddingTop: 100, marginLeft: 450 }}>
        <h1 style={{ marginBottom: 30 }}>{i18n('Oooops a 404')}</h1>

        <p>
          {i18n(
            "It seems you have managed to find a page that we didn't think of yet."
          )}
        </p>

        <p>
          {i18n(
            'If you think there should be something here, please tell our [support team](mailto:support@signavio.com).',
            {
              markdown: true,
            }
          )}
        </p>

        <h3 style={{ marginTop: 50, marginBottom: 30 }}>
          {i18n('Things you could do in between:')}
        </h3>

        <ul>
          <li>
            {i18n(
              'Read a bit in our [user manual](https://docs.signavio.com/userguide/workflow)',
              { markdown: true }
            )}
          </li>
          <li>
            {i18n(
              'Watch some of our [videos](https://www.youtube.com/user/signavio)',
              { markdown: true }
            )}
          </li>
          <li>
            {i18n('Consider [working with us](http://www.signavio.com/jobs/)', {
              markdown: true,
            })}
          </li>
        </ul>
      </div>

      <Clearfix />
    </div>
  )
}



// WEBPACK FOOTER //
// ./packages/main/src/components/NotFound.js