// @flow

import React from 'react'
import i18n from 'i18n'
import { groupBy, includes } from 'lodash'

import { Group } from 'commons-components'
import { Hint } from 'commons-components/hints'
import { padding } from 'commons-style'

import type { ConnectorT, ChangeT } from '../../../types'

import Change from './Change'
import Members from './Members'

type Props = {
  connector: ConnectorT,
  changes: Array<ChangeT>,
}

export default function Diff({ connector, changes }: Props) {
  if (changes.length === 0) {
    return (
      <Hint view>
        {i18n('No recent changes to show.')}
      </Hint>
    )
  }

  const {
    typeAdded = [],
    typeRemoved = [],
    member = [],
  } = groupBy(changes, ({ type }) => {
    if (includes(['typeAdded', 'typeRemoved'], type)) {
      return type
    }

    return 'member'
  })

  const members = groupBy(member, ({ typeKey }) => typeKey)

  return (
    <div>
      <div className="row">
        <div className="col-sm-6">
          <Group title={i18n('Types added')}>
            {typeAdded.map((change: ChangeT) => <Change {...change} />)}
          </Group>
        </div>
        <div className="col-sm-6">
          <Group title={i18n('Types removed')}>
            {typeRemoved.map((change: ChangeT) => <Change {...change} />)}
          </Group>
        </div>
      </div>

      <Members style={{ marginTop: padding.large }} members={members} />
    </div>
  )
}



// WEBPACK FOOTER //
// ./src/services/views/connectors/diffs/Diff.js