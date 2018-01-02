// @flow

import React from 'react'
import i18n from 'i18n'
import { groupBy, map } from 'lodash'

import { List, Group } from 'commons-components'
import { Hint } from 'commons-components/hints'
import { defaultStyle, padding } from 'commons-style'

import type { ChangeTypeT, ChangeT } from '../../../types'

import Change from './Change'

type Props = {
  members: {
    [typeKey: string]: Array<ChangeT>,
  },
}

function Members({ members, ...rest }: Props) {
  return (
    <List {...rest}>
      {map(members, (changes: Array<ChangeT>, typeKey: string) => {
        const {
          typeFieldAdded = [],
          typeFieldRemoved = [],
          typeFieldChanged = [],
        } = groupBy(changes, ({ type }: { type: ChangeTypeT }) => type)

        return (
          <Group
            title={i18n('Changed: **__type__**', {
              markdown: true,
              type: typeKey,
            })}
          >
            <div className="row">
              <div className="col-sm-4">
                <ChangeCategory
                  changes={typeFieldRemoved}
                  emptyText={i18n('No fields removed.')}
                />
              </div>

              <div className="col-sm-4">
                <ChangeCategory
                  changes={typeFieldAdded}
                  emptyText={i18n('No fields added.')}
                />
              </div>

              <div className="col-sm-4">
                <ChangeCategory
                  changes={typeFieldChanged}
                  emptyText={i18n('No fields changed.')}
                />
              </div>
            </div>
          </Group>
        )
      })}
    </List>
  )
}

export default defaultStyle({
  '&vertical': {
    entry: {
      marginTop: padding.normal,
    },
  },
})(Members)

type CategoryProps = {
  changes: Array<ChangeT>,

  emptyText: string,
}

function ChangeCategory({ changes, emptyText }: CategoryProps) {
  if (changes.length === 0) {
    return <Hint info>{emptyText}</Hint>
  }

  return (
    <List>
      {changes.map((change: ChangeT) => <Change {...change} />)}
    </List>
  )
}



// WEBPACK FOOTER //
// ./src/services/views/connectors/diffs/Members.js