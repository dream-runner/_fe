// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { Link } from 'react-router-dom'

import { prependOrg } from '@signavio/effektif-api'

import { List, Divider } from '@signavio/effektif-commons/lib/components'

import type { WorkflowResultT } from '../../types'

import { activateWithType } from './higher-order'

import Result from './Result'

type PropsT = {
  workflows: Array<WorkflowResultT>,
  onActivate: (result: WorkflowResultT) => void,
}

function Workflows({ workflows, onActivate }: PropsT) {
  return (
    <div>
      <Divider title={i18n('Processes')} />

      <List>
        {workflows.map((workflow: WorkflowResultT) => (
          <Link key={workflow.id} to={prependOrg(`/process/${workflow.id}`)}>
            <Result result={workflow} icon="list" onActivate={onActivate}>
              {workflow.name}
            </Result>
          </Link>
        ))}
      </List>
    </div>
  )
}

export default activateWithType('workflow')(Workflows)



// WEBPACK FOOTER //
// ./packages/main/src/components/search/Workflows.js