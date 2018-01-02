import PropTypes from 'prop-types'
import i18n from 'i18n'

import { Hint } from 'commons-components/hints'
import { Logs } from 'commons-components/logs'

export default function SynchronisationResult({ loading, result }) {
  if (loading) {
    return (
      <Hint loading>
        {i18n('Synchronizing users and groups')}
      </Hint>
    )
  }

  return (
    <div>
      {result.success
        ? <Hint info>
            {i18n('The sychronization was successful')}
          </Hint>
        : <Hint warning>
            {i18n('The sychronization was not successful')}
          </Hint>}

      <Stats {...result} />

      <Logs logs={result.logs} />
    </div>
  )
}

SynchronisationResult.propTypes = {
  result: PropTypes.shape({
    success: PropTypes.bool,
    logs: PropTypes.array,
    addedUsers: PropTypes.number,
    updatedUsers: PropTypes.number,
    removedUsers: PropTypes.number,
    addedGroups: PropTypes.number,
    updatedGroups: PropTypes.number,
    removedGroups: PropTypes.number,
  }),
  loading: PropTypes.bool,
}

function Stats({
  addedUsers,
  updatedUsers,
  removedUsers,
  usersWithoutLicense,
  addedGroups,
  updatedGroups,
  removedGroups,
}) {
  return (
    <table className="table table-striped">
      <tbody>
        <tr>
          <td>{i18n('Added users')}</td>
          <td>{addedUsers}</td>
        </tr>
        <tr>
          <td>{i18n('Updated users')}</td>
          <td>{updatedUsers}</td>
        </tr>
        <tr>
          <td>{i18n('Removed users')}</td>
          <td>{removedUsers}</td>
        </tr>
        <tr>
          <td>{i18n('Users without license')}</td>
          <td>{usersWithoutLicense}</td>
        </tr>
        <tr>
          <td>{i18n('Added groups')}</td>
          <td>{addedGroups}</td>
        </tr>
        <tr>
          <td>{i18n('Updated groups')}</td>
          <td>{updatedGroups}</td>
        </tr>
        <tr>
          <td>{i18n('Removed groups')}</td>
          <td>{removedGroups}</td>
        </tr>
      </tbody>
    </table>
  )
}



// WEBPACK FOOTER //
// ./src/organizations/views/ldap/SynchronisationResult.js