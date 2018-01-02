import PropTypes from 'prop-types'
import React, { Component } from 'react'
import _ from 'lodash'

import { getTheme, padding, font } from 'commons-style'
import { Clearfix } from 'commons-components'

import { Filter } from '../../propTypes'

const GROUPS = [
  {
    regex: /^[\W\_0-9]+.*/i,
    title: '#-9',
  },
  {
    regex: /^[a-c]+.*/i,
    title: 'A-C',
  },
  {
    regex: /^[d-f]+.*/i,
    title: 'D-F',
  },
  {
    regex: /^[g-i]+.*/i,
    title: 'G-I',
  },
  {
    regex: /^[j-l]+.*/i,
    title: 'J-L',
  },
  {
    regex: /^[m-o]+.*/i,
    title: 'M-O',
  },
  {
    regex: /^[p-r]+.*/i,
    title: 'P-R',
  },
  {
    regex: /^[s-u]+.*/i,
    title: 'S-U',
  },
  {
    regex: /^[v-x]+.*/i,
    title: 'V-X',
  },
  {
    regex: /^[y-z]+.*/i,
    title: 'Y-Z',
  },
]

class Pagination extends Component {
  static propTypes = {
    processes: PropTypes.arrayOf(Filter).isRequired,

    value: PropTypes.instanceOf(RegExp),
    onChange: PropTypes.func,
  }

  componentWillMount() {
    if (!this.props.value) {
      let defaultGroup = this.getDefaultGroup()

      this.props.onChange(defaultGroup.regex)
    }
  }

  render() {
    return (
      <div style={defaultStyles.base(this.props.theme)}>
        {_.map(GROUPS, group => this.renderGroup(group))}

        <Clearfix />
      </div>
    )
  }

  getDefaultGroup() {
    let { processes, process } = this.props

    if (process) {
      return _.find(GROUPS, group => group.regex.test(process.name))
    }

    return _.find(GROUPS, group =>
      _.find(processes, p => group.regex.test(p.name))
    )
  }

  isUnavailable(group) {
    return !_.find(this.props.processes, ({ name }) => group.regex.test(name))
  }

  renderGroup(group) {
    let { value } = this.props

    return (
      <div
        key={group.title}
        onClick={() => this.handleGroupClick(group)}
        style={defaultStyles.group(
          value === group.regex,
          this.isUnavailable(group),
          this.props.theme
        )}
      >

        {group.title}
      </div>
    )
  }

  handleGroupClick(group) {
    if (this.isUnavailable(group)) {
      return
    }

    this.props.onChange(group.regex)
  }
}

export default getTheme(Pagination)

const defaultStyles = {
  group: (isActive, isDisabled, theme) => ({
    float: 'left',

    opacity: isDisabled ? 0.5 : 1,
    cursor: isDisabled ? 'default' : 'pointer',

    width: `${100 / GROUPS.length}%`,

    textAlign: 'center',
    fontSize: font.size.small,

    ...(isActive && {
      marginBottom: -1,

      borderStyle: 'solid',
      borderColor: theme.color.primary.base,
      borderWidth: 0,
      borderBottomWidth: 1,
    }),
  }),

  base: ({ color, padding }) => ({
    borderStyle: 'solid',
    borderColor: color.mono.light,
    borderWidth: 0,
    borderBottomWidth: '1px',

    marginBottom: padding.xsmall,
  }),
}



// WEBPACK FOOTER //
// ./src/tasks/views/filters/ProcessPagination.js