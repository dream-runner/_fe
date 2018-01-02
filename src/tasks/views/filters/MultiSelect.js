import PropTypes from 'prop-types'
import React, { Component } from 'react'
import i18n from 'i18n'

import { List, Hint } from 'commons-components'
import { defaultStyle } from 'commons-style'

import { Filter as FilterType } from '../../propTypes'

import Filter from './Filter'

class MultiSelect extends Component {
  static propTypes = {
    filters: PropTypes.arrayOf(FilterType).isRequired,
    active: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    style: {},
    filters: [],
    active: [],
  }

  render() {
    if (this.props.filters.length === 0) {
      return (
        <Hint>
          {i18n('No filters available')}
        </Hint>
      )
    }

    return (
      <List {...this.props.style}>
        {this.props.filters.map(filter => this.renderFilter(filter))}
      </List>
    )
  }

  renderFilter(filter) {
    return (
      <Filter
        key={filter.id}
        name={filter.name}
        active={this.isActive(filter.id)}
        icon="check"
        onClick={() => this.handleChange(filter.id)}
        style={this.props.style(['filter', filter.id])}
      />
    )
  }

  isDisabled() {
    return this.props.active.length === 0
  }

  handleChange(filter) {
    const { active } = this.props

    if (this.isActive(filter)) {
      this.props.onChange(active.filter(id => id !== filter))
    } else {
      this.props.onChange([...active, filter])
    }
  }

  isActive(filter) {
    return this.props.active.indexOf(filter) >= 0
  }
}

const styled = defaultStyle(
  theme => ({
    filter: {
      header: {
        backgroundColor: theme.color.mono.light,
        opacity: 1,
      },

      icon: {
        opacity: 0,
      },

      '&active': {
        icon: {
          opacity: 1,
        },
      },
    },

    '&disabled': {
      filter: {
        header: {
          opacity: 0.75,
        },

        icon: {
          opacity: 0.5,
        },
      },
    },
  }),
  props => ({
    '&disabled': props.active && props.active.length === 0,
  })
)

export default styled(MultiSelect)



// WEBPACK FOOTER //
// ./src/tasks/views/filters/MultiSelect.js