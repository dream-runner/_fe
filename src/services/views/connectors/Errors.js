import React from 'react'
import i18n from 'i18n'
import moment from '@signavio/effektif-commons/lib/extensions/moment'

import { Divider } from 'commons-components'
import { defaultStyle, padding } from 'commons-style'

import { ErrorT } from '../../types'

type PropsT = {
  errors: Array<ErrorT>,
}

function Errors({ errors = [], ...rest }: PropsT) {
  if (errors.length === 0) {
    return null
  }

  return (
    <div {...rest.style}>
      <Divider
        style={rest.style('divider')}
        title={i18n(
          'The system is reporting the following errors for this connector'
        )}
      />

      {errors.map(error =>
        <table className="table">
          <tbody>
            <tr>
              <th>{i18n('Time')}</th>
              <td>{moment(error.time).format('LLL')}</td>
            </tr>
            <tr>
              <th>{i18n('Request')}</th>
              <td>{error.request}</td>
            </tr>
            <tr>
              <th>{i18n('Message')}</th>
              <td>{error.errorMessage}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}

export default defaultStyle(theme => ({
  marginTop: padding.large,

  divider: {
    title: {
      color: theme.color.status.danger,
    },
  },
}))(Errors)



// WEBPACK FOOTER //
// ./src/services/views/connectors/Errors.js