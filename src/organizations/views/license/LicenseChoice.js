// @flow

import React from 'react'
import { some } from 'lodash'

import i18n from 'signavio-i18n'

import { moment } from '@signavio/effektif-commons/lib/extensions'
import {
  RadioGroup,
  RadioOption,
} from '@signavio/effektif-commons/lib/components'
import { withLabel } from '@signavio/effektif-commons/lib/components/forms'

import type { LicenseT } from '../../types'
import { LicenseUtils } from '../../utils'

type Props = {
  licenses: Array<LicenseT>,

  value: LicenseT | string,

  onChange?: (license: LicenseT | string, compositeId: string) => void,
}

/**
 * Shows a radio group with different license info objects.
 * This component should be used wherever a user has to pick a valid license.
 */
function LicenseChoice({ value, licenses, onChange, ...rest }: Props) {
  if (typeof value === 'object') {
    // if value is a license info object convert it to a composite ID
    value = LicenseUtils.getCompositeId(value)
  }

  const options = getLicenseOptions(licenses)
  const isValidValue = some(options, ({ id }) => id === value)

  return (
    <RadioGroup
      {...rest}
      value={isValidValue ? value : ''}
      onChange={(value, option) => {
        if (!onChange) {
          return
        }

        onChange(value, LicenseUtils.parseCompositeId(value))
      }}
    >
      {options.map(option =>
        <RadioOption
          key={option.id}
          value={option.id}
          subtitle={option.subtitle}
        >
          {option.title}
        </RadioOption>
      )}
    </RadioGroup>
  )
}

const getCount = license =>
  license.isGenerator
    ? i18n('unlimited')
    : license.unused || (license.unused == 0 ? 0 : 1)

const getLicenseOptions = licenses =>
  LicenseUtils.filterUnusedInfos(licenses).map(license => ({
    id: LicenseUtils.getCompositeId(license),
    title: LicenseUtils.getTitle(license.type) || license.type,
    subtitle: license.expirationDate
      ? i18n(
          'Available: __count__ — Expires on: __date__',
          'Available: __count__ — Expire on: __date__',
          {
            count: getCount(license),
            date: license.expirationDate
              ? moment(license.expirationDate).format('LL')
              : '',
          }
        )
      : i18n('Available: __count__', {
          count: getCount(license),
        }),
  }))

export default withLabel(LicenseChoice)



// WEBPACK FOOTER //
// ./src/organizations/views/license/LicenseChoice.js