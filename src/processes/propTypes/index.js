import PropTypes from 'prop-types'

export const VariableTypeDescriptor = PropTypes.shape({
  key: PropTypes.string.isRequired,
  id: PropTypes.string,
})

export const VariableType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  descriptorId: PropTypes.string,
})

export const Variable = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: VariableType.isRequired,
  name: PropTypes.string,
})

export const Process = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

  variables: PropTypes.arrayOf(Variable),
})



// WEBPACK FOOTER //
// ./src/processes/propTypes/index.js