import UniqueModel from 'uniquemodel'
import $ from 'jquery'

import Effektif from 'singleton/Effektif'

import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels

import FieldCollection from 'forms/collections/FieldCollection'
import TaskCollection from 'tasks/collections/TaskCollection'
import TriggerInstance from 'processes/models/TriggerInstance'
import { Process } from 'processes/models'

import { getRights } from '../../../packages/access'

/**
     * A case is a collaboration context for a group of tasks related to a certain topic
     *
     */
module.exports = UniqueModel(
  BaseModel.extend({
    urlRoot: function() {
      return Effektif.makeUrl('cases')
    },

    references: {
      tasks: TaskCollection,
      sourceWorkflow: Process,
    },

    embeddings: {
      values: FieldCollection,
      triggerInstance: TriggerInstance,
    },

    defaults: {
      tasks: [],
      values: [],
      triggerInstance: {},
    },

    inlineJSON: ['triggerInstance'],

    getRights: function() {
      return getRights(this.get('access'), 'edit', 'view')
    },

    createTask: function(task, clb) {
      if (!task.get('name')) {
        return
      }

      task.set('case', this)
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

    cancel: function(success, error, reason) {
      if (this.get('canceled')) {
        return
      }

      this.set('canceled', true)

      $.post(this.url() + '/cancel', JSON.stringify({ reason }), 'json')
        .done(() => {
          this.set('closed', true)
          success && success()
        })
        .fail(() => {
          this.set('canceled', false)
          error && error()
        })
    },
  }),
  'Case'
)



// WEBPACK FOOTER //
// ./src/cases/models/Case.js