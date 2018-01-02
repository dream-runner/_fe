import UniqueModel from 'uniquemodel'
import _ from 'underscore'
import { find } from 'lodash'

import ProcessConstituent from '../ProcessConstituent'
import Transition from '../Transition'

import Node from './Node'
import Bounds from './Bounds'
import PointMixin from './mixins/PointMixin'

var Edge = UniqueModel(
  ProcessConstituent.extend({
    references: {
      transition: Transition,
      from: Node,
      to: Node,
    },

    defaults: {
      dockers: [],
    },

    createReferences: function(canvas) {
      this.set('from', canvas.find(this.get('transition').get('from')))
      this.set('to', canvas.find(this.get('transition').get('to')))
    },

    init: function(transition, canvas) {
      var di = transition.get('di')

      this.set('transition', transition)

      this.initListeners()
      this.createReferences(canvas)

      if (di && di.dockers) {
        this.set('dockers', transition.get('di').dockers)
      } else {
        this.set('dockers', this.createDockers())
      }
    },

    initListeners: function() {
      var transition = this.get('transition')

      transition.on(
        'remove',
        () => {
          this.remove()
        },
        this
      )
    },

    remove: function() {
      if (!this.collection) {
        return
      }

      this.collection.remove(this)

      this.trigger('remove', this, this.collection)
    },

    reconnect: function(source, target) {
      if (source !== this.get('from')) {
        this.set('from', source)
        this.get('transition').set('from', source.get('element'))
      }

      if (target !== this.get('to')) {
        this.set('to', target)
        this.get('transition').set('to', target.get('element'))
      }
    },

    createDockers: function() {
      if (!this.get('from') || !this.get('to')) {
        return []
      }

      var from = this.get('from').get('bounds').relativeCenter()
      var to = this.get('to').get('bounds').relativeCenter()

      return [from, to]
    },

    getDockers: function() {
      if (this.get('dockers').length === 0) {
        this.set('dockers', this.createDockers())
      }

      return this.get('dockers')
    },

    getStencilId: function() {
      return 'SequenceFlow'
    },

    getBounds: function() {
      var dimensions = {}

      _.each(
        this.get('dockers'),
        (docker, index) => {
          var bounds = new Bounds()
          bounds.centerAt(docker)

          var ref

          if (index === 0) {
            ref = this.get('from').get('bounds')
          }

          if (index === this.get('dockers').length - 1) {
            ref = this.get('to').get('bounds')
          }

          if (ref) {
            bounds.moveBy(ref.upperLeft())
          }

          dimensions.upperLeft = this.minPoint(
            dimensions.upperLeft,
            bounds.upperLeft()
          )
          dimensions.lowerRight = this.maxPoint(
            dimensions.lowerRight,
            bounds.lowerRight()
          )
        },
        this
      )

      return new Bounds(dimensions)
    },

    getName: function() {
      const transition = this.get('transition')
      const condition = transition.get('condition')

      if (!condition) {
        return
      }

      const { right } = condition

      if (!right || !right.type || right.type.name !== 'choice') {
        return
      }

      const optionId = right.value || transition.id
      const option = find(right.type.options, option => option.id === optionId)

      if (!option) {
        return
      }

      return option.name
    },

    serialize: function() {
      return _.extend({
        resourceId: this.id,
        properties: {
          conditionexpression: this.getName(),
        },
        stencil: {
          id: this.getStencilId(),
        },
        childShapes: [],
        incoming: [
          {
            resourceId: this.get('from').getResourceId(),
          },
        ],
        outgoing: [
          {
            resourceId: this.get('to').getResourceId(),
          },
        ],
        target: {
          resourceId: this.get('to').getResourceId(),
        },
        dockers: this.getDockers(),
      })
    },
  }),
  'Edge'
)

_.extend(Edge.prototype, PointMixin)

module.exports = Edge



// WEBPACK FOOTER //
// ./src/processes/models/diagram/Edge.js