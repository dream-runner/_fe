import PropTypes from 'prop-types'
import React, { Component } from 'react'
import i18n from 'i18n'

import { defaultStyle, utils } from 'commons-style'
import { ComponentUtils } from 'commons-utils'
import { List, Hint } from 'commons-components'
import { getTheme } from 'commons-style'

import { Filter as FilterType } from '../../propTypes'

import Filter from './Filter'

class RadioSelect extends Component {
  static propTypes = {
    filters: PropTypes.arrayOf(FilterType).isRequired,
    onChange: PropTypes.func.isRequired,

    active: PropTypes.string,
  }

  static defaultProps = {
    filters: [],
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
      <List className={this.props.className}>
        {this.props.filters.map(filter => this.renderFilter(filter))}
      </List>
    )
  }

  renderFilter(filter) {
    return (
      <Filter
        iconSet="fontAwesome"
        className={ComponentUtils.className(this.props, 'filter')}
        name={filter.name}
        key={filter.id}
        active={this.isActive(filter)}
        icon={this.isActive(filter) ? 'dot-circle-o' : 'circle-o'}
        onClick={() => this.handleFilterChange(filter)}
        {...this.props.style('header')}
      />
    )
  }

  handleFilterChange(filter) {
    if (this.isActive(filter)) {
      this.props.onChange(null)
    } else {
      this.props.onChange(filter.id)
    }
  }

  isActive(filter) {
    return this.props.active === filter.id
  }
}

const styled = defaultStyle(theme => ({
  header: {
    backgroundColor: theme.color.mono.light,
  },
}))

export default styled(RadioSelect)



// WEBPACK FOOTER //
// ./src/tasks/views/filters/RadioSelect.js