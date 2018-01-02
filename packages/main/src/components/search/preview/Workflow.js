// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { Link } from 'react-router-dom'

import { prependOrg } from '@signavio/effektif-api'

import { LabeledField, userType, textType } from '@signavio/effektif-fields'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { List } from '@signavio/effektif-commons/lib/components'
import { TextButton } from '@signavio/effektif-commons/lib/components/buttons'
import { Label } from '@signavio/workflow-organizations'

import Preview from './Preview'

type PropsT = {
  id: string,
  name: string,
  ownerId: string,
  description: string,
  labelIds: Array<string>,
  published: boolean,
}

function Workflow({
  id,
  name,
  ownerId,
  description,
  style,
  labelIds,
  published,
}: PropsT) {
  return (
    <Preview title={name}>
      <div {...style('labels')}>
        {labelIds &&
          labelIds.map((labelId: string) => (
            <Label small key={labelId} value={labelId} style={style('label')} />
          ))}
      </div>
      <LabeledField
        readOnly
        narrowLabel
        label={i18n('Owner')}
        type={userType}
        value={ownerId}
      />

      <LabeledField
        readOnly
        narrowLabel
        label={i18n('Description')}
        type={textType()}
        value={description}
      />

      <List direction="horizontal" style={style('list')}>
        <Link to={prependOrg(`/process/${id}`)}>
          <TextButton light>{i18n('Go to Process')}</TextButton>
        </Link>

        {published && (
          <Link to={prependOrg(`/process/${id}/start`)}>
            <TextButton light style={style('startNewCase')}>
              {i18n('Start new case')}
            </TextButton>
          </Link>
        )}
      </List>
    </Preview>
  )
}

const styled = defaultStyle(({ padding }) => ({
  labels: {
    marginTop: -padding.large,
    marginBottom: padding.large,
  },
  list: {
    marginTop: padding.large,
    marginLeft: '25%',
  },
  label: {
    marginTop: padding.xsmall,
    marginRight: padding.xsmall,
    marginBottom: padding.small,
  },
  startNewCase: {
    marginLeft: '10%',
  },
}))

export default styled(Workflow)



// WEBPACK FOOTER //
// ./packages/main/src/components/search/preview/Workflow.js