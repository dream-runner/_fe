// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { Link } from 'react-router-dom'

import { prependOrg } from '@signavio/effektif-api'

import { List, Divider } from '@signavio/effektif-commons/lib/components'

import type { TaskResultT } from '../../types'

import { activateWithType } from './higher-order'

import Result from './Result'

type PropsT = {
  tasks: Array<TaskResultT>,
  onActivate: (result: TaskResultT) => void,
}

function Tasks({ tasks, onActivate }: PropsT) {
  return (
    <div>
      <Divider title={i18n('Tasks')} />

      <List>
        {tasks.map(task => (
          <Link
            key={task.id}
            to={prependOrg(`/case/${task.caseId}/task/${task.id}`)}
          >
            <Result
              result={task}
              iconSet="signavio"
              icon={task.completed ? 'square-check' : 'square'}
              onActivate={onActivate}
            >
              {task.name}
            </Result>
          </Link>
        ))}
      </List>
    </div>
  )
}

export default activateWithType('task')(Tasks)



// WEBPACK FOOTER //
// ./packages/main/src/components/search/Tasks.js