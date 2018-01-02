import Effektif from 'singleton/Effektif'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import Task from 'tasks/models/Task'

/**
     * A collection of tasks
     */
module.exports = BaseCollection.extend({
  urlRoot: function() {
    return Effektif.makeUrl('tasks')
  },
  model: Task,
})



// WEBPACK FOOTER //
// ./src/tasks/collections/TaskCollection.js