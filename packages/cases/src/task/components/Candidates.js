// @flow
import React from 'react'
import { omit } from 'lodash'
import i18n from 'signavio-i18n'

import {
  Popover,
  ColumnList,
  Icon,
} from '@signavio/effektif-commons/lib/components'
import {
  variables,
  defaultStyle,
  utils,
} from '@signavio/effektif-commons/lib/styles'
import { userUtils } from '@signavio/effektif-api'
import { Avatar, UserTile } from '@signavio/workflow-organizations'

import type { UserT } from '@signavio/effektif-api'

import { name } from '../utils'

import Candidate from './Candidate'

type PropsT = {
  users: Array<UserT>,
  totalCount: number,

  spread: boolean,
  small: boolean,
  disabled: boolean,
  condensed: boolean,
  circularAvatars?: boolean,

  showDelay: number,

  className: string,
}

function Candidates(props: PropsT) {
  const {
    circularAvatars,
    users,
    totalCount = 0,
    disabled,
    showDelay,
    small = false,
    style,
    ...rest
  } = props
  const visibleCount = getVisibleCandidatesCount(users)
  const hasMoreUsers = users.length < totalCount

  return (
    <div key="base" {...omit(rest, 'condensed')} {...style}>
      {users.slice(0, visibleCount).map((candidate: UserT) => (
        <div {...style('candidateWrapper')} key={candidate.id}>
          <Candidate
            {...style('candidate')}
            small={small}
            candidate={candidate}
            circular={circularAvatars}
            disabled={disabled}
            showDelay={showDelay}
          />
        </div>
      ))}

      {users.length > 3 && (
        <div {...style('candidateWrapper')}>
          <Popover
            placement="right"
            small={small}
            popover={
              <div>
                <ColumnList chunkLength={5}>
                  {users.map((candidate: UserT) => (
                    <UserTile
                      style={{ backgroundColor: null }}
                      key={candidate.id}
                      user={candidate}
                      small={small}
                      circular={circularAvatars}
                    >
                      {userUtils.name(candidate)}
                    </UserTile>
                  ))}
                </ColumnList>

                {hasMoreUsers && (
                  <span {...style('hint')}>
                    {i18n('Showing __count__ of __size__ candidates', {
                      count: users.length,
                      size: totalCount,
                    })}
                  </span>
                )}
              </div>
            }
            showDelay={showDelay}
          >
            <Icon icon="plus" small={small} {...style('plus')} />
          </Popover>
        </div>
      )}
    </div>
  )
}

const getVisibleCandidatesCount = (users: Array<UserT>): number => {
  if (users.length <= 3) {
    return users.length
  }

  return 2
}

const styled = defaultStyle(
  ({ color, font, lineHeight, padding }) => {
    const size = utils.calculateIconSize({ font, lineHeight, padding })

    return {
      position: 'relative',

      overflow: 'hidden',

      plus: {
        backgroundColor: color.mono.light,

        color: utils.color(color.mono.light),
      },

      hint: {
        display: 'inline-block',
        width: '100%',
        textAlign: 'center',
        fontSize: '0.9em',
        color: 'rgb(126, 126, 126)',
        marginTop: '1rem',
      },

      candidateWrapper: {
        float: 'left',

        ...utils.borderLeft('1px', 'solid', 'white'),
      },

      '&one-item': {
        candidateWrapper: {
          borderLeft: null,
        },
      },

      '&condensed': {
        width: size,
        height: size,

        '&two-items': {
          candidateWrapper: {
            overflowX: 'hidden',
            width: size / 2,
          },

          candidate: {
            marginLeft: -(variables.lineHeight.block / 4),
          },
        },

        '&more-items': {
          candidateWrapper: {
            overflowX: 'hidden',
            width: size / 3,
          },

          candidate: {
            marginLeft: -(variables.lineHeight.block / 3),
          },
        },

        '&spread-exceeded': {
          plus: {
            width: size / 3,
          },
        },
      },

      '&circularAvatars': {
        plus: {
          borderRadius: '50%',
        },
      },
    }
  },
  ({ users, condensed, circularAvatars }: PropsT) => ({
    '&condensed': condensed,
    '&spread-exceeded': users.length > 3,
    '&one-item': users.length === 1,
    '&two-items': users.length === 2,
    '&more-items': users.length > 2,
    '&circularAvatars': circularAvatars,
  })
)

export default styled(Candidates)



// WEBPACK FOOTER //
// ./packages/cases/src/task/components/Candidates.js