import $ from 'jquery'
import i18n from 'i18n'
import React from 'react'
import createReactClass from 'create-react-class'
import ReactDOM from 'react-dom'
import UniqueModel from 'uniquemodel'
import { find, forEach } from 'lodash'

import Router from 'singleton/Router'

import { BaseMixin } from 'commons-mixins'
import { AccordionMixin } from 'commons-mixins'
import { Hint } from 'commons-components'

import Activity from 'activities/views'

import { dataTypeUtils } from '../../../../packages/fields'
import Node from '../../models/diagram/Node'

import Palette from './palette/PaletteView'
import Editor from './EditorView'

module.exports = createReactClass({
  displayName: 'ProcessActionsFlow',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      loading: true,
      dragging: false,
      error: false,
      scrollPosition: 0,
      isMounted: false,
      newActivity: null,
    }
  },

  componentDidMount: function() {
    this.setState({
      isMounted: true,
    })
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (!prevState.isMounted) {
      // only render the editor on the second render cycle as it relies on the top
      // margin to be available
      this.renderEditor()
    }

    if (
      prevProps.readOnly !== this.props.readOnly ||
      prevProps.model !== this.props.model
    ) {
      this.renderEditor()
    }

    if (prevProps.activityId !== this.props.activityId) {
      this.renderEditor()
    }

    if (prevState.dragging !== this.state.dragging) {
      this.renderEditor()
    }

    if (
      this.state.newActivity &&
      this.state.newActivity.id === this.props.activityId
    ) {
      this.setState({
        newActivity: null,
      })
    }
  },

  componentWillUnmount: function() {
    ReactDOM.unmountComponentAtNode($('.bpmn-editor-outer-container').get(0))
  },

  render: function() {
    // as we need to calculate the top margin using the rendered DOM nodes
    // we have to skip the initial render cycle for all parts that rely on
    // that top marging to be available
    return (
      <div className="application-process-flow">
        {this.renderPalette()}
        {this.state.isMounted && this.renderActivity()}
        {this.state.isMounted && this.renderHint()}
        {this.state.isMounted && this.renderError()}
      </div>
    )
  },

  renderPalette: function() {
    if (this.props.readOnly) {
      return
    }

    return (
      <Palette
        {...this.props}
        disabled={this.props.disabled || this.state.loading || this.state.error}
        ref="palette"
        onAdd={this.handleAdd}
        onDrag={this.handleDrag}
        onDrop={this.handleDrop}
      />
    )
  },

  renderHint: function() {
    if (this.state.loading) {
      return
    }

    var activities = this.props.model.get('activities')

    if (activities && activities.length > 0) {
      return
    }

    return (
      <Hint>
        {i18n('Drag or click action type above.')}
      </Hint>
    )
  },

  renderError: function() {
    if (!this.state.error) {
      return
    }

    return (
      <Hint modal={true} error={true} buttons={this.renderButtons()}>
        {i18n(
          'Your version of the process is out of date. This error normally occurs when another person is also editing the process.'
        )}
      </Hint>
    )
  },

  renderButtons: function() {
    return (
      <button
        className="btn btn-text btn-eff-primary col-xs-12"
        onClick={this.openProcessList}
      >
        {i18n('Close this process')}
      </button>
    )
  },

  openProcessList: function(event) {
    event.preventDefault()

    Router.navigate(Router.reverse('processes'), {
      trigger: true,
    })
  },

  renderEditor: function() {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      React.createElement(Editor, {
        model: this.props.model,
        activity: this.getActivity(),
        dragging: this.state.dragging,
        applicationHeight: this.getTopMargin(),
        readOnly: this.props.readOnly,
        // onRemove: this.handleRemove,
        onSelect: this.handleEditorSelect,
        onLoad: this.handleEditorLoad,
        onDrag: this.handleDrag,
        onDrop: this.handleDrop,
        onShapeAdd: this.handleEditorShapeAdd,
        onScroll: this.handleScroll,
        onError: this.handleEditorError,
      }),
      $('.bpmn-editor-outer-container').get(0)
    )
  },

  handleEditorSelect: function(activity) {
    this.handleToggle(activity, !!activity)
  },

  handleEditorError: function() {
    this.trySetState({
      error: true,
    })
  },

  handleEditorLoad: function() {
    this.setState({
      loading: false,
    })
  },

  renderActivity: function() {
    const { readOnly, model, tab } = this.props
    const { loading, dragging } = this.state

    const activity = this.getActivity()

    if (!activity || loading || dragging) {
      return
    }

    return (
      <div className="activity-list activity-list-flow">
        <Activity
          key={activity.id}
          isNew={this.state.newActivity === activity}
          style={this.calculateStyle()}
          readOnly={readOnly}
          variableCollection={model.get('variables')}
          model={activity}
          tab={tab}
          onRemove={this.handleRemove}
          onToggle={this.handleToggle}
          onMorph={type => this.handleMorph(activity, type)}
        />
      </div>
    )
  },

  convertToUserTask: function(activity, newActivity, model) {
    // Convert activity's decision variable back to no-list (if needed)
    const activityFields = newActivity.get('form').get('fields').toArray()
    forEach(activityFields, field => {
      const globalVariable = model
        .get('variables')
        .get(field.get('binding').get('expression'))
      const globalVariableType = globalVariable.get('type').toJSON()
      if (
        dataTypeUtils.isList(globalVariableType) &&
        globalVariable.get('isManualDecision')
      ) {
        globalVariable.set('type', globalVariableType.elementType)
      }
    })
  },

  convertToMIUserTask: function(activity, newActivity, model) {
    // Create activity's local variables and map targetCollectionId as list
    let localVariables = []
    forEach(newActivity.get('variables'), variable => {
      const globalVariable = model
        .get('variables')
        .get(variable.targetCollectionId)
      const globalVariableType = globalVariable.get('type').toJSON()

      const newLocalVariable = {
        ...variable,
        type: dataTypeUtils.isList(globalVariableType)
          ? globalVariableType.elementType
          : globalVariableType,
      }

      globalVariable.set('type', {
        name: 'list',
        elementType: newLocalVariable.type,
      })

      localVariables = [...localVariables, newLocalVariable]
    })

    newActivity.set('variables', localVariables)
  },

  handleMorph: function(activity, type) {
    const { model } = this.props
    const cache = UniqueModel.getModelCache('Action')

    model.get('activities').remove(activity.id, { silent: true })

    delete cache.instances[activity.id]

    model.get('activities').add({
      id: activity.id,
      name: activity.get('name'),

      type,
    })

    const newActivity = model.get('activities').get(activity.id)

    model.get('transitions').each(transition => {
      if (transition.get('from') === activity) {
        transition.set('from', newActivity)
      }

      if (transition.get('to') === activity) {
        transition.set('to', newActivity)
      }
    })

    if (newActivity.get('type').get('key') === 'userTask') {
      this.convertToUserTask(activity, newActivity, model)
    }

    if (newActivity.get('type').get('key') === 'multiInstanceUserTask') {
      this.convertToMIUserTask(activity, newActivity, model)
    }

    model.get('diagram').morph(newActivity)

    model.save()
  },

  handleToggle: function(activity, open) {
    if (activity !== this.state.newActivity || !open) {
      this.setState({
        newActivity: null,
      })
    }

    if (this.props.onSelect) {
      this.props.onSelect(activity, open)
    }
  },

  calculateStyle: function() {
    var node = this.props.model
      .get('diagram')
      .findNodeById(this.getActivity().id)

    if (!node) {
      return {}
    }

    // move it underneath the current shape
    var top = node.get('bounds').lowerRight().y - 2 * this.getTopMargin()

    // padding
    top += 30
    return {
      top: top,
      width: '100%',
      marginBottom: 300,
      position: 'absolute',
    }
  },

  handleRemove: function(activity) {
    this.props.model.removeActivity(activity)
  },

  handleAdd: function(activity) {
    this.addActivity(activity)
    this.props.model.save()
  },

  getTopMargin: function() {
    if (!this.state.isMounted) {
      return null
    }

    if (!this.refs.palette) {
      return $(ReactDOM.findDOMNode(this)).offset().top
    }

    var palette = $(ReactDOM.findDOMNode(this.refs.palette))

    return palette.offset().top + palette.outerHeight()
  },

  handleDrag: function() {
    $('.outermost-container').addClass('dragging')

    this.trySetState({
      dragging: true,
    })
  },

  handleDrop: function(activity, sortPosition, uiPosition) {
    $('.outermost-container').removeClass('dragging')

    this.trySetState({
      dragging: false,
    })

    if (activity) {
      var dy = uiPosition.top - this.getTopMargin()

      this.addActivity(activity, {
        x: uiPosition.left + this.state.scrollPosition,
        y:
          2 * this.getTopMargin() +
          dy +
          Node.getDimensions(activity).height / 2,
      })
    }
  },

  handleScroll: function(position) {
    this.trySetState({
      scrollPosition: position,
    })
  },

  handleEditorShapeAdd: function(source, targetRef) {
    const newActivity = this.props.model.addFollowing(source, targetRef)
    this.props.model.save()
    this.setState({
      newActivity,
    })
  },

  addActivity: function(activity, position) {
    this.props.model.addActivity(activity, {
      position: position,
      nextTo: !position && this.getActivity(),
    })
    this.setState({
      newActivity: activity,
    })
  },

  getActivity: function() {
    return this.props.model.get('activities').get(this.props.activityId)
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/edit/ActionsFlowView.js