// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import { Disable, Divider } from '@signavio/effektif-commons/lib/components'

import type { OrganizationT } from '@signavio/effektif-api'
import { withOrganization } from '@signavio/effektif-api'

import { CaseStartLink } from '../components'
import FormTrigger from './FormTriggerView'

type ApiPropsT = {
  model: any,
  readOnly: boolean,
}

type PropsT = {
  organization: OrganizationT,
} & ApiPropsT

const PublicFormTrigger = ({ organization, model, ...rest }: PropsT) => {
  const workflow = model.getProcess()
  const formUrl = `${window.location.protocol}//${window.location
    .host}/${organization.key}/workflows/${workflow.id}/startInfo/public`

  return (
    <div>
      <Divider padding="large" />

      <Disable
        disabled={!workflow.isPublished()}
        hint={i18n('You can use this once you publish this workflow.')}
      >
        <CaseStartLink url={formUrl} />
      </Disable>

      <Divider padding="large" />

      <FormTrigger publicForm model={model} {...rest} />
    </div>
  )
}

export default withOrganization(PublicFormTrigger)



// WEBPACK FOOTER //
// ./src/activities/views/triggers/PublicFormTrigger.js