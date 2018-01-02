import PropTypes from 'prop-types'

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

  dueDate: PropTypes.string,
})



// WEBPACK FOOTER //
// ./src/tasks/propTypes/Task.js