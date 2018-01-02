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
  name: string,
  creatorId: string,
  created: string,
}

function Report({ id, name, creatorId, created, style }: PropsT) {
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
        label={i18n('Created on')}
        type={dateTimeType()}
        value={created}
      />

      <LabeledField
        readOnly
        narrowLabel
        label={i18n('Report name')}
        type={textType()}
        value={name}
      />

      <Link to={prependOrg(`/analytics/report/${id}`)}>
        <TextButton light style={style('reportLink')}>
          {i18n('Go to report')}
        </TextButton>
      </Link>
    </Preview>
  )
}

const styled = defaultStyle(({ padding }) => ({
  reportLink: {
    marginTop: padding.large,
    marginLeft: '25%',
  },
}))

export default styled(Report)



// WEBPACK FOOTER //
// ./packages/main/src/components/search/preview/Report.js