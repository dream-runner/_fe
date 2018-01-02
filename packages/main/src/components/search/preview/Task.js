// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { Link } from 'react-router-dom'

import { prependOrg } from '@signavio/effektif-api'

import {
  LabeledField,
  userType,
  dateTimeType,
  textType,
} from '@signavio/effektif-fields'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { TextButton } from '@signavio/effektif-commons/lib/components/buttons'

import Preview from './Preview'

type PropsT = {
  id: string,
  caseId: string,
  name: string,
  creatorId: string,
  assigneeId: string,
  lastUpdated: string,
  dueDate: string,
  description: string,
}

function Task({
  id,
  caseId,
  name,
  creatorId,
  assigneeId,
  lastUpdated,
  dueDate,
  description,
  style,
}: PropsT) {
  return (
    <Preview title={name}>
      <LabeledField
        readOnly
        narrowLabel
        label={i18n('Created by')}
        type={userType}
        value={creatorId}
      />

      <LabeledField
        readOnly
        narrowLabel
        label={i18n('Assignee')}
        type={userType}
        value={assigneeId}
      />

      <LabeledField
        readOnly
        narrowLabel
        label={i18n('Due date')}
        type={dateTimeType()}
        value={dueDate}
      />

      <LabeledField
        readOnly
        narrowLabel
        label={i18n('Description')}
        type={textType()}
        value={description}
      />

      <LabeledField
        readOnly
        narrowLabel
        label={i18n('Updated on')}
        type={dateTimeType()}
        value={lastUpdated}
      />

      <Link to={prependOrg(`/case/${caseId}/task/${id}`)}>
        <TextButton light style={style('taskLink')}>
          {i18n('Go to task')}
        </TextButton>
      </Link>
    </Preview>
  )
}

const styled = defaultStyle(({ padding }) => ({
  taskLink: {
    marginTop: padding.large,
    marginLeft: '25%',
  },
}))

export default styled(Task)



// WEBPACK FOOTER //
// ./packages/main/src/components/search/preview/Task.js