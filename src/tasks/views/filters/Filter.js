import PropTypes from 'prop-types'
import React from 'react'

import { TextTile } from 'commons-components/tiles'
import { defaultStyle, utils } from 'commons-style'

const Filter = ({ icon, name, ...rest }) =>
  <TextTile {...rest} icon={icon}>
    {name}
  </TextTile>

Filter.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

const styled = defaultStyle(
  theme => ({
    cursor: 'pointer',

    header: {
      ...utils.transition('opacity'),

      ':hover': {
        opacity: 1,
      },
    },

    icon: {
      backgroundColor: 'transparent',

      ...utils.transition('opacity'),
    },
  }),
  props => ({
    '&active': props.active,
  })
)

export default styled(Filter)



// WEBPACK FOOTER //
// ./src/tasks/views/filters/Filter.js