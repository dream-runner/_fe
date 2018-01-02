import React from 'react'
import i18n from 'signavio-i18n'
import { connect, types } from '@signavio/effektif-api'
import {
  Hint,
} from '@signavio/effektif-commons/lib/components/hints'

import { Filter, LabelT } from '../../../../packages/organizations'

type PropsT = {
  fetchLabels: {
    pending: boolean,
    rejected: boolean,
    reason: string,
    value: Array<LabelT>,
  },
}

function LabelFilter({ fetchLabels, ...rest }: PropsT) {
  if (fetchLabels.pending) {
    return <Hint loading>{i18n('Loading labels...')}</Hint>
  }

  if (fetchLabels.rejected) {
    return (
      <Hint danger>
        <p>
          {i18n('There was an error loading the labels: __reason__', {
            reason: fetchLabels.reason,
          })}
        </p>
      </Hint>
    )
  }

  return <Filter labels={fetchLabels.value} {...rest} />
}

export default connect({
  fetchLabels: {
    type: types.LABELS,
  },
})(LabelFilter)



// WEBPACK FOOTER //
// ./src/processes/views/filters/Label.js