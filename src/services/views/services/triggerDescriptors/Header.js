import PropTypes from 'prop-types'
import React from 'react'
import i18n from 'i18n'

import { defaultStyle, utils } from 'commons-style'
import { Remove } from 'commons-components'
import { IconButton } from 'commons-components/buttons'
import { Tile, TextTile } from 'commons-components/tiles'

function Header({ icon, expanded, value, onChange, onRemove, ...rest }) {
  let Component = expanded ? Tile : TextTile

  return (
    <Component
      style={rest.style}
      icon={icon}
      toolbar={[
        <Remove style={rest.style(['button', 'remove'])} onRemove={onRemove} />,
        <IconButton
          style={rest.style(['button', 'toggle'])}
          iconSet="fontAwesome"
          icon={expanded ? 'angle-up' : 'angle-down'}
        />,
      ]}
    >

      {expanded
        ? <input
            {...rest}
            {...rest.style('input')}
            placeholder={i18n('Which action leads to this trigger?')}
            type="text"
            defaultValue={value}
            onClick={ev => ev.stopPropagation()}
            onBlur={ev => onChange(ev.target.value)}
          />
        : value}
    </Component>
  )
}

Header.propTypes = {
  value: PropTypes.string.isRequired,

  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,

  icon: PropTypes.string,

  expanded: PropTypes.bool,
}

export default defaultStyle({
  cursor: 'pointer',

  input: {
    width: '100%',
  },

  button: {
    float: 'left',

    ...utils.borderLeft('1px', 'solid', 'white'),
  },
})(Header)



// WEBPACK FOOTER //
// ./src/services/views/services/triggerDescriptors/Header.js