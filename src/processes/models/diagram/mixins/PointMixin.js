import _ from 'underscore'

exports.minPoint = function(source, ref) {
  if (!source) {
    return _.clone(ref)
  }

  return {
    x: Math.min(source.x, ref.x),
    y: Math.min(source.y, ref.y),
  }
}
exports.maxPoint = function(source, ref) {
  if (!source) {
    return _.clone(ref)
  }

  return {
    x: Math.max(source.x, ref.x),
    y: Math.max(source.y, ref.y),
  }
}



// WEBPACK FOOTER //
// ./src/processes/models/diagram/mixins/PointMixin.js