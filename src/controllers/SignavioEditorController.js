import Backbone from 'backbone-rel-partialput'
import _ from 'underscore'
import $ from 'jquery'
import {
  CANVAS,
  FIXED_PAGE_WIDTH,
  NODE_TYPES,
  NAMESPACE,
  SHAPE_TO_TYPE,
} from 'processes/models/diagram/__EditorStatics__'
import { dataTypeUtils } from '../../packages/fields'

var SignavioController = Backbone.View.extend({
  constructor: function(model, iframe) {
    Backbone.View.prototype.constructor.apply(this, arguments)

    this.model = model
    this.iframe = iframe

    iframe.effektif = this

    var canvasConfig = this.enforceCanvasConfig

    this.enforceCanvasConfig = _.debounce(canvasConfig, 300)
  },

  // used from iframe in order to log errors.
  // This way the console-polyfill works
  throw: function(error) {
    console.error(error.stack)
  },

  attachListeners: function() {
    var diagram = this.model.get('diagram')

    this.listenTo(diagram, 'edge:add', this.addEdge)
    this.listenTo(diagram, 'edge:remove', this.removeEdge)
    this.listenTo(diagram, 'edge:reconnect', this.reconnectEdge)

    this.listenTo(diagram, 'node:add', this.addNode)
    this.listenTo(diagram, 'node:remove', this.removeNode)
    this.listenTo(diagram, 'node:morph', this.morphNode)

    this.listenTo(
      this.model.get('activities'),
      'change:name',
      this.renameActivity
    )
    this.listenTo(
      this.model.get('activities'),
      'change:multiInstance',
      this.onMultiInstanceChange
    )
    this.listenTo(
      this.model.get('activities'),
      'change:defaultTransition',
      this.handleDefaultTransitionChange
    )

    this.listenTo(this.model, 'change:decision', this.handleDecisionChange)

    if (this.iframe.contentWindow) {
      $(this.iframe.contentWindow.document.body).on('click', 'a', ev =>
        ev.preventDefault()
      )
    }
  },

  registerFacadeEvents: function() {
    this.facade.registerOnEvent('split.edge', this.handleEdgeSplit.bind(this))
    this.facade.registerOnEvent(
      'shape.menu.beforecreate',
      this.handleBeforeCreate.bind(this)
    )
    this.facade.registerOnEvent(
      'beforeremove',
      this.handleBeforeRemove.bind(this)
    )
    this.facade.registerOnEvent(
      'selectionchanged',
      this.handleSelectionChange.bind(this)
    )

    this.facade.registerOnEvent(
      'dragDocker.added',
      this.handleDockerAdd.bind(this)
    )
    this.facade.registerOnEvent(
      'dragDocker.dragged',
      this.handleDockerDrag.bind(this)
    )
    this.facade.registerOnEvent(
      'dragDocker.docked',
      this.handleDockerDock.bind(this)
    )

    this.facade.registerOnEvent(
      'edge.segment.move',
      this.handleDockerDrag.bind(this)
    )
  },

  removeListeners: function() {
    var diagram = this.model.get('diagram')

    this.stopListening(diagram, 'edge:add', this.addEdge)
    this.stopListening(diagram, 'edge:remove', this.removeEdge)
    this.stopListening(diagram, 'edge:reconnect', this.reconnectEdge)

    this.stopListening(diagram, 'node:add', this.addNode)
    this.stopListening(diagram, 'node:remove', this.removeNode)
    this.stopListening(diagram, 'node:morph', this.morphNode)

    this.stopListening(
      this.model.get('activities'),
      'change:name',
      this.renameActivity
    )
    this.stopListening(
      this.model.get('activities'),
      'change:defaultTransition',
      this.handleDefaultTransitionChange
    )

    this.stopListening(this.model, 'change:decision', this.handleDecisionChange)

    // clear all events from the iframe
    this.removeSignavioEvents()
  },

  removeSignavioEvents: function() {
    if (!this.iframe) {
      return
    }

    var removeEvents = win => {
      if (!win.Signavio) {
        return
      }

      if (!win.Signavio.Utils) {
        return
      }

      if (!win.Signavio.Utils.removeAllEvents) {
        return
      }

      win.Signavio.Utils.removeAllEvents()
    }

    if (this.iframe.contentWindow) {
      removeEvents(this.iframe.contentWindow)

      return
    }

    if (this.iframe.contentDocument.frames) {
      // performing super safe checks now.
      // it seems as we are competing against the garbage collector here
      // on modern browsers (not IE). So we have to ensure each object.
      removeEvents(this.iframe.contentDocument.frames)
    }
  },

  removeDefaultTransition: function(gateway) {
    var edges = this.model.get('diagram').getOutgoingEdges(gateway)

    _.each(
      edges,
      edge => {
        var shape = this.getEdge(edge)

        shape.setProperty('conditionType', 'none')
      },
      this
    )

    this.facade.getCanvas().update()
  },

  handleDefaultTransitionChange: function(gateway, transition) {
    if (!transition) {
      return this.removeDefaultTransition(gateway)
    }

    var edge = this.getEdge(this.model.get('diagram').findEdge(transition))
    if (edge) {
      edge.setProperty('conditionType', 'Default')
    }

    this.facade.getCanvas().update()
  },

  handleModelLoad: function() {
    this.trigger('editor:render')
  },

  updateMarkers: function(transitions) {
    _.each(
      transitions,
      transition => {
        var edge = this.getEdge(this.model.get('diagram').findEdge(transition))

        if (!edge) {
          return
        }

        edge.setProperty('conditionType', 'Default')
      },
      this
    )

    this.facade.getCanvas().update()
  },

  getModel: function() {
    return this.model.get('diagram').getModel()
  },

  setFacade: function(facade) {
    this.facade = facade

    this.registerFacadeEvents()

    this.trigger('facade:available', facade)
  },

  /**
     * Returns the editor Facade
     */
  getFacade: function() {
    return this.facade
  },

  createShape: function(object, element) {
    var shape = this.facade.createShape(
      this.model.get('diagram').getShapeStub(object)
    )

    shape.resourceId = `shape-${element.id}`

    // element.once("sync", function() {
    //     shape.resourceId = element.id;
    // });

    return shape
  },

  createNode: function(node, element) {
    const shape = this.createShape(node, element)

    const bounds = node.get('bounds')

    shape.bounds.setWidth(bounds.width())
    shape.bounds.setHeight(bounds.height())
    shape.bounds.centerMoveTo(bounds.center())

    this.initBoundsListener(shape)

    _.each(node.getProperties(), (value, key) => {
      shape.setProperty(key, value)
    })

    return shape
  },

  /**
     * Adds the activity in the editor
     */
  addNode: function(node) {
    const shape = this.createNode(node, node.get('element'))

    this.enforceCanvasConfig()

    this.facade.getCanvas().update()
    this.facade.setSelection(shape)
  },

  initBoundsListeners: function() {
    _.each(
      this.facade.getCanvas().getChildShapes(true),
      shape => {
        if (this.isEdge(shape)) {
          // edge
          this.initDockerListener(shape)
        } else {
          // node
          this.initBoundsListener(shape)
        }
      },
      this
    )
  },

  initBoundsListener: function(node) {
    node.bounds.registerCallback(() => {
      this.trigger('bounds:change', node.resourceId, this.parseBounds(node))

      this.enforceCanvasConfig()
    })
  },

  createDockerCallback: function(edge) {
    return function() {
      var origin = edge.getIncomingNodes()[0]
      var target = edge.getOutgoingNodes()[0]

      if (!origin || !target) {
        // do not save docker updates for disconnected edges
        return
      }

      this.trigger('docker:change', edge.resourceId, this.parseBounds(edge))
    }.bind(this)
  },

  initDockerListener: function(edge) {
    _.each(
      edge.dockers,
      docker => {
        docker.bounds.registerCallback(this.createDockerCallback(edge))
      },
      this
    )
  },

  addEdge: function(edge) {
    var shape = this.createShape(edge, edge.get('transition'))

    shape.dockers.first().setDockedShape(this.getNode(edge.get('from')))
    shape.dockers.last().setDockedShape(this.getNode(edge.get('to')))

    shape.dockers
      .first()
      .setReferencePoint(edge.get('from').get('bounds').relativeCenter())
    shape.dockers
      .last()
      .setReferencePoint(edge.get('to').get('bounds').relativeCenter())

    this.initDockerListener(shape)

    this.facade.getCanvas().update()

    this.layoutEdge(edge)

    this.setSelection([])
    this.setSelection(this.getNode(edge.get('to')))
  },

  layoutEdge: function(edge) {
    var shape = this.getEdge(edge)

    this.facade.raiseEvent({
      type: 'layout.dolayout',
      shapes: shape,
    })
  },

  reconnectEdge: function(edge, sourceChanged, targetChanged) {
    var shape = this.getEdge(edge)

    if (sourceChanged) {
      shape.dockers.first().setDockedShape(this.getNode(edge.get('from')))
      shape.dockers
        .first()
        .setReferencePoint(edge.get('from').get('bounds').relativeCenter())
    }

    if (targetChanged) {
      shape.dockers.last().setDockedShape(this.getNode(edge.get('to')))
      shape.dockers
        .last()
        .setReferencePoint(edge.get('to').get('bounds').relativeCenter())
    }

    this.layoutEdge(edge)
  },

  /**
     * Activity List --> Editor
     * Removes the node in the editor
     */
  removeNode: function(node) {
    var shape = this.getNode(node)

    if (!shape) {
      return
    }

    var i, l
    // if you don't get this the first time, think again!
    for (i = 0, l = shape.incoming.length; i < l; ++i) {
      this.getFacade().deleteShape(shape.incoming[0])
    }
    for (i = 0, l = shape.outgoing.length; i < l; ++i) {
      this.getFacade().deleteShape(shape.outgoing[0])
    }

    this.removeShape(shape)
  },

  morphNode: function(node, activity) {
    const shape = this.getNode(activity)

    this.facade.deleteShape(shape)

    const newShape = this.createNode(node, activity)

    this.facade.getCanvas().update()

    this.facade.setSelection([])
    this.facade.setSelection(newShape)
  },

  removeEdge: function(edge) {
    var edge = this.getEdge(edge)

    if (!edge) {
      return
    }

    this.removeShape(edge)
  },

  removeShape: function(shape) {
    this.facade.deleteShape(shape)
    this.enforceCanvasConfig()

    this.setSelection([])
  },

  /**
     * Activity List --> Editor
     * Set the name
     */
  renameActivity: function(activity, name) {
    var shape = this.getNode(activity)

    if (!shape) {
      return
    }

    shape.setProperty('name', name)
    this.facade.getCanvas().update()
  },

  onMultiInstanceChange: function(activity, multiInstance) {
    var shape = this.getNode(activity)

    if (!shape) {
      return
    }

    shape.setProperty(
      'looptype',
      multiInstance.sequential ? 'Sequential' : 'Parallel'
    )
    this.facade.getCanvas().update()
  },

  handleDecisionChange: function(decision) {
    const options = dataTypeUtils.isList(decision.get('type').toJSON()) ?
      decision.get('type').get('elementType').get('options') :
      decision.get('type').get('options')
      
    _.each(options, option => {
      var edge = this.model.get('diagram').findEdgeById(option.id)
      this.renameEdge(edge, option.name)
    })
  },

  renameEdge: function(edge, name) {
    edge = this.getEdge(edge)

    if (!edge) {
      return
    }

    edge.setProperty('conditionexpression', name)
    this.facade.getCanvas().update()
  },

  parseBounds: function(shape) {
    if (this.isNode(shape)) {
      return {
        upperLeft: shape.bounds.upperLeft(),
        lowerRight: shape.bounds.lowerRight(),
      }
    }

    if (this.isEdge(shape)) {
      return _.map(shape.dockers, docker => {
        if (docker.getDockedShape()) {
          return docker.referencePoint
        }

        return docker.bounds.center()
      })
    }
  },

  onFinishedSignavioLoading: function() {
    this.trigger('editor:load')
  },

  // triggered right before a shape would be added
  // by the shape menu
  handleBeforeCreate: function(event) {
    event.option.cancelled = true

    var target = event.option.type
    var type = target.replace(NAMESPACE, '')

    if (type === 'SequenceFlow' && event.source && event.target) {
      this.trigger(
        'edge:connect',
        event.source.resourceId,
        event.target.resourceId
      )

      return
    }

    type = SHAPE_TO_TYPE[type]

    if (!type) {
      // trying to create a shape we don't know
      return
    }

    var source = event.source.resourceId
    var position = event.option.position

    this.trigger('shape:create', source, {
      position: position,
      type: type,
    })
  },

  handleDockerAdd: function(event, docker) {
    var callback = this.createDockerCallback(docker.parent)

    docker.bounds.registerCallback(callback)

    callback()
  },

  handleDockerDock: function(event) {
    var target = event.target
    var edge = event.parent

    var originChanged = edge.getIncomingNodes()[0] === target
    var targetChanged = edge.getOutgoingNodes()[0] === target

    if (originChanged && edge.getOutgoingNodes().length > 0) {
      this.trigger(
        'edge:reconnect',
        edge.resourceId,
        target.resourceId,
        edge.getOutgoingNodes()[0].resourceId
      )
    }

    if (targetChanged && edge.getIncomingNodes().length > 0) {
      this.trigger(
        'edge:reconnect',
        edge.resourceId,
        edge.getIncomingNodes()[0].resourceId,
        target.resourceId
      )
    }
  },

  handleDockerDrag: function(event) {
    this.enforceCanvasConfig()

    this.handleMouseUp(event)
  },

  handleBeforeRemove: function(event) {
    event.cancelled = true

    _.each(
      event.elements,
      element => {
        if (this.isEdge(element)) {
          this.trigger('edge:remove', element.resourceId)

          return
        }

        this.trigger('shape:remove', element.resourceId)
      },
      this
    )
  },

  handleEdgeSplit: function(event) {
    event.cancelled = true

    var shape = event.shape
    var edge = event.currentConnection

    this.trigger(
      'edge:reconnect',
      edge.resourceId,
      event.origin.resourceId,
      shape.resourceId
    )
    this.trigger('edge:connect', shape.resourceId, event.target.resourceId)
  },

  selectActivity: function(activity) {
    if (!this.facade) {
      return
    }

    var shape = this.getNode(activity)

    if (shape && activity) {
      if (!this.getSelection().include(shape)) {
        this.setSelection(shape)
      }
    } else if (!shape && !activity) {
      this.setSelection([])
    }
  },

  getNodeType: function(node) {
    node = node[0] || node

    return _.find(NODE_TYPES, type => {
      if (!node.getStencil) {
        return false
      }

      return node.getStencil().id().indexOf(type) >= 0
    })
  },

  isNode: function(shape) {
    return !!this.getNodeType(shape)
  },

  isEdge: function(node) {
    if (!node || !node.dockers) {
      return false
    }

    return node.dockers.length >= 2
  },

  getNode: function(nodeOrActivity) {
    if (!nodeOrActivity) {
      return
    }

    var shapeId
    if (nodeOrActivity.get('elementId')) {
      // nodeOrActivity is a node
      shapeId = nodeOrActivity.id
    } else {
      // nodeOrActivity is an activity
      let activityId = nodeOrActivity.id
      let node = this.model.get('diagram').findNodeById(activityId)
      shapeId = node ? node.id : activityId
    }

    return this.facade
      .getCanvas()
      .getChildShapes(true)
      .find(shape => shape.resourceId === shapeId)
  },

  getEdge: function(edgeOrTransition) {
    if (!edgeOrTransition) {
      return
    }

    var edgeId
    if (edgeOrTransition.get('elementId')) {
      // edgeOrTransition is an edge
      edgeId = edgeOrTransition.id
    } else {
      // edgeOrTransition is a transition
      let transitionId = edgeOrTransition.id
      let edge = this.model.get('diagram').findEdgeById(transitionId)
      edgeId = edge ? edge.id : transitionId // edge might have alread been removed, so fallback to the argument's id
    }

    return this.facade
      .getCanvas()
      .getChildEdges()
      .find(shape => shape.resourceId === edgeId)
  },

  configureCanvas: function(topMargin, minWidth) {
    this.canvasConfig = {
      topMargin: topMargin,
      minWidth: minWidth,
    }

    this.initBoundsListeners()

    this.trigger('editor:configure')

    this.enforceCanvasConfig(true)
  },

  getDockers: function(canvas) {
    return canvas
      .getChildEdges()
      .collect(edge => {
        return edge.dockers.findAll(docker => {
          return !docker.getDockedShape()
        })
      })
      .flatten()
  },

  configureCanvasSize: function(bounds) {
    var canvas = this.facade.getCanvas()
    var height = 3 * this.canvasConfig.topMargin + bounds.height()

    var newSize = {
      width: Math.max(
        bounds.lowerRight().x + CANVAS.HORIZONTAL_MARGIN,
        this.canvasConfig.minWidth
      ),
      height: Math.max(height, CANVAS.HEIGHT),
    }

    canvas.setSize(newSize)
    canvas.update()
  },

  setSelection: function(selection) {
    if (!this.facade) {
      return
    }

    this.facade.setSelection(selection)
  },

  getSelection: function() {
    if (!this.facade) {
      return []
    }

    return this.facade.getSelection()
  },

  updateShapesAndDockers: function(canvas, offset) {
    var shapes = canvas.getChildShapes()
    var dockers = this.getDockers(canvas)

    var move = function(element) {
      element.bounds.moveBy(offset)
    }.bind(this)

    shapes.each(move)
    dockers.each(move)

    canvas.update()
    this.facade.updateSelection()
  },

  updateScroll: function(initial, offset) {
    var scrollContainer = $(this.iframe)
      .contents()
      .find('.x-panel-editor-center .x-panel-body')
    var currentScroll = scrollContainer.scrollTop()

    if (currentScroll !== this.canvasConfig.topMargin) {
      scrollContainer.scrollTop(this.canvasConfig.topMargin)
    }

    if (!initial) {
      scrollContainer.scrollTop(this.canvasConfig.topMargin + offset.y)
    }

    scrollContainer.animate(
      {
        scrollTop: this.canvasConfig.topMargin,
      },
      200
    )

    if (!initial) {
      scrollContainer.animate(
        {
          scrollTop: this.canvasConfig.topMargin,
        },
        200
      )
    } else {
      scrollContainer.scrollTop(this.canvasConfig.topMargin)
    }
  },

  getScrollContainer: function() {
    return $(this.iframe)
      .contents()
      .find('.x-panel-editor-center .x-panel-body')
  },

  scrollHorizontal: function(scrollBy) {
    var scrollContainer = $(this.iframe)
      .contents()
      .find('.x-panel-editor-center .x-panel-body')
    var currentScroll = scrollContainer.scrollLeft()

    var scrollPosition = currentScroll + scrollBy

    scrollContainer.scrollLeft(scrollPosition)

    return scrollPosition
  },

  getShapeOffset: function(bounds) {
    return {
      x: 0,
      y: 2 * this.canvasConfig.topMargin - bounds.upperLeft().y,
    }
  },

  /**
     * @param initial (boolean) If set to true no animation is performed and
     * it is ensured that the shapes align with the left border of the centered main page container
     */
  enforceCanvasConfig: function(initial) {
    if (this._inCanvasConfigEnforce || this.isDragging) {
      return
    }

    if (!this.getFacade() || !this.canvasConfig) {
      return
    }

    var canvas = this.facade.getCanvas()

    this._inCanvasConfigEnforce = true

    var bounds = this.model.get('diagram').getBounds()

    this.configureCanvasSize(bounds)

    var offset = this.getShapeOffset(bounds)

    this.updateShapesAndDockers(canvas, offset)
    this.updateScroll(initial, offset)

    delete this._inCanvasConfigEnforce

    this.trigger('editor:update', canvas.bounds.width(), bounds.height())
  },

  handleSelectionChange: function(ev) {
    var shapes = _.filter(
      ev.elements,
      shape => {
        return this.isNode(shape)
      },
      this
    )

    this.trigger(
      'selection:change',
      _.map(shapes, shape => {
        return shape.resourceId
      })
    )
  },

  handleMouseDown: function(ev) {
    var that = this

    if (
      !this.iframe.contentWindow ||
      !$.contains(this.iframe.contentWindow.document.body, ev.target)
    ) {
      return
    }

    if (this.draggingTimer) {
      window.clearTimeout(this.draggingTimer)
    }

    this.draggingTimer = window.setTimeout(() => {
      that.isDragging = true
      that.trigger('drag:start', ev)
    }, 200)
  },

  handleMouseUp: function(ev) {
    if (this._dispatchingMouseUp) {
      return
    }

    var eventProps = _.omit(_.clone(ev), ev.prototype)

    var mouseEvent = document.createEvent('MouseEvent')
    mouseEvent.initEvent(eventProps, true, false)

    this._dispatchingMouseUp = true
    this.iframe.parentNode.dispatchEvent(mouseEvent)
    this._dispatchingMouseUp = false

    this.trigger('mouseup')

    if (!this.isDragging) {
      window.clearTimeout(this.draggingTimer)

      return
    }

    delete this.isDragging

    this.trigger('drag:end')
  },
})

_.extend(SignavioController.prototype, Backbone.Events)

module.exports = SignavioController



// WEBPACK FOOTER //
// ./src/controllers/SignavioEditorController.js