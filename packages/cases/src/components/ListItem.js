/* @flow */

import React from 'react'
import i18n from 'signavio-i18n'
import { isUndefined } from 'lodash'

import { withState, withHandlers, compose } from 'recompose'

import moment from '@signavio/effektif-commons/lib/extensions/moment'
import { CSSUtils, DateUtils } from '@signavio/effektif-commons/lib/utils'
import { defaultStyle, variables } from '@signavio/effektif-commons/lib/styles'
import {
  Popover,
  List,
  Icon,
  Disable,
} from '@signavio/effektif-commons/lib/components'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import type { CaseT, StatsT } from '../types'

import ProgressIndicator from './progress'
import { Priority } from './priority'

type Props = {
  caze: CaseT,
  stats: StatsT,

  onMouseOut: () => void,
  onMouseOver: () => void,

  selectMode: boolean,
}

function Case({
  caze,
  stats,
  style,
  onMouseOut,
  onMouseOver,
  selectMode,
  selected,
  onSelectionChange,
}: Props) {
  const cls = CSSUtils.cls({
    case: true,
    closed: caze.closed,
  })

  const gotEditRight = (caze.access && caze.access.edit) || !caze.access
  return (
    <div
      {...style}
      className={cls}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <TextTile
        style={style('content')}
        iconSet="fontAwesome"
        header={
          <List direction="horizontal">
            {selectMode &&
              (!gotEditRight ? (
                <Popover
                  placement="right"
                  popover={
                    <Hint inline>
                      {i18n(
                        'You need editing rights to perform actions on this case.'
                      )}
                    </Hint>
                  }
                >
                  <div>
                    <Disable>
                      <Icon icon={'square'} />
                    </Disable>
                  </div>
                </Popover>
              ) : (
                <Icon
                  style={style('selectable')}
                  icon={selected ? 'square-check' : 'square'}
                  onClick={onSelectionChange}
                />
              ))}

            <Icon
              style={style('statusIndicator')}
              iconSet="fontAwesome"
              icon={caze.closed || caze.canceled ? 'folder-o' : 'folder-open-o'}
            />
            {!caze.closed &&
              !isUndefined(caze.priority) && (
                <Priority {...style('priority')} priority={caze.priority} />
              )}
          </List>
        }
        subtitle={
          !caze.closed &&
          caze.dueDate && (
            <Popover
              small
              placement="bottom"
              popover={moment(caze.dueDate).format('LL')}
            >
              <span>{DateUtils.getDueMessage(caze.dueDate)}</span>
            </Popover>
          )
        }
        toolbar={
          <ProgressIndicator
            style={style('progress')}
            stats={stats}
            tasksOpen={caze.tasksOpen}
            tasksCompleted={caze.tasksCompleted}
          />
        }
      >
        <a {...style('link')} href={`/case/${caze.id}`} title={caze.name}>
          {caze.name || <Hint inline>{i18n('Unnamed case')}</Hint>}
        </a>
      </TextTile>
    </div>
  )
}

const enhance = compose(
  withState('hover', 'toggleHover', false),
  withHandlers({
    onMouseOver: ({ toggleHover }) => () => toggleHover(true),
    onMouseOut: ({ toggleHover }) => () => toggleHover(false),
    onSelectionChange: ({ caze, onSelectionChange }) => () => {
      onSelectionChange(caze)
    },
  }),
  defaultStyle(
    ({ padding, color }) => {
      return {
        progress: {
          marginRight: padding.normal,
        },

        content: {
          icon: {
            float: 'left',
          },
        },

        priority: {
          float: 'right',

          marginLeft: 1,

          width: padding.xsmall,
          height: variables.lineHeight.block,
        },

        selectable: {
          backgroundColor: color.mono.light,
          color: color.mono.middle,
        },

        statusIndicator: {
          backgroundColor: color.mono.light,
          color: color.mono.middle,
        },

        link: {
          cursor: 'pointer',
        },

        '&closed': {
          link: {
            color: color.mono.middle,
          },
        },

        '&hovered': {
          progress: {
            completed: {
              info: {
                display: 'block',
              },
            },

            open: {
              info: {
                display: 'block',
              },
            },
          },
        },
        '&selected': {
          selectable: {
            color: color.mono.ultradark,
            backgroundColor: color.primary.lighter,
          },
        },
      }
    },
    ({ hover, caze, selected }) => ({
      '&hovered': hover,
      '&closed': caze.closed,
      '&selected': selected,
    })
  )
)

export default enhance(Case)



// WEBPACK FOOTER //
// ./packages/cases/src/components/ListItem.js