import UniqueModel from 'uniquemodel'
import $ from 'jquery'
import { some } from 'lodash'

import Effektif from 'singleton/Effektif'
import Login from 'singleton/Login'

import { getRights } from '../../../packages/access'

import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import User from 'users/models/User'
import Group from 'users/models/Group'
import Form from 'forms/models/Form'

import Process from 'processes/models/Process'

/**
     * A piece of work that has to be manually completed by a User
     *
     */
var Task = UniqueModel(
  BaseModel.extend({
    urlRoot: function() {
      return Effektif.makeUrl('tasks')
    },

    mixinSupportedMethods: _.union(BaseModel.prototype.mixinSupportedMethods, [
      'getRights',
    ]),

    references: {
      assignee: User,
      assigneeGroup: Group,
      subtasks: function() {
        return require('tasks/collections/TaskCollection')
      },
      parent: function() {
        return require('tasks/models/Task')
      },
      case: function() {
        return require('cases/models/Case')
      },
      sourceWorkflow: Process,
    },

    embeddings: {
      form: Form,
    },

    inlineJSON: ['form.button'],

    defaults: {
      candidates: { items: [], count: 0 },
      subtasks: [],
    },

    getRights: function() {
      return getRights(this.get('access'), 'edit', 'view')
    },

    isPrivate: function() {
      return !!this.get('access')
    },

    isAssignee: function(user) {
      return this.get('assigneeId') === user.id
    },

    hasForm: function() {
      return !!this.get('form') || !!this.get('hasForm')
    },

    isMine: function() {
      return this.isAssignee(Login.user())
    },

    isCandidate(user) {
      return !!some(
        this.get('candidates').items,
        candidate => candidate.id === user.id
      )
    },

    isAssigneeGroup: function(groupIds = []) {
      const assigneeGroup = this.get('assigneeGroup')
      return (
        !!assigneeGroup &&
        some(groupIds, groupId => groupId === assigneeGroup.id)
      )
    },

    hasCandidates: function() {
      return this.get('candidates').count > 0
    },

    hasAssigneeGroup: function() {
      return !!this.get('assigneeGroup')
    },

    isOurs: function() {
      return !this.isMine() && this.isCandidate(Login.user())
    },

    isUnassigned: function() {
      return !this.get('assignee')
    },

    assignmentSpecified: function() {
      var candidates = this.get('candidates').items
      return this.get('assignee') || candidates.length > 0
    },

    isOpen: function() {
      return !this.isClosed()
    },

    isClosed: function() {
      return !!this.get('completed')
    },

    isCompletable: function() {
      return !this.get('uncompletable') && !this.get('canceled')
    },

    assignTo: function(user) {
      if (user && this.get('assigneeId') === user.id) {
        return
      }

      const assignSubtasks = this.get('subtasks').every(subtask => {
        return (
          subtask.get('completed') ||
          !subtask.get('assignee') ||
          subtask.get('assignee') === this.get('assignee')
        )
      }, this)

      this.set('assigneeId', user ? user.id : null)

      if (assignSubtasks) {
        this.get('subtasks').each(subtask => {
          if (!subtask.get('completed')) {
            subtask.assignTo(user)
          }
        })
      }
    },

    unassign: function() {
      this.assignTo(null)
    },

    unassignGroup: function() {
      this.set('assigneeGroup', null)
    },

    checkPrivate(user) {
      const assigneeId = this.get('assigneeId')

      if (assigneeId === user.id) {
        return true
      }

      return false
    },

    canCompleteTask(user) {
      if (this.isPrivate()) {
        return this.checkPrivate(user)
      }

      return true
    },

    canAssign: function(user) {
      if (this.get('canceled')) {
        return false
      }

      if (!this.isPrivate()) {
        return true
      }

      var rights = this.getRights()

      if (rights.edit) {
        return true
      }

      if (!this.get('assignee')) {
        if (this.hasAssigneeGroup()) {
          return this.isAssigneeGroup(user.groupIds)
        }
        return this.isCandidate(user)
      }

      return this.isAssignee(user)
    },

    willUserHaveAccess: function(user) {
      const rights = this.getRights()

      if (rights.edit) {
        return true
      }

      if (this.hasAssigneeGroup()) {
        return this.isAssigneeGroup(user.groupIds)
      }

      if (rights.view) {
        return false
      }

      return this.isCandidate(user)
    },

    willGroupHaveAccess: function(user, targetGroupId) {
      const rights = this.getRights()

      if (rights.edit) {
        return true
      }

      return some(user.groupIds || [], groupId => groupId === targetGroupId)
    },

    canAddSubtasks: function() {
      if (!this.isPrivate()) {
        return true
      }

      var rights = this.getRights()

      if (rights.edit) {
        return true
      }

      return this.canCompleteTask()
    },

    hasFormButtons: function(form) {
      var buttons = form.get('buttons')

      return buttons && buttons.length > 0
    },

    hasOpenSubtasks: function() {
      if (!this.get('subtasks')) return false
      return this.get('subtasks').some(subtask => {
        return !subtask.get('completed')
      })
    },

    showDoneButton: function(user) {
      var form = this.get('form')

      if (form) {
        if (this.hasFormButtons(form)) {
          return false
        }

        // if(this.get("completed")) {
        //     return false;
        // }
      }

      if (this.get('completed')) {
        if (this.isPrivate()) {
          var rights = this.getRights()

          if (!this.isAssignee(user) && !rights.edit) {
            return false
          }
        }
      } else {
        if (!this.canCompleteTask(user)) {
          return false
        }
      }

      if (this.hasCandidates() || this.hasAssigneeGroup()) {
        if (this.isPrivate()) {
          return this.isAssignee(user)
        }
      }

      return true
    },

    complete: function(success, error) {
      if (this.get('completed')) {
        throw new Error('Cannot complete a completed task')
      }

      this.set('completed', true)
      this.completeSubtasks()

      var sendRequest = fields => {
        $.post(`${this.url()}/complete`, fields ? JSON.stringify(fields) : {})
          .done(() => {
            this.set('form', null)
            success && success()
          })
          .fail(() => {
            this.set('completed', false)
            error && error()
          })
      }

      const form = this.get('form')

      if (form) {
        sendRequest(form.get('fields'))
      } else {
        sendRequest()
      }
    },

    reopen: function(success, error) {
      if (!this.get('completed')) {
        throw new Error('Cannot reopen an open task')
      }

      this.set('completed', false)

      $.post(this.url() + '/reopen')
        .done(success)
        .fail(() => {
          this.set('completed', true)
          error && error()
        })
    },

    createSubtask: function(task, clb) {
      if (!task.get('name')) {
        return
      }

      task.set({
        parent: this,
        case: this.get('case'),
      })
      task.once(
        'sync',
        () => {
          this.once('sync', clb)
          this.fetch()
        },
        this
      )

      task.save()
    },

    completeSubtasks: function() {
      this.get('subtasks').each(task => {
        if (task.get('completed')) {
          return
        }

        if (!task.canCompleteTask(Login.user())) {
          return
        }

        task.complete()
      })
    },
  }),
  'Task'
)

module.exports = Task



// WEBPACK FOOTER //
// ./src/tasks/models/Task.js