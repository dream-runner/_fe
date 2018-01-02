// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { Link } from 'react-router-dom'

import { prependOrg } from '@signavio/effektif-api'

import { LabeledField, userType, dateTimeType } from '@signavio/effektif-fields'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { TextButton } from '@signavio/effektif-commons/lib/components/buttons'

import Preview from './Preview'

type PropsT = {
  id: string,
  name: string,
  creatorId: string,
  createTime: string,
  closeTime: string,
}

function Case({ id, name, createTime, closeTime, creatorId, style }: PropsT) {
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
        value={createTime}
      />

      <LabeledField
        readOnly
        narrowLabel
        label={i18n('Closed on')}
        type={dateTimeType()}
        value={closeTime}
      />

      <Link to={prependOrg(`/case/${id}`)}>
        <TextButton light style={style('caseLink')}>
          {i18n('Go to case')}
        </TextButton>
      </Link>
    </Preview>
  )
}

const styled = defaultStyle(({ padding }) => ({
  caseLink: {
    marginTop: padding.large,
    marginLeft: '25%',
  },
}))

export default styled(Case)



// WEBPACK FOOTER //
// ./packages/main/src/components/search/preview/Case.js