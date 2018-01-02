// @flow
import React from 'react'
import { withHandlers } from 'recompose'

import i18n from 'signavio-i18n'

import { List } from '@signavio/effektif-commons/lib/components'

import { LabeledField } from '../../../../packages/fields'
import { LanguageSelect } from '../../../../packages/organizations'

import type { LicenseT } from '../../types'

import ConfigurationField from './ConfigurationField'
import LicenseConfiguration from './LicenseConfiguration'

type ConfigurationT = {
  url: string,
  username: string,
  password: string,
  userGroupDn: string,
  adminGroupDn: string,
  groupGroupDn: string,
  defaultLanguage: string,

  licenseInfo: LicenseT,

  valid: boolean,
}

type ChangeFn = (value: string) => void

type PropsT = {
  configuration: ConfigurationT,

  licenses: Array<LicenseT>,

  readOnly: boolean,

  onUrlChange: ChangeFn,
  onUserNameChange: ChangeFn,
  onPasswordChange: ChangeFn,
  onUserGroupChange: ChangeFn,
  onAdminGroupChange: ChangeFn,
  onGroupGroupChange: ChangeFn,
  onDefaultLanguageChange: ChangeFn,

  onLicenseInfoChange: (license: LicenseT) => void,
}

function ConfigurationForm(props: PropsT) {
  const {
    configuration,
    licenses,
    readOnly,
    onUrlChange,
    onUserNameChange,
    onPasswordChange,
    onUserGroupChange,
    onAdminGroupChange,
    onGroupGroupChange,
    onDefaultLanguageChange,
    onLicenseInfoChange,
  } = props

  return (
    <List>
      <ConfigurationField
        label={i18n('URL')}
        description={i18n(
          'The location of the directory service, e.g.\n\n- `ldap://mydomain.com:389`'
        )}
        value={configuration.url}
        onChange={onUrlChange}
      />

      <ConfigurationField
        label={i18n('Username')}
        description={i18n(
          'Name of the user accessing the directory service, e.g. \n\n- `CN=LdapUser,OU=MyUsers,DC=mydomain,DC=com` or\n- `ldapuser@mydomain.com`.'
        )}
        value={configuration.username}
        onChange={onUserNameChange}
      />

      <ConfigurationField
        isPassword
        label={i18n('Password')}
        value={configuration.password}
        onChange={onPasswordChange}
      />

      <ConfigurationField
        label={i18n('User group DN')}
        description={i18n(
          'The distinguished name of the directory group whose members should be users in your organization, e.g.\n\n- `CN=WorkflowUsers,DC=mydomain,DC=com`'
        )}
        value={configuration.userGroupDn}
        onChange={onUserGroupChange}
      />

      <ConfigurationField
        label={i18n('Admin group DN')}
        description={i18n(
          'The distinguished name of the directory group whose members should be admins in your organization, e.g.\n\n- `CN=WorkflowAdmins,DC=mydomain,DC=com`\n\nAdmin users have to be part of the user group as well.'
        )}
        value={configuration.adminGroupDn}
        onChange={onAdminGroupChange}
      />

      <ConfigurationField
        label={i18n('Group group DN')}
        description={i18n(
          'The distinguished name of the directory group whose members should be groups in your organization, e.g.\n\n- `CN=WorkflowGroups,DC=mydomain,DC=com`'
        )}
        value={configuration.groupGroupDn}
        onChange={onGroupGroupChange}
      />

      <LanguageSelect
        label={i18n('Language')}
        description={i18n(
          'Defines the default user language for every new user.'
        )}
        value={configuration.defaultLanguage}
        onChange={onDefaultLanguageChange}
      />

      <LicenseConfiguration
        readOnly={readOnly}
        licenses={licenses}
        value={configuration.licenseInfo}
        onChange={onLicenseInfoChange}
      />

      <LabeledField
        readOnly
        label={i18n('Configuration is valid')}
        type={{ name: 'boolean' }}
        value={configuration.valid}
      />
    </List>
  )
}

type ApiPropsT = PropsT & {
  onChange: (configuration: ConfigurationT) => void,
}

const createChangeHandler = (key: string) => ({
  configuration,
  onChange,
}: ApiPropsT) => (value: string) => onChange({ ...configuration, [key]: value })

const enhance = withHandlers({
  onUrlChange: createChangeHandler('url'),
  onUserNameChange: createChangeHandler('username'),
  onPasswordChange: createChangeHandler('password'),
  onUserGroupChange: createChangeHandler('userGroupDn'),
  onAdminGroupChange: createChangeHandler('adminGroupDn'),
  onGroupGroupChange: createChangeHandler('groupGroupDn'),
  onDefaultLanguageChange: createChangeHandler('defaultLanguage'),
  onLicenseInfoChange: createChangeHandler('licenseInfo'),
})

export default enhance(ConfigurationForm)



// WEBPACK FOOTER //
// ./src/organizations/views/ldap/ConfigurationForm.js