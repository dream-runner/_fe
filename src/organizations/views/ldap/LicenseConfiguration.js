// @flow
import React from 'react'
import { withHandlers } from 'recompose'

import i18n from 'signavio-i18n'

import type { LicenseT } from '../../types'
import { LicenseUtils } from '../../utils'

import { LicenseChoice } from '../license'

type PropsT = {
  readOnly: boolean,

  licenses: Array<LicenseT>,

  value: LicenseT,

  onChange: (license: LicenseT) => void,
}

function LicenseConfiguration({ readOnly, licenses, value, onChange }: PropsT) {
  return (
    <LicenseChoice
      label={i18n('License')}
      description={i18n(
        'Select the license which will be assigned to every user.'
      )}
      licenses={licenses}
      readOnly={readOnly}
      value={value}
      onChange={onChange}
    />
  )
}

const enhance = withHandlers({
  onChange: ({ value, onChange }: PropsT) => (compositeId, licenseInfo) => {
    if (!onChange || LicenseUtils.licenseInfoMatches(value, licenseInfo)) {
      return
    }

    onChange(licenseInfo)
  },
})

export default enhance(LicenseConfiguration)



// WEBPACK FOOTER //
// ./src/organizations/views/ldap/LicenseConfiguration.js