// When using this mixin the view will react to changes (deep) inside the transition collection of the process.
// This mixin is intended for use in activity views and expects the `model` prop to be a ProcessConstituent.
exports.componentDidMount = function() {
  this.reactToTransitions(this.props, true)
}

exports.componentWillReceiveProps = function(nextProps) {
  this.reactToTransitions(nextProps)
}
exports.reactToTransitions = function(props, initial) {
  var transitionCollection = props.model.getProcess().get('transitions')
  var previousTransitionCollection = this.props.model
    .getProcess()
    .get('transitions')
  if (initial || transitionCollection !== previousTransitionCollection) {
    if (previousTransitionCollection && !initial) {
      this.stopReacting(previousTransitionCollection)
    }
    this.reactTo(transitionCollection)
  }
}



// WEBPACK FOOTER //
// ./src/activities/views/mixins/ReactToTransitionsMixin.js