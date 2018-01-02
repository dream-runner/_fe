import _ from 'underscore'
import { findIndex, includes, get } from 'lodash'
import i18n from 'i18n'
import Variable from 'processes/models/Variable'
import { VariableUtils } from 'processes/utils'
import { choiceType, dataTypeUtils } from '../../../../packages/fields'
import { formUtils } from '../../../../packages/forms'

const USER_TASK = 'userTask'
const MI_USER_TASK = 'multiInstanceUserTask'

module.exports = {
  references: {
    defaultTransition: function() {
      return require('processes/models/Transition')
    },
  },

  initListeners: function() {
    this.on('connect', this.handleConnect, this)
    this.on('unconnect', this.handleUnconnect, this)
    this.on('reconnect', this.handleReconnect, this)

    if (this.isManualDecision()) {
      this.updateManualDecisionOptions()
      this.updateManualDecisionButtons()
      this.updateDecisionVariableName()
    } else if (this.isAutoPossible()) {
      this.initAutoConditions()
    }

    this.on('change:name', this.updateDecisionVariableName)
  },

  isForking: function() {
    return this.getNextActivities().length > 1
  },

  isMerging: function() {
    return this.getPreviousActivities().length > 1
  },

  isManualPossible: function() {
    const previous = this.getPreviousActivities()
    const previousUserTasks = this.getPreviousActivities(USER_TASK)
    const allPreviousAreUserTasks = previous.length === previousUserTasks.length

    const previousMITasks = this.getPreviousActivities(MI_USER_TASK)
    const allPreviousAreMITasks = previous.length === previousMITasks.length

    return (
      this.isForking() &&
      previous.length >= 1 &&
      (allPreviousAreUserTasks || allPreviousAreMITasks)
    )
  },

  isAutoPossible: function() {
    return this.isForking()
  },

  switchToAuto: function() {
    _.each(this.getPreviousActivities(USER_TASK), userTask =>
      this._removeUserTaskDecisionButtons(userTask)
    )
    _.each(this.getPreviousActivities(MI_USER_TASK), miUserTask =>
      this._removeMIDecisionButtons(miUserTask)
    )
    this.initAutoConditions(true)
  },

  initAutoConditions: function(reset) {
    _.each(
      this.getTransitions('from'),
      transition => {
        if (reset) transition.set('condition', null)
        this._initDefaultCondition(transition)
      },
      this
    )
  },

  switchToManual: function() {
    if (!this.isManualPossible()) {
      throw new Error('Cannot switch to manual decision')
    }

    if (this.isManualDecision()) {
      return
    }

    _.each(this.getTransitions('from'), transition => {
      transition.set('condition', null)
    })

    this.updateManualDecisionOptions()
    this.updateManualDecisionButtons()
    this.updateDecisionVariableName()
  },

  isManualDecision: function() {
    if (!this.isManualPossible()) {
      return false
    }

    var decisionVar = this.getDecisionVariable()
    if (!decisionVar) {
      return false
    }

    return _.every(
      this.getTransitions('from'),
      transition =>
        !transition.get('condition') ||
        this._transitionHasDecisionVariableCondition(transition, decisionVar) ||
        this._transitionHasMITypeCondition(transition),
      this
    )
  },

  // return the manual decision variable for human decisions,
  // creates a new manual decision variable if the decision has not yet been initialized
  getDecisionVariable: function() {
    var decisionVar = null
    var atLeastOneManualDecisionCondition = _.some(
      this.getTransitions('from'),
      transition => {
        var condition = transition.get('condition')
        decisionVar =
          condition &&
          condition.left &&
          condition.left.expression &&
          this.getProcess().get('variables').get(condition.left.expression)

        return (
          decisionVar &&
          decisionVar.get('isManualDecision') &&
          this._transitionHasDecisionVariableCondition(transition, decisionVar)
        )
      },
      this
    )
    if (atLeastOneManualDecisionCondition) {
      return decisionVar
    }

    var atLeastOneAutomaticCondition = _.some(
      this.getTransitions('from'),
      transition => {
        return !!transition.get('condition')
      },
      this
    )
    if (!atLeastOneAutomaticCondition) {
      const newDecisionVar = new Variable({
        name: this.get('name') || i18n('Decision'),
        isManualDecision: true,
        type: this.isPrecededByMIUserTask()
          ? {
              name: 'list',
              elementType: choiceType([]),
            }
          : choiceType([]),
        nonConfigurable: true,
      })

      return newDecisionVar
    }
  },

  updateDecisionVariableName: function() {
    if (this.isManualDecision()) {
      var decisionVar = this.getDecisionVariable()
      decisionVar.set('name', this.get('name') || decisionVar.get('name'))
    }
  },

  _transitionHasDecisionVariableCondition: function(transition, decisionVar) {
    const condition = transition.get('condition')

    return (
      condition &&
      includes(['allEqual', 'someEqual', 'equals'], condition.type) &&
      condition.left &&
      condition.right &&
      condition.left.expression === decisionVar.id
    )
  },

  _transitionHasMITypeCondition: function(transition) {
    const condition = transition.get('condition')
    return condition && includes(['allEqual', 'someEqual'], condition.type)
  },

  updateMIManualDecisionOptions: function(options) {
    if (!this.isManualDecision()) {
      return
    }

    const decisionVar = this.getDecisionVariable()
    _.each(this.getPreviousActivities(MI_USER_TASK), activity => {
      const fieldDefinitions = get(activity.get('form'), 'fields', [])

      const buttonsField = formUtils.findButtonsField(fieldDefinitions)
      const localVariables = activity.get('variables') || []
      const variableIndex = findIndex(
        localVariables,
        localVariable => buttonsField.binding.expression === localVariable.id
      )

      activity.set({
        variables: [
          ...localVariables.slice(0, variableIndex),
          {
            ...decisionVar.toJSON(),
            type: {
              ...decisionVar.toJSON().type.elementType,
            },
            id: localVariables[variableIndex].id,
            nonConfigurable: false,
            targetCollectionId: decisionVar.get('id'),
          },
          ...localVariables.slice(variableIndex + 1),
        ],
      })
    })
  },

  updateManualDecisionOptions: function() {
    if (!this.isManualDecision()) {
      return
    }

    var decisionVar = this.getDecisionVariable()

    // add the decision var to the var list, if it is not already in there
    var variables = this.getProcess().get('variables')
    if (!variables.includes(decisionVar)) {
      variables.add(decisionVar)
    }

    const isList = dataTypeUtils.isList(decisionVar.get('type').toJSON())
    var options = []
    const originalOptions = isList
      ? decisionVar.get('type').get('elementType').get('options')
      : decisionVar.get('type').get('options')

    // order transitions according to the original options so that the order is preserved in the new options
    var orderedTransitions = _.sortBy(
      this.getTransitions('from'),
      transition => {
        if (
          !this._transitionHasDecisionVariableCondition(transition, decisionVar)
        ) {
          return Infinity
        }
        return _.findIndex(
          originalOptions,
          opt => transition.get('condition').right.value === opt.id
        )
      }
    )

    _.each(
      orderedTransitions,
      (transition, index) => {
        var optionId = this._transitionHasDecisionVariableCondition(
          transition,
          decisionVar
        )
          ? transition.get('condition').right.value
          : transition.id

        var option = originalOptions[index]
        var name = (option && option.name) || ''

        options.push({
          id: optionId,
          name: name,
        })

        const currentType =
          transition.get('condition') && transition.get('condition').type

        transition.set('condition', {
          type: this.isPrecededByMIUserTask()
            ? (includes(['allEqual', 'someEqual'], currentType) &&
                currentType) ||
              'allEqual'
            : 'equals',
          left: { expression: decisionVar.id },
          right: {
            value: optionId,
            type: isList
              ? decisionVar.get('type').get('elementType').toJSON()
              : decisionVar.get('type').toJSON(),
          },
        })
      },
      this
    )

    if (isList) {
      decisionVar.get('type').get('elementType').set('options', options)
    } else {
      decisionVar.get('type').set('options', options)
    }
  },

  updateManualDecisionButtons: function() {
    if (!this.isManualDecision()) {
      return
    }

    var decisionVar = this.getDecisionVariable()

    // add the decision var to the var list, if it is not already in there
    var variables = this.getProcess().get('variables')
    if (!variables.includes(decisionVar)) {
      variables.add(decisionVar)
    }

    _.each(this.getPreviousActivities(USER_TASK), action => {
      var buttonsField = action.get('form').getButtonsField()
      if (
        buttonsField &&
        buttonsField.get('binding').get('variable') === decisionVar
      ) {
        return
      }
      if (buttonsField) {
        action.get('form').get('fields').remove(buttonsField)
      }
      action.get('form').get('fields').add({
        binding: { variable: decisionVar, fields: [] },
        asButtons: true,
      })
    })

    _.each(this.getPreviousActivities(MI_USER_TASK), activity => {
      const fieldDefinitions = get(activity.get('form'), 'fields', [])
      const buttonsField = formUtils.findButtonsField(fieldDefinitions)

      if (
        buttonsField &&
        buttonsField.binding.expression === decisionVar.get('id')
      ) {
        return
      }

      let newFieldDefinitions = fieldDefinitions
      let localVariables = activity.get('variables') || []
      let variableIndex = -1

      if (buttonsField) {
        newFieldDefinitions = formUtils.removeField(
          fieldDefinitions,
          buttonsField.id
        )

        variableIndex = findIndex(
          localVariables,
          localVariable => buttonsField.binding.expression === localVariable.id
        )
      }

      if (variableIndex !== -1) {
        localVariables = [
          ...localVariables.slice(0, variableIndex),
          ...localVariables.slice(variableIndex + 1),
        ]
      }

      const localVariable = {
        ...decisionVar.toJSON(),
        type: dataTypeUtils.isList(decisionVar.get('type').toJSON())
          ? decisionVar.toJSON().type.elementType
          : decisionVar.toJSON().type,
        id: VariableUtils.provideId(),
        targetCollectionId: decisionVar.get('id'),
        nonConfigurable: false,
      }

      const fieldDefinition = {
        binding: {
          expression: localVariable.id,
        },
        id: VariableUtils.provideId(),
        asButtons: true,
      }

      activity.set({
        form: {
          fields: formUtils.addField(newFieldDefinitions, fieldDefinition),
        },
        variables: [...localVariables, localVariable],
      })
    })
  },

  handleConnect: function(gw, transition, target) {
    if (this.isManualDecision()) {
      if (target === 'from') {
        // new outgoing connected: add an option
        this.updateManualDecisionOptions()
      }

      if (target === 'to' || this.getNextActivities().length === 2) {
        // Recreates MI conditions
        if (this.isPrecededByMIUserTask()) {
          this.updateManualDecisionOptions()
        }
        // new incoming connected: add buttons
        // also add buttons when the manual decision is just initialized as the second outgoing has been connected
        this.updateManualDecisionButtons()
      }
    } else if (this.isAutoPossible()) {
      // automatic decision
      if (target === 'from') {
        this.initAutoConditions()
      }
    }
  },

  handleUnconnect: function(gw, transition, target) {
    if (target === 'from') {
      transition.set('condition', null)
      this.updateManualDecisionOptions()
    }

    if (target === 'to') {
      // remove the buttons from the precedding user task, if necessary
      this._removeDecisionButtons(transition.get('from'))
    }
  },

  handleReconnect: function(target, transition, current, previous, role) {
    if (role === 'to') {
      this._removeDecisionButtons(previous)

      // Recreates MI conditions
      if (this.isPrecededByMIUserTask()) {
        this.updateManualDecisionOptions()
      }
      this.updateManualDecisionButtons()
    }
  },

  isPrecededByMIUserTask: function() {
    return this.getPreviousActivities(MI_USER_TASK).length > 0
  },

  _initDefaultCondition: function(transition) {
    if (!transition.get('condition')) {
      transition.set('condition', {
        type: 'and',
        conditions: [{ type: 'equals', left: {}, right: {} }],
      })
    }
  },

  _removeDecisionButtons: function(action) {
    this._removeUserTaskDecisionButtons(action)
    this._removeMIDecisionButtons(action)
  },

  _removeUserTaskDecisionButtons: function(action) {
    if (!action || action.get('type').get('key') !== USER_TASK) {
      return
    }
    var decisionVar = this.getDecisionVariable()
    if (!decisionVar) {
      return
    }

    var buttonsField = action.get('form').get('fields').find(field => {
      return (
        field.get('asButtons') &&
        field.get('binding').get('variable') === decisionVar
      )
    })
    if (buttonsField) {
      action.get('form').get('fields').remove(buttonsField)
    }
  },

  _removeMIDecisionButtons: function(action) {
    if (!action || action.get('type').get('key') !== MI_USER_TASK) {
      return
    }

    const decisionVar = this.getDecisionVariable()
    if (!decisionVar) {
      return
    }

    const fieldDefinitions = get(action.get('form'), 'fields', [])

    const buttonsField = formUtils.findButtonsField(fieldDefinitions)
    if (!buttonsField) {
      return
    }

    const localVariables = action.get('variables') || []
    const variableIndex = findIndex(
      localVariables,
      localVariable => buttonsField.binding.expression === localVariable.id
    )

    action.set({
      form: {
        fields: formUtils.removeField(fieldDefinitions, buttonsField.id),
      },
      variables: [
        ...localVariables.slice(0, variableIndex),
        ...localVariables.slice(variableIndex + 1),
      ],
    })

    this.initAutoConditions(true)
  },
}



// WEBPACK FOOTER //
// ./src/activities/models/mixins/DecisionMixin.js