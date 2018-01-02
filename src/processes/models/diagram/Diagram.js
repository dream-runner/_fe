import _ from 'underscore'
import Effektif from 'singleton/Effektif'

import ProcessConstituent from '../ProcessConstituent'

import { NAMESPACE, NODE_PADDING } from './__EditorStatics__'
import Node from './Node'

import EdgeCollection from '../../collections/EdgeCollection'

module.exports = ProcessConstituent.extend({
  embeddings: {
    canvas: Node,
    edges: EdgeCollection,
  },

  defaults: {
    canvas: {},
    edges: [],
  },

  handleRemove: function(node) {
    this.trigger('node:remove', node)
  },

  add: function(element, position) {
    position = position || this.findAddPosition(element)

    return this.addAt(element, position)
  },

  addConnection: function(transition) {
    if (this.findEdge(transition)) {
      // do not fire add events multiple times
      return
    }

    var edge = this.get('edges').addConnection(transition, this.get('canvas'))

    this.trigger('edge:add', edge)

    return edge
  },

  reconnect: function(edge, sourceId, targetId) {
    var sourceNode = this.findNodeById(sourceId)
    var targetNode = this.findNodeById(targetId)

    var sourceChanged = edge.get('from') !== sourceNode
    var targetChanged = edge.get('to') !== targetNode

    edge.reconnect(sourceNode, targetNode)

    this.trigger('edge:reconnect', edge, sourceChanged, targetChanged)
  },

  morph: function(element) {
    const node = this.findNodeById(element.id)

    node.set('element', element)
    node.initListeners()

    const bounds = node.createBounds(element, node.get('bounds').center())
    node.set('bounds', bounds)

    this.trigger('node:morph', node, element)

    const incoming = this.getIncomingEdges(element)
    const outgoing = this.getOutgoingEdges(element)

    incoming.map(edge => this.trigger('edge:reconnect', edge, false, true))
    outgoing.map(edge => this.trigger('edge:reconnect', edge, true, false))
  },

  addAt: function(element, position) {
    if (this.findNode(element)) {
      // do not fire add events twice
      return
    }

    var node = this.get('canvas').addAt(element, position)

    this.trigger('node:add', node)

    return node
  },

  addNextTo: function(element, ref) {
    this.addAt(element, this.findAddPosition(element, ref))
  },

  findNode: function(element) {
    if (!element) {
      return
    }

    return this.get('canvas').find(element)
  },

  findNodeById: function(id) {
    if (!id) {
      return
    }

    return this.get('canvas').findById(id)
  },

  findEdgeById: function(id) {
    return this.get('edges').find(
      edge => edge.id === id || edge.get('transitionId') === id
    )
  },

  findEdge: function(transition) {
    return this.findEdgeById(transition.id)
  },

  getOutgoingEdges: function(element) {
    return this.get('edges').filter(
      edge => edge.get('from').get('element') === element
    )
  },

  getIncomingEdges: function(element) {
    return this.get('edges').filter(
      edge => edge.get('to').get('element') === element
    )
  },

  initNodes: function(elements) {
    var needBounds = []

    elements.each(element => {
      if (!element.get('di')) {
        needBounds.push(element)

        return
      }

      this.addAt(element)
    }, this)

    _.each(needBounds, element => this.add(element))
  },

  handleEdgeRemove: function(edge) {
    this.trigger('edge:remove', edge)
  },

  initListeners: function() {
    this.on(
      'error',
      (diagram, response) => {
        if (response.status !== 400) {
          return
        }

        this.trigger('version:mismatch')
      },
      this
    )

    //this.get("canvas").on("change", this.save, this);
    this.get('canvas').on('node:remove', this.handleRemove, this)

    //this.get("edges").on("change", this.save, this);
    this.get('edges').on('remove', this.handleEdgeRemove, this)
  },

  stopListening: function() {
    this.off('error')

    this.get('canvas').off('change')
    this.get('canvas').off('node:remove')

    this.get('edges').off('change')
    this.get('edges').off('remove')
  },

  initDeepListeners: function() {
    this.get('canvas').initListeners()
    this.get('edges').each(edge => edge.initListeners())

    this.initListeners()
  },

  init: function(process, elements, transitions) {
    var canvas = new Node({ id: `shape-${process.id}` })
    this.set('canvas', canvas)

    this.initNodes(elements)

    this.get('edges').init(transitions, canvas)

    this.initListeners()

    canvas.set('bounds', canvas.calculateBounds())
  },

  findAddPosition: function(element, ref) {
    var bounds, y
    var dimensions = Node.getDimensions(element)

    if (ref) {
      bounds = this.findNode(ref).get('bounds')

      // use center of ref node as y coordinate
      y = bounds.upperLeft().y + bounds.height() / 2
    } else {
      bounds = this.get('canvas').contentBounds()

      // use lower right of the canvas
      y = Math.max(0, bounds.lowerRight().y - dimensions.height / 2)
    }

    return {
      x: bounds.lowerRight().x + NODE_PADDING + dimensions.width / 2,
      y: y,
    }
  },

  hasElements: function() {
    return this.get('canvas').get('children').length > 0
  },

  getStencilId: function(element) {
    return Node.getStencilId(element)
  },

  getProperties: function(element) {
    return new Node({ element }).getProperties()
  },

  getBounds: function() {
    return this.get('canvas').contentBounds(this.get('edges'))
  },

  cleanupNodes: function(elements) {
    var active = {}

    // node which are present even though no elements exist
    // that would represent them
    var obsolete = _.filter(this.get('canvas').allChildren(), node => {
      var element = node.get('element')

      if (!element || !elements.get(element.id)) {
        return true
      }

      // inconsistencies with the node or bounds detected
      // removing the node here. The further cleanup procedure will
      // recreate the node if necessary
      if (node.cleanup() === false) {
        return true
      }

      active[element.id] = true

      return false
    })

    _.each(obsolete, node => node.remove())

    // create nodes for all elements which are not
    // currently represented
    var created = elements.filter(element => !active[element.id])

    _.each(created, element => this.add(element))

    return created.length > 0 || obsolete.length > 0
  },

  cleanupEdges: function(transitions) {
    var active = {}

    // all edges which do not belong in the diagram
    var obsolete = this.get('edges').filter(edge => {
      var transition = edge.get('transition')
      var fromNode = edge.get('from')
      var toNode = edge.get('to')

      if (!fromNode || !toNode) {
        return true
      }

      if (
        !transition ||
        !transition.get('from') ||
        !transition.get('to') ||
        transition.get('from') !== fromNode.get('element') ||
        transition.get('to') !== toNode.get('element')
      ) {
        return true
      }

      active[transition.id] = true

      return false
    })

    _.each(obsolete, edge => this.get('edges').remove(edge))

    var created = transitions.filter(
      transition =>
        transition.get('from') && transition.get('to') && !active[transition.id]
    )

    _.each(created, transition => this.addConnection(transition))

    return created.length > 0 || obsolete.length > 0
  },

  cleanup: function(elements, transitions) {
    var hadDirtyNodes = this.cleanupNodes(elements)
    var hadDirtyEdges = this.cleanupEdges(transitions)

    return hadDirtyNodes || hadDirtyEdges
  },

  getShapeStub: function(shape) {
    return {
      namespace: NAMESPACE,
      type: NAMESPACE + shape.getStencilId(),
    }
  },

  getModel: function() {
    var canvas = this.get('canvas').serialize(this.get('edges'), true)
    var edges = _.compact(
      this.get('edges').map(edge => (edge.isValid() ? edge.serialize() : null))
    )

    canvas.childShapes = canvas.childShapes.concat(edges)

    canvas = _.omit(canvas, 'outgoing', 'resourceId')

    return _.extend({}, canvas, {
      properties: {
        id: '',
        author: '',
        modificationdate: '',
        name: '',
        documentation: '',
        language: 'English',
        expressionlanguage: '',
        pools: '',
        creationdate: '',
        querylanguage: '',
        version: '',
      },
      stencilset: {
        url: '/signavio/bpmn2.0/bpmn2.0.json?version=' + Effektif.version(),
        namespace: NAMESPACE,
      },
      ssextensions: ['http://effektif.com/extension#'],
      stencil: { id: 'BPMNDiagram' },
    })
  },
})



// WEBPACK FOOTER //
// ./src/processes/models/diagram/Diagram.js