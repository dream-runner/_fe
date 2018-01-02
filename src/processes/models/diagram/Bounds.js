import ProcessConstituent from 'processes/models/ProcessConstituent'

module.exports = ProcessConstituent.extend({
  defaults: {
    upperLeft: {
      x: 0,
      y: 0,
    },
    lowerRight: {
      x: 0,
      y: 0,
    },
  },

  upperLeft: function() {
    return this.get('upperLeft')
  },

  lowerRight: function() {
    return this.get('lowerRight')
  },

  center: function() {
    var upperLeft = this.upperLeft()
    var lowerRight = this.lowerRight()

    return {
      x: upperLeft.x + (lowerRight.x - upperLeft.x) / 2,
      y: upperLeft.y + (lowerRight.y - upperLeft.y) / 2,
    }
  },

  width: function() {
    return this.lowerRight().x - this.upperLeft().x
  },

  moveBy: function(coordinates) {
    this.set('upperLeft', {
      x: this.get('upperLeft').x + coordinates.x,
      y: this.get('upperLeft').y + coordinates.y,
    })

    this.set('lowerRight', {
      x: this.get('lowerRight').x + coordinates.x,
      y: this.get('lowerRight').y + coordinates.y,
    })
  },

  setWidth: function(width) {
    var upperLeft = this.upperLeft()
    var lowerRight = this.lowerRight()

    this.set('lowerRight', {
      x: upperLeft.x + width,
      y: lowerRight.y,
    })
  },

  height: function() {
    return this.lowerRight().y - this.upperLeft().y
  },

  setHeight: function(height) {
    var upperLeft = this.upperLeft()
    var lowerRight = this.lowerRight()

    this.set('lowerRight', {
      x: lowerRight.x,
      y: upperLeft.y + height,
    })
  },

  centerAt: function(position) {
    var width = this.width()
    var height = this.height()

    this.set('upperLeft', {
      x: Math.max(0, position.x - width / 2),
      y: Math.max(0, position.y - height / 2),
    })

    var upperLeft = this.get('upperLeft')

    this.set('lowerRight', {
      x: upperLeft.x + width,
      y: upperLeft.y + height,
    })
  },

  relativeCenter: function() {
    return {
      x: this.width() / 2,
      y: this.height() / 2,
    }
  },

  serialize: function() {
    return {
      upperLeft: this.upperLeft(),
      lowerRight: this.lowerRight(),
    }
  },

  cleanup: function(dimensions) {
    var width = this.width()
    var height = this.height()

    if (!width || width < dimensions.width) {
      this.setWidth(dimensions.width)
    }

    if (!height || height < dimensions.height) {
      this.setHeight(dimensions.height)
    }
  },
})



// WEBPACK FOOTER //
// ./src/processes/models/diagram/Bounds.js