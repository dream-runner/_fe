// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { map } from 'lodash'
import { compose } from 'recompose'
import { connect, types } from '@signavio/effektif-api'
import { List } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'
import { LicenseUtils } from 'organizations/utils'
import Router from 'singleton/Router'

import AuthQuery from '../../models/params/AuthQuery'

type Props = {
  fetchLicenses: () => void,
}

function Licenses({ fetchLicenses, model }: Props) {
  if (fetchLicenses.pending) {
    return <Hint loading>{i18n('Loading license information...')}</Hint>
  }

  if (fetchLicenses.rejected) {
    return (
      <Hint danger>
        {i18n('Could not fetch licenses:\n__message__', {
          message: fetchLicenses.reason,
        })}
      </Hint>
    )
  }

  return (
    <List>
      {fetchLicenses.fulfilled &&
        map(fetchLicenses.value, license => {
          const { cid, isGenerator, used, unused, number, type } = license

          return (
            <TextTile
              key={cid}
              subtitle={
                !isGenerator &&
                i18n(
                  'Used: __used__ — Available: __available__ — Total: __total__',
                  {
                    used,
                    available: unused,
                    total: number,
                  }
                )
              }
              icon={isGenerator ? 'cube' : 'license'}
            >
              <a
                href={Router.reverse('admin_auth', {
                  tab: isGenerator ? 'generators' : 'licenses',
                  query: new AuthQuery({
                    organization: model,
                    type,
                  }).toString(),
                })}
              >
                {LicenseUtils.getTitle(type)}
              </a>
            </TextTile>
          )
        })}
    </List>
  )
}

export default compose(
  connect(({ organizationId }) => ({
    fetchLicenses: {
      type: types.LICENSES,
      query: { id: organizationId, admin: true },
    },
  }))
)(Licenses)



// WEBPACK FOOTER //
// ./src/admin/views/organizations/Licenses.js