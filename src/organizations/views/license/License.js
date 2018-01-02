// @flow
import React from 'react'
import { compose } from 'recompose'

import i18n from 'signavio-i18n'

import moment from '@signavio/effektif-commons/lib/extensions/moment'

import { Popover } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { defaultStyle, variables } from '@signavio/effektif-commons/lib/styles'
import { withLabel } from '@signavio/effektif-commons/lib/components/forms'

import type { LicenseT } from '../../types'
import { LicenseUtils } from '../../utils'

type Props = {
  license: LicenseT,
}

function License({ license, style, ...rest }: Props) {
  if (!license) {
    return (
      <Hint {...rest} inline>
        {i18n('License has expired.')}
      </Hint>
    )
  }

  return (
    <Popover
      placement="top"
      popover={
        license.expirationDate
          ? i18n('The license expires on __date__.', {
              date: moment(license.expirationDate).format('LL'),
            })
          : i18n('The license will not expire.')
      }
    >
      <div {...rest} {...style}>
        {LicenseUtils.getTitle(license.type)}
      </div>
    </Popover>
  )
}

export default compose(
  withLabel,
  defaultStyle(() => ({
    lineHeight: `${variables.lineHeight.block}px`,
  }))
)(License)



// WEBPACK FOOTER //
// ./src/organizations/views/license/License.js