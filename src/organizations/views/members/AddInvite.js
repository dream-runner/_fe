// @flow

import React from 'react'
import { compose, lifecycle, withState, withHandlers } from 'recompose'
import i18n from 'signavio-i18n'
import { isEmpty } from 'lodash'

import { StringUtils } from '@signavio/effektif-commons/lib/utils'
import {
  Divider,
  InputWithButton,
} from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import { getUnusedLicenses, getCompositeId } from '../../utils/LicenseUtil'

import type { LicenseT, InviteT } from '../../types'

import { LicenseChoice } from '../license'

type Props = {
  licenses: Array<LicenseT>,

  licenseInfo: string,

  onInvite: (invite: InviteT) => void,
  onValidate: (invite: InviteT) => boolean,
}

function AddInvite(props: Props) {
  const {
    licenses,
    licenseInfo,
    onValidate,
    onInvite,
    onLicenseInfoChange,
  } = props

  if (!hasLicenseOptions(licenses)) {
    return (
      <Hint warning>
        {i18n("You don't have sufficient licenses to invite more users.")}
      </Hint>
    )
  }

  return (
    <div>
      <Divider title={i18n('Invite a colleague')} />

      <LicenseChoice
        licenses={licenses}
        value={licenseInfo}
        onChange={onLicenseInfoChange}
      />

      <Divider />

      <InputWithButton
        clearOnSubmit
        type="email"
        border="none"
        placeholder={i18n('Enter an email address to invite a new user')}
        buttonLabel={i18n('Invite')}
        validate={onValidate}
        disabled={!hasLicenseOptions(licenses)}
        onSubmit={onInvite}
      />
    </div>
  )
}

const hasLicenseOptions = (licenses: Array<LicenseT>): boolean =>
  getUnusedLicenses(licenses).length > 0
const getDefaultLicense = (licenses: Array<LicenseT>): string => {
  const unusedLicenses = getUnusedLicenses(licenses)

  if (unusedLicenses.length > 0) {
    return getCompositeId(unusedLicenses[0])
  }

  return ''
}

export default compose(
  withState('licenseInfo', 'setLicense', ({ licenses }) =>
    getDefaultLicense(licenses)
  ),
  withHandlers({
    onInvite: ({ licenseInfo, onInvite, toggleValid }) => (
      emailAddress: string
    ) => onInvite({ emailAddress, licenseInfo }),
    onValidate: ({ licenseInfo, onValidate }) => (emailAddress: string) => {
      if (!StringUtils.validateEmail(emailAddress)) {
        return false
      }

      if (!onValidate) {
        return true
      }

      return onValidate({ emailAddress, licenseInfo })
    },
    onLicenseInfoChange: ({ setLicense }) => license => setLicense(license),
  }),
  lifecycle({
    componentWillReceiveProps({ licenses }) {
      if (isEmpty(this.props.licenses) && !isEmpty(licenses)) {
        this.props.setLicense(getDefaultLicense(licenses))
      }
    },
  })
)(AddInvite)



// WEBPACK FOOTER //
// ./src/organizations/views/members/AddInvite.js