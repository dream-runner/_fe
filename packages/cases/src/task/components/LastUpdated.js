// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import { moment } from '@signavio/effektif-commons/lib/extensions'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'
import { LinkButton } from '@signavio/effektif-commons/lib/components/buttons'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

type ApiPropsT = {
  lastUpdated: string,
  onRefreshTasks: () => void,
  pending?: boolean,
}

function LastUpdated({
  lastUpdated,
  onRefreshTasks,
  pending,
  style,
}: ApiPropsT) {
  return (
    <div {...style}>
      <TextTile
        small
        transparent
        toolbar={
          !pending && (
            <LinkButton small onClick={onRefreshTasks}>
              {i18n('Refresh')}
            </LinkButton>
          )
        }
      >
        {pending ? (
          <Hint inline loading small>
            {i18n('Looking for new tasks...')}
          </Hint>
        ) : (
          i18n('Last updated at __lastUpdated__.', {
            lastUpdated: moment(lastUpdated).format('LTS'),
          })
        )}
      </TextTile>
    </div>
  )
}

const styled = defaultStyle(({ font, padding, color }) => ({
  display: 'inline-block',

  fontSize: font.size.form,
  color: color.mono.dark,
}))

export default styled(LastUpdated)



// WEBPACK FOOTER //
// ./packages/cases/src/task/components/LastUpdated.js