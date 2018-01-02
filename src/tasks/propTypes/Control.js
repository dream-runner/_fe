import PropTypes from 'prop-types'

import Filter from './Filter'

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

  filters: PropTypes.arrayOf(Filter),
})



// WEBPACK FOOTER //
// ./src/tasks/propTypes/Control.js