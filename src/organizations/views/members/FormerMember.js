import React from 'react'
import i18n from 'signavio-i18n'
import { withHandlers, compose } from 'recompose'

import {
  Collapsible,
  Box,
  List,
} from '@signavio/effektif-commons/lib/components'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'
import { moment } from '@signavio/effektif-commons/lib/extensions'
import {
  IconButton,
  ExpandButton,
} from '@signavio/effektif-commons/lib/components/buttons'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import { userUtils } from '@signavio/effektif-api'
import type { UserT } from '@signavio/effektif-api'

import type { FormerMemberStatsT } from '../../types'

type PropsT = {
  user: UserT,
  stats: FormerMemberStatsT,

  expanded: boolean,

  onToggle: () => void,
  onReplace: () => void,
}

function FormerMember({
  user,
  stats,
  expanded,
  style,
  onToggle,
  onReplace,
}: PropsT) {
  const { workflowCount, taskCount, reportCount, createTime } = stats

  return (
    <Collapsible
      expanded={expanded}
      onToggle={onToggle}
      header={
        <TextTile
          style={style('user')}
          subtitle={user.emailAddress}
          toolbar={
            <List direction="horizontal">
              <IconButton
                iconSet="fontAwesome"
                icon="exchange"
                onClick={onReplace}
              />

              <ExpandButton onToggle={onToggle} expanded={expanded} />
            </List>
          }
        >
          {userUtils.name(user)}
        </TextTile>
      }
    >
      <Box>
        <Box white>
          <p>
            {i18n('Deleted since __deletionDate__', {
              deletionDate: moment(createTime).format('LLL'),
            })}
          </p>

          <ul>
            {workflowCount > 0 && (
              <li>
                {i18n('Owns __count__  workflow', 'Owns __count__ workflows', {
                  count: workflowCount,
                })}
              </li>
            )}

            {taskCount > 0 && (
              <li>
                {i18n(
                  'Assigned to __count__ task',
                  'Assigned to __count__ tasks',
                  {
                    count: taskCount,
                  }
                )}
              </li>
            )}

            {reportCount > 0 && (
              <li>
                {i18n('Created __count__ report', 'Created __count__ reports', {
                  count: reportCount,
                })}
              </li>
            )}
          </ul>
        </Box>
      </Box>
    </Collapsible>
  )
}

export default compose(
  withHandlers({
    onToggle: ({ user, onToggle }) => () => onToggle(user.id),
    onReplace: ({ user, onReplace }) => ev => {
      ev.stopPropagation()

      onReplace(user)
    },
  }),
  defaultStyle(() => ({
    user: {
      ':hover': {
        cursor: 'pointer',
      },
    },
  }))
)(FormerMember)



// WEBPACK FOOTER //
// ./src/organizations/views/members/FormerMember.js