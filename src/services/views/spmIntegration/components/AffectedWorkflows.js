// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { compose, withState } from 'recompose'
import i18n from 'signavio-i18n'
import { isEmpty, uniqueId } from 'lodash'

import { connect, prependOrg, types } from '@signavio/effektif-api'
import type { PromiseT, WorkflowT } from '@signavio/effektif-api'

import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import Field, { userType } from '../../../../../packages/fields'
import type { ConnectorT, DescriptorT } from '../../../types'

type ApiPropsT = {
  connector: ConnectorT,
  descriptor: DescriptorT,
}

type PropsT = {
  fetchAffectedWorkflows: PromiseT<WorkflowT>,
} & ApiPropsT

function AffectedWorkflows({ fetchAffectedWorkflows }: PropsT) {
  if (fetchAffectedWorkflows.pending && !fetchAffectedWorkflows.value) {
    return <Hint loading>{i18n('Loading affected workflows...')}</Hint>
  }

  const workflows = fetchAffectedWorkflows.value

  if (isEmpty(workflows)) {
    return (
      <Hint info>{i18n('This category is not being used by workflows.')}</Hint>
    )
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>{i18n('Affected workflows')}</th>
          <th>{i18n('Owner')}</th>
        </tr>
      </thead>
      <tbody>
        {workflows.map(({ id, name, ownerId }: WorkflowT) => (
          <tr>
            <td>
              <Link to={prependOrg(`/process/${id}`)}>{name}</Link>
            </td>
            <td>
              <Field
                readOnly
                transparent
                small
                value={ownerId}
                type={userType}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default compose(
  withState('refresh', '', () => uniqueId('affectedWorkflows')),
  connect(({ connector, descriptor, refresh }) => ({
    fetchAffectedWorkflows: {
      type: types.DICTIONARY_AFFECTED_WORKFLOWS,
      query: {
        connectorId: connector.id,
        descriptorId: descriptor.id,
      },
      refresh,
    },
  }))
)(AffectedWorkflows)



// WEBPACK FOOTER //
// ./src/services/views/spmIntegration/components/AffectedWorkflows.js