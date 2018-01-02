import React from 'react'

import { getTheme } from 'commons-style'

import Filter from './Filter'

export default getTheme(function BooleanSelect(props = {}) {
  let { name, value, onChange, theme } = props

  return (
    <Filter
      icon="check"
      name={name}
      active={value}
      style={{
        header: defaultStyle.header(theme),
        icon: defaultStyle.icon(value),
      }}
      onClick={() => onChange(!value)}
    />
  )
})

const defaultStyle = {
  header: theme => ({
    backgroundColor: theme.color.mono.light,
  }),
  icon: isActive => ({
    opacity: isActive ? 1 : 0,
  }),
}



// WEBPACK FOOTER //
// ./src/tasks/views/filters/BooleanSelect.js