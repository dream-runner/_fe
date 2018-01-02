import UniqueModel from 'uniquemodel'
import _ from 'underscore'

import Action from 'activities/models/Action'

import ProcessConstituent from '../ProcessConstituent'

import Bounds from './Bounds'
import {
  DIMENSIONS,
  DEFAULT_SHAPE,
  TYPE_TO_SHAPE,
  ACTIVITY_TYPE,
  CONTROL_TYPE,
  START_EVENT_TYPE,
  END_EVENT_TYPE,
  INTERMEDIATE_EVENT_TYPE,
} from './__EditorStatics__'

import PointMixin from './mixins/PointMixin'

import NodeCollection from '../../collections/NodeCollection'

var Node = UniqueModel(
  ProcessConstituent.extend({
    references: {
      element: Action,
    },

    embeddings: {
      children: () => require('processes/collections/NodeCollection'),
      bounds: Bounds,
    },

    defaults: {
      children: [],
      bounds: {},
    },

    proxy: function(event, node) {
      node.on(
        event,
        origin => {
          this.trigger(event, origin || node)
        },
        this
      )
    },

    init: function(element, position) {
      this.set('element', element)

      if (!position && element.get('di')) {
        this.set('bounds', new Bounds(element.get('di').bounds))
      } else {
        this.set('bounds', this.createBounds(element, position))
      }

      this.initListeners()
    },

    initProxy: function(node) {
      this.proxy('node:remove', node)
      this.proxy('change', node)
    },

    initListeners: function() {
      var element = this.get('element')

      if (element) {
        element.on('remove', () => this.remove())
      }

      this.get('children').each(node => {
        node.initListeners()
        this.initProxy(node)
      }, this)
    },

    addAt: function(element, position) {
      var node = new Node({ id: `shape-${element.id}` })

      node.init(element, position)
      this.initProxy(node)

      this.get('children').add(node)

      return node
    },

    each: function(clb, ctx) {
      this.get('children').each(node => {
        clb.call(ctx || this, node)

        node.each(clb, ctx)
      }, this)
    },

    updateBounds: function(bounds) {
      this.get('bounds').set(bounds)

      this.trigger('change', this)
    },

    createBounds: function(element, position) {
      if (!position) {
        return new Bounds()
      }

      var dimensions = Node.getDimensions(element)

      var bounds = new Bounds()
      bounds.setHeight(dimensions.height)
      bounds.setWidth(dimensions.width)

      bounds.centerAt(position)

      return bounds
    },

    cleanup: function() {
      var dimensions = Node.getDimensions(this.get('element'))

      if (!dimensions.width || !dimensions.height) {
        return false
      }

      this.get('bounds').cleanup(dimensions)
    },

    calculateDimensions: function(upperLeft, lowerRight) {
      var dimensions = {}

      if (upperLeft) {
        dimensions.upperLeft = _.clone(upperLeft)
      }

      if (lowerRight) {
        dimensions.lowerRight = _.clone(lowerRight)
      }

      this.get('children').each(child => {
        var bounds = child.calculateBounds()

        var upperLeft = bounds.upperLeft()
        var lowerRight = bounds.lowerRight()

        dimensions.upperLeft = this.minPoint(dimensions.upperLeft, upperLeft)
        dimensions.lowerRight = this.maxPoint(dimensions.lowerRight, lowerRight)
      }, this)

      return dimensions
    },

    calculateBounds: function(edges) {
      if (this.get('children').length === 0) {
        return this.get('bounds')
      }

      var bounds = this.get('bounds')
      var dimensions = this.calculateDimensions(
        bounds.upperLeft(),
        bounds.lowerRight()
      )

      this.includeEdgeDimensions(dimensions, edges)

      return new Bounds(dimensions)
    },

    includeEdgeDimensions: function(dimensions, edges) {
      if (!edges) {
        return dimensions
      }

      edges.each(edge => {
        var bounds = edge.getBounds()

        dimensions.upperLeft = this.minPoint(
          dimensions.upperLeft,
          bounds.upperLeft()
        )
        dimensions.lowerRight = this.maxPoint(
          dimensions.lowerRight,
          bounds.lowerRight()
        )
      }, this)

      return dimensions
    },

    contentBounds: function(edges) {
      var dimensions = this.calculateDimensions()

      return new Bounds(this.includeEdgeDimensions(dimensions, edges))
    },

    find: function(element) {
      if (this.get('element') === element) {
        return this
      }

      return this.get('children').find(child => child.find(element))
    },

    findById: function(id) {
      if (this.id === id || this.get('elementId') === id) {
        return this
      }

      return this.get('children').find(child => child.findById(id))
    },

    remove: function() {
      if (!this.collection) {
        return
      }

      this.collection.remove(this)

      this.trigger('node:remove', this)
    },

    getProperties: function() {
      if (!this.get('element')) {
        return {}
      }

      return _.extend(
        {
          name: this.get('element').get('name'),
          documentation: '',
        },
        this.getSpecificProperties()
      )
    },

    getSpecificProperties: function() {
      if (this.get('element').get('type').get('key') === 'exclusiveGateway') {
        return {
          gatewaytype: 'XOR',
          xortype: 'Data',
        }
      }

      if (
        this.get('element').get('type').get('key') === 'multiInstanceUserTask'
      ) {
        return {
          icon: this.get('element').get('type').getIconChar(),
          looptype: this.get('element').get('multiInstance') &&
            this.get('element').get('multiInstance').sequential
            ? 'Sequential'
            : 'Parallel',
        }
      }

      return {
        icon: this.get('element').get('type').getIconChar(),
      }
    },

    getStencilId: function() {
      return Node.getStencilId(this.get('element'))
    },

    getResourceId: function() {
      // Canvas itself is not linked to any activity
      if (!this.get('element')) {
        return
      }

      return this.id
    },

    allChildren: function() {
      var children = []

      this.get('children').each(child => {
        children.push(child)

        children = children.concat(child.allChildren())
      })

      return children
    },

    serialize: function(edges, skipProperties) {
      let outgoing

      if (edges) {
        outgoing = edges.filter(edge => edge.get('from') === this)
      } else {
        outgoing = []
      }

      return {
        resourceId: this.getResourceId(),
        bounds: this.get('bounds').serialize(),
        properties: !skipProperties && this.getProperties(),
        stencil: {
          id: this.getStencilId(),
        },
        outgoing: _.map(outgoing, edge => ({
          resourceId: edge.id,
        })),
        childShapes: this.get('children').map(child => child.serialize(edges)),
      }
    },
  }),
  'Node'
)

Node.getDimensions = element => {
  if (Node.isEndEvent(element)) {
    return DIMENSIONS.END_EVENT
  }

  if (Node.isControlFlow(element)) {
    return DIMENSIONS.CONTROL
  }

  if (Node.isStartEvent(element)) {
    return DIMENSIONS.START_EVENT
  }

  if (Node.isIntermediateEvent(element)) {
    return DIMENSIONS.START_EVENT
  }

  return DIMENSIONS.ACTIVITY
}

Node.isActivity = element => {
  return !!element.get('type').get('key').match(ACTIVITY_TYPE)
}

Node.isControlFlow = element => {
  return !!element.get('type').get('key').match(CONTROL_TYPE)
}

Node.isStartEvent = element => {
  return !!element.get('type').get('key').match(START_EVENT_TYPE)
}

Node.isEndEvent = element => {
  return !!element.get('type').get('key').match(END_EVENT_TYPE)
}

Node.isIntermediateEvent = element => {
  return !!element.get('type').get('key').match(INTERMEDIATE_EVENT_TYPE)
}

Node.getStencilId = element => {
  if (!element || !element.get('type')) {
    return 'BPMNDiagram'
  }

  return TYPE_TO_SHAPE[element.get('type').get('key')] || DEFAULT_SHAPE
}

_.extend(Node.prototype, PointMixin)

module.exports = Node



// WEBPACK FOOTER //
// ./src/processes/models/diagram/Node.js