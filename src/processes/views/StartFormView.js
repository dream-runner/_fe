// @flow
import i18n from 'signavio-i18n'
import React from 'react'
import { get, uniqueId } from 'lodash'
import { compose, withState, withHandlers } from 'recompose'
import { withRouter } from 'react-router'

import {
  Markdown,
  Divider,
  DocumentTitle,
} from '@signavio/effektif-commons/lib/components'
import { Hint, Alert } from '@signavio/effektif-commons/lib/components/hints'
import {
  connect,
  types,
  fulfillRequestThen,
  requestRejectedThen,
  prependOrg,
} from '@signavio/effektif-api'

import { Form, applyDefaultValues } from '../../../packages/forms'
import { getRights } from '../../../packages/access'
import type { CaseT } from '../../../packages/cases'
import type { FieldT } from '../../../packages/fields'
import type { FormT } from '../../../packages/forms'
import type { PromiseT } from '@signavio/effektif-api'

import FeedbackMessage from './FeedbackMessage'

type StartFormT = {
  description: string,
  form: FormT,
}

type ApiPropsT = {
  sourceWorkflowId: string,
  defaultFields: Array<FieldT>,
}

type PropsT = {
  createCase: PromiseT<CaseT>,
  errorMessage?: string,
  fetchStartInfo: PromiseT<StartFormT>,
  fields: Array<FieldT>,
  onFieldsChange: (fields: Array<FieldT>) => void,
  onProcessStart: () => void,
  onAcknowledgeNoForm: () => void,
  uniqueRequestId: string,
  updateStartInfo: PromiseT<StartFormT>,
  setErrorMessage: (errorMessage: string) => void,
  setFields: (fields: Array<FieldT>) => void,
  history: Object,
} & ApiPropsT

function StartFormView({
  sourceWorkflowId,
  fetchStartInfo,
  createCase,
  defaultFields,
  errorMessage,
  fields,
  onFieldsChange,
  onProcessStart,
  onAcknowledgeNoForm,
}: PropsT) {
  if (fetchStartInfo.rejected) {
    return (
      <Hint danger view>
        {fetchStartInfo.reason}
      </Hint>
    )
  }

  if (fetchStartInfo.pending || !fetchStartInfo.value) {
    return (
      <Hint loading view>
        {i18n('Loading process information...')}
      </Hint>
    )
  }

  if (createCase.pending) {
    return (
      <Hint loading view>
        {i18n('Starting your process...')}
      </Hint>
    )
  }

  const startInfo = fetchStartInfo.value

  return (
    <div className="view">
      <DocumentTitle title={i18n('New Case')} />

      <div className="row">
        <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
          {createCase.fulfilled ? (
            <FeedbackMessage
              workflowId={sourceWorkflowId}
              caseId={createCase.value.id}
            >
              {createCase.value.caseCreatedMessage}
            </FeedbackMessage>
          ) : (
            <div className="view-content">
              {startInfo.description && (
                <div>
                  <Markdown>{startInfo.description}</Markdown>

                  <Divider padding="normal" />
                </div>
              )}

              {errorMessage && <Hint danger>{errorMessage}</Hint>}

              {startInfo.form ? (
                <Form
                  defaultFields={defaultFields}
                  fields={fields}
                  onSubmit={onProcessStart}
                  onChange={onFieldsChange}
                  submitText={i18n('Start new case')}
                />
              ) : (
                <Alert onDismiss={onAcknowledgeNoForm}>
                  {i18n(
                    "We couldn't find a form. Please make sure that you have the correct organization selected."
                  )}
                </Alert>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default compose(
  withState('uniqueRequestId', 'setUniqueRequestId', () =>
    uniqueId('startInfo')
  ),
  connect(({ sourceWorkflowId, uniqueRequestId }: PropsT) => ({
    fetchStartInfo: {
      type: types.START_INFO,
      id: sourceWorkflowId,
      refresh: uniqueRequestId,
    },
    updateStartInfo: {
      type: types.START_INFO,
      method: 'update',
      id: sourceWorkflowId,
    },
    createCase: {
      type: types.CASE,
      method: 'create',
      query: {
        sourceWorkflowId,
      },
    },
  })),
  withRouter,
  withState('defaultFields', 'setDefaultFields', []),
  withState('fields', 'setFields', []),
  withState('errorMessage', 'setErrorMessage'),
  withHandlers({
    onFieldsChange: ({ updateStartInfo }: PropsT) => (fields: Array<FieldT>) =>
      updateStartInfo({ fields }),
    onProcessStart: ({ createCase, fields, sourceWorkflowId }: PropsT) => () =>
      createCase({ sourceWorkflowId, fields }),
    onAcknowledgeNoForm: ({ history }: PropsT) => () =>
      history.replace(prependOrg('/processes')),
  }),
  fulfillRequestThen({
    fetchStartInfo: ({
      defaultFields,
      setDefaultFields,
      setFields,
      fetchStartInfo,
      defaultValues,
      onFieldsChange,
    }: PropsT) => {
      if (defaultFields.length > 0) {
        return
      }

      const fields = get(fetchStartInfo.value, 'form.fields', [])

      setDefaultFields(applyDefaultValues(fields, defaultValues))
      setFields(fields)

      if (defaultValues) {
        onFieldsChange(applyDefaultValues(fields, defaultValues))
      }
    },
    updateStartInfo: ({ updateStartInfo, setFields }: PropsT) =>
      setFields(updateStartInfo.value.form.fields),
    createCase: ({ createCase, history }: PropsT) => {
      if (createCase.value.caseCreatedMessage) {
        return
      }

      const rights = getRights(createCase.value.access, 'view')

      if (rights.view) {
        history.replace(prependOrg(`/case/${createCase.value.id}`))
      } else {
        history.replace(prependOrg('/processes'))
      }
    },
  }),
  requestRejectedThen({
    updateStartInfo: ({ setErrorMessage, updateStartInfo }: PropsT) =>
      setErrorMessage(updateStartInfo.reason),
  })
)(StartFormView)



// WEBPACK FOOTER //
// ./src/processes/views/StartFormView.js