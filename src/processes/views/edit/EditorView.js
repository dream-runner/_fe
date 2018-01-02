import $ from 'jquery'
import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { CSSUtils } from 'commons-utils'

import SignavioEditorController from 'controllers/SignavioEditorController'
import Process from 'processes/models/Process'
import Activity from 'activities/models/Activity'

import { BaseMixin } from 'commons-mixins'

import EditorScrollbar from 'processes/views/edit/EditorScrollbar'

import { Hint } from '@signavio/effektif-commons/lib/components/hints'

module.exports = createReactClass({
  displayName: 'ProcessEditor',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(Process).isRequired,

    applicationHeight: PropTypes.number.isRequired,

    activeItem: PropTypes.instanceOf(Activity),

    onSelect: PropTypes.func.isRequired,
    onDrag: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onScroll: PropTypes.func.isRequired,

    onLoad: PropTypes.func,
    onError: PropTypes.func,

    dragging: PropTypes.bool,
    readOnly: PropTypes.bool,
  },

  getInitialState: function() {
    return {
      loading: true,
      dragging: false,
      scrolling: false,
      canvasScrollLeft: 0,
      canvasWidth: 0,
      canvasHeight: 0,
    }
  },

  getDefaultProps: function() {
    return {
      onDiagramChange: function() {},
    }
  },

  componentDidMount: function() {
    this.props.model.get('diagram').on('version:mismatch', this.props.onError)

    var editor = this.refs.iframe
    var controller = new SignavioEditorController(this.props.model, editor)

    this._controller = controller

    controller.on('editor:load', this.handleLoad)
    controller.once('editor:configure', this.handleEditorConfigure)
    controller.on('editor:update', this.handleEditorUpdate)

    controller.on('shape:create', this.handleShapeAdd)
    controller.on('shape:remove', this.handleRemove)

    controller.on('edge:remove', this.handleEdgeRemove)
    controller.on('edge:connect', this.handleConnect)
    controller.on('edge:reconnect', this.handleReconnect)

    controller.on('bounds:change', this.handleBoundsChange)
    controller.on('docker:change', this.handleDockerChange)

    controller.on('drag:start', this.handleDragStart)
    controller.on('drag:end', this.handleDragEnd)

    controller.on('selection:change', this.handleSelectionChange)

    $(window).on('resize', this.tryForceUpdate)
    $(document).on('mouseup', this.handleMouseUp)

    $('.outermost-container > .outer-container').addClass('in-process-editing')
  },

  componentWillUnmount: function() {
    $('.outermost-container > .outer-container').removeClass(
      'in-process-editing'
    )

    $(document).off('mouseup', this.handleMouseUp)
    $(window).off('resize', this.forceUpdateIfPossible)

    this._controller.off(null, null, this)
    this._controller.removeListeners()

    this.props.model.get('diagram').off('version:mismatch', this.props.onError)
  },

  componentDidUpdate: function(prevProps) {
    if (prevProps.activeItem !== this.props.activeItem) {
      this._controller.selectActivity(this.props.activeItem)
    }
  },

  render: function() {
    var cls = CSSUtils.cls({
      'bpmn-editor-container': true,
      'read-only': this.props.readOnly,
    })

    return (
      <div className={cls} ref="container">
        <div className="overlay-outer-container">
          <div className="overlay-container" ref="overlay">
            {this.renderMask()}
            {this.renderArrow()}
          </div>
        </div>

        {this.renderEditor()}
        {this.renderScrollbar()}
      </div>
    )
  },

  renderMask: function() {
    if (!this.state.loading) {
      return null
    }

    return (
      <div className="mask">
        <Hint loading className="hint">
          {i18n('Editor is loading...')}
        </Hint>
      </div>
    )
  },

  renderArrow: function() {
    const { dragging, activity, model } = this.props

    if (this.state.loading || dragging || !activity) {
      return
    }

    var node = model.get('diagram').findNodeById(activity.id)

    if (!node) {
      return
    }

    var config = this.getArrowConfig(node)

    var cls = CSSUtils.cls({
      'config-arrow': true,
      'to-right': config.toRight,
    })

    return (
      <div className={cls} ref="arrow" style={config.style}>
        <i className="fa fa-chevron-up" />
      </div>
    )
  },

  getArrowConfig: function(node) {
    var bounds = node.get('bounds')

    var posX =
      bounds.center().x - this.state.canvasScrollLeft ||
      this._controller.facade.getCanvas().getScrollPosition().left

    var toRight = posX > this._controller.canvasConfig.minWidth / 2
    var width = Math.round(
      Math.abs(this._controller.canvasConfig.minWidth / 2 - posX)
    )
    var left = posX - (toRight ? width : 0)
    var top = bounds.lowerRight().y - this.props.applicationHeight

    var height = 55

    return {
      toRight: toRight,
      style: {
        top: top,
        left: left,
        width: width,
        height: height,
      },
    }
  },

  getEditorStyle: function() {
    return {
      minHeight: this.state.canvasHeight,
      height: this.state.canvasHeight,
      // make sure the editor won't swallow mouse events while scrolling
      pointerEvents: this.state.scrolling ? 'none' : 'all',
    }
  },

  renderEditor: function() {
    var cls = CSSUtils.cls({
      'bpmn-editor': true,
      loading: this.state.loading,
    })

    return (
      <div className={cls} ref="editor" style={this.getEditorStyle()}>
        <iframe
          ref="iframe"
          src={this.getIframeSource() + '?_dc=' + window.EFFEKTIF_REVISION}
        />
      </div>
    )
  },

  renderScrollbar: function() {
    if (this.state.loading) {
      return
    }
    var element = this._controller.getScrollContainer().get(0)
    if (!element) {
      return
    }

    // contentWidth and contentHeight are only passed to ensure the update of the scrollbar,
    // but are not actually used inside the EditorScrollbar component
    return (
      <EditorScrollbar
        element={element}
        contentWidth={this.state.canvasWidth}
        contentHeight={this.state.canvasHeight}
        onScrollStart={this.handleScrollStart}
        onScrollEnd={this.handleScrollEnd}
        onScroll={this.handleScroll}
      />
    )
  },

  getIframeSource: function() {
    var src = CSSUtils.cls({
      editor: true,
      readonly: this.props.readOnly,
      dev: window.EFFEKTIF_DEBUG,
    })

    return '/' + src.replace(/ /g, '-') + '.xhtml'
  },

  handleScrollStart: function() {
    this.trySetState({
      scrolling: true,
    })
  },

  handleScrollEnd: function() {
    this.trySetState({
      scrolling: false,
    })
  },

  handleScroll: function() {
    var scrollLeft = this._controller.facade.getCanvas().getScrollPosition()
      .left

    // make sure the arrows from the shape to the config are updated while scrolling
    this.setState({
      canvasScrollLeft: scrollLeft,
    })

    this.props.onScroll(scrollLeft)
  },

  handleBoundsChange: function(id, bounds) {
    var diagram = this.props.model.get('diagram')
    var node = diagram.findNodeById(id)

    node.updateBounds(bounds)
    node.save()

    this.props.onDiagramChange()
  },

  handleDockerChange: function(id, dockers) {
    var diagram = this.props.model.get('diagram')
    var edge = diagram.findEdgeById(id)

    edge.set('dockers', dockers)
    edge.save()
  },

  handleShapeAdd: function(source, targetRef) {
    let node = this.props.model.get('diagram').findNodeById(source)
    this.props.onShapeAdd(node.get('element'), targetRef)
  },

  handleEdgeRemove: function(id) {
    var edge = this.props.model.get('diagram').findEdgeById(id)

    if (!edge) {
      // edges might already be removed due to
      // restrictions on the transition model
      return
    }

    var transition = edge.get('transition')

    if (!transition || transition.destroyed) {
      // transition has probably been already deleted by removing a
      // a connected activity

      return
    }

    transition.destroy()
    this.props.model.get('diagram').save()
  },

  handleConnect: function(from, to) {
    var origin = this.props.model.get('diagram').findNodeById(from)
    var target = this.props.model.get('diagram').findNodeById(to)

    this.props.model.addConnection(origin.get('element'), target.get('element'))
    this.props.model.save()
  },

  handleReconnect: function(id, fromId, toId) {
    var diagram = this.props.model.get('diagram')
    var edge = diagram.findEdgeById(id)

    diagram.reconnect(edge, fromId, toId)
    diagram.save()
  },

  handleMouseUp: function() {
    if (!this.props.dragging) {
      return
    }

    this.handleDragEnd(this._controller)
  },

  handleRemove: function(id) {
    var diagram = this.props.model.get('diagram')
    var node = diagram.findNodeById(id)

    if (!node) {
      return
    }

    var element = node.get('element')

    if (!element || element.destroyed) {
      return
    }

    element.destroy()
    this.props.model.get('diagram').save()
  },

  handleDragStart: function(ev) {
    if (this.props.readOnly) {
      return
    }

    this.props.onDrag()
  },

  handleDragEnd: function() {
    this.props.onDrop()

    var selection = this._controller.getSelection()

    this.handleSelectionChange(selection.map(shape => shape.resourceId))
  },

  handleSelectionChange: function(elements) {
    if (this.state.loading || this.props.dragging) {
      return
    }

    if (this._selecting) {
      window.clearTimeout(this._selecting)
    }

    this._selecting = window.setTimeout(() => {
      this.focusIframe(elements)
      this.setSelection(elements)
    }, 1)
  },

  focusIframe: function(selection) {
    if (!selection || selection.length > 1) {
      return
    }

    let item = selection[0]

    // edges appear as undefined in the list
    if (!item && this.refs.iframe) {
      // This is necessary for IE9. If we don't focus the iframe
      // content window manually no key events are triggered.
      // This in turn would mean, that people are not able to
      // remove transitions.
      this.refs.iframe.contentWindow.focus()
    }
  },

  setSelection: function(elements) {
    if (elements.length !== 1) {
      this.props.onSelect(null)

      return
    }

    var id = elements[0]
    var node = this.props.model.get('diagram').findNodeById(id)

    if (!node) {
      return
    }

    this.props.onSelect(node.get('element'))
  },

  updateMarkers: function() {
    var defaultTransitions = []

    this.props.model.get('activities').each(activity => {
      if (!activity.get('type').get('key') === 'exclusiveGateway') {
        return
      }

      var transition = activity.get('defaultTransition')

      if (!transition) {
        return
      }

      defaultTransitions.push(transition)
    })

    this._controller.updateMarkers(defaultTransitions)
  },

  handleEditorConfigure: function() {
    if (!this.refs.editor) {
      return
    }

    this.trySetState({
      loading: false,
    })

    if (this.props.onLoad) {
      this.props.onLoad()
    }
  },

  handleEditorUpdate: function(width, height) {
    if (!this.refs.editor) {
      return
    }

    height += this.props.applicationHeight + 500

    this.trySetState({
      canvasWidth: width,
      canvasHeight: height,
    })
  },

  handleLoad: function() {
    this.updateMarkers()

    this._controller.configureCanvas(
      this.props.applicationHeight + 30,
      $('body').innerWidth()
    )

    if (this.props.activity) {
      this._controller.selectActivity(this.props.activity)
    }
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/edit/EditorView.js