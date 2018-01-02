// @flow
import PropTypes from 'prop-types'
import { withContext } from 'recompose'

import Effektif from 'singleton/Effektif'
import Login from 'singleton/Login'

import {
  UserType,
  OrganizationType,
  UserT,
  OrganizationT,
} from '@signavio/effektif-api'

export default withContext(
  {
    features: PropTypes.arrayOf(PropTypes.string),
    user: UserType,
    organization: OrganizationType,

    token: PropTypes.string,
  },
  () => ({
    features: (Effektif.list('features') || []).map(feature =>
      feature.get('key')
    ),
    user: Login.user(),
    organization: Login.getActiveOrganization(),
    token: Login.token(),
  })
)



// WEBPACK FOOTER //
// ./packages/main/src/components/higher-order/withAuthentication.js