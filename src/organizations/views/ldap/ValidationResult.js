import PropTypes from 'prop-types'
import i18n from 'i18n'

import { Hint } from 'commons-components/hints'
import { Logs } from 'commons-components/logs'

/**
 * Renders the result of an LDAP configuration validation.
 * The result consists mainly of log entries which are shown in a tabbed list.
 */
export default function ValidationResult({ loading, result }) {
  if (loading) {
    return (
      <Hint loading>
        {i18n('Validating configuration')}
      </Hint>
    )
  }

  return (
    <div>
      {result.valid
        ? <Hint info>
            {i18n('The configuration is valid')}
          </Hint>
        : <Hint warning>
            {i18n('The configuration is not valid')}
          </Hint>}

      <Logs logs={result.logs} />
    </div>
  )
}

ValidationResult.propTypes = {
  result: PropTypes.shape({
    logs: PropTypes.array, // the actual list of log entries to show
    valid: PropTypes.bool, // indicates whether the validated object is valid
  }),
  loading: PropTypes.bool, // indicates the results are being fetched right now
}



// WEBPACK FOOTER //
// ./src/organizations/views/ldap/ValidationResult.js