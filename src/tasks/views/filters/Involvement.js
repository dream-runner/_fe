import PropTypes from 'prop-types'
import React from 'react'
import Color from 'color'
import i18n from 'signavio-i18n'

import { ComponentUtils } from '@signavio/effektif-commons/lib/utils'
import { getTheme, utils } from '@signavio/effektif-commons/lib/styles'

import MultiSelect from './MultiSelect'
import FilterList from '../FilterList'

export const personal = () => [
  {
    id: 'assignedToMe',
    name: i18n('Assigned to me'),
    check: (task, user) => task.isAssignee(user),
  },
  {
    id: 'imaCandidate',
    name: i18n("I'm a candidate"),
    check: (task, user) => task.isCandidate(user) && !task.isAssignee(user),
  },
  {
    id: 'iStarted',
    name: i18n('I added'),
    check: (task, user) => task.get('creatorId') === user.id,
  },
]

const involvement = () => [
  ...personal(),

  {
    id: 'imaParticipant',
    name: i18n("I'm a participant"),
  },
  {
    id: 'unassigned',
    name: i18n('Unassigned'),
  },
  {
    id: 'assignedToOther',
    name: i18n('Assigned to others'),
  },
]

function InvolvementFilter({ onChange, active, className, theme, ...rest }) {
  const filters = active.involvement || []

  return (
    <FilterList
      className={className}
      title={i18n('Involvement Filter')}
      hint={
        filters.length > 0
          ? i18n('__count__ filter active', '__count__ filters active', {
              count: filters.length,
            })
          : null
      }
      expanded={filters.length > 0}
    >
      <MultiSelect
        {...rest}
        className={ComponentUtils.className({ className }, 'filters')}
        active={active.involvement || []}
        filters={involvement()}
        style={getStyle(theme)}
        onChange={filters =>
          onChange({
            involvement: involvement()
              .filter(({ id }) => filters.indexOf(id) >= 0)
              .map(({ id }) => id),
          })}
      />
    </FilterList>
  )
}

InvolvementFilter.propTypes = {
  active: PropTypes.object.isRequired,

  onChange: PropTypes.func.isRequired,
}

InvolvementFilter.defaultProps = {
  active: {},
}

export default getTheme(InvolvementFilter)

const getStyle = theme =>
  involvement().reduce(
    (style, { id }) => ({
      ...style,

      [id]: {
        header: {
          backgroundColor: headerBackground(id, theme),
        },

        icon: {
          color: utils.textColor(headerBackground(id, theme)),
        },
      },
    }),
    {}
  )

const headerBackground = (type, theme) =>
  ({
    unassigned: Color(theme.color.primary.base)
      .mix(Color(theme.color.primary.light), 0.2)
      .string(),

    imaParticipant: Color(theme.color.primary.base)
      .mix(Color(theme.color.primary.light), 0.55)
      .string(),
    iStarted: Color(theme.color.primary.base)
      .mix(Color(theme.color.primary.light), 0.55)
      .string(),

    assignedToMe: theme.color.primary.base,
    imaCandidate: theme.color.primary.base,

    assignedToOther: theme.color.primary.light,
  }[type])



// WEBPACK FOOTER //
// ./src/tasks/views/filters/Involvement.js