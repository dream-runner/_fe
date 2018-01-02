import _ from 'underscore'
import { unionBy } from 'lodash'

import Login from 'singleton/Login'

import { Sorting } from 'commons-utils'

import Form from 'formdefinitions/models/Form'

import { getRightsFromOverview } from '../../../../packages/access'

import { getAccessDefinition } from '../../utils'

// a mixin for the Activity model
// adds the methods that are specific to userTask type
module.exports = {
  defaults: {
    description: '',
    form: {},
  },

  embeddings: {
    form: Form,
  },

  isPrivate: function() {
    return !!this.get('access')
  },

  isPublic: function() {
    return !this.isPrivate()
  },

  makePrivate: function() {
    this.set('access', this.getDefaultAccess(Login.user()))
  },

  makePublic: function() {
    this.set('access', null)
  },

  getRights: function(entity) {
    return getRightsFromOverview(
      this.get('access'),
      getAccessDefinition().order,
      entity
    )
  },

  // derives a default access object from the cases access rights of the process
  getDefaultAccess(user) {
    const process = this.getProcess()
    const access = (process && process.get('access')) || {}

    if (!user) {
      return {
        edit: access.casesEdit || [],
        view: access.casesView || [],
      }
    }

    return {
      edit: unionBy(access.casesEdit, [{ id: user.id, type: 'user' }], 'id'),
      view: unionBy(access.casesView, [{ id: user.id, type: 'user' }], 'id'),
    }
  },

  getRole: function() {
    return this.get('assigneeId') && this.get('assigneeId').get('variable')
  },

  getCandidates: function() {
    return this.getCandidateUsers().concat(this.getCandidateGroups())
  },

  // Returns the an array of all users, also those including the expanded members of candidate groups
  getCandidatesExpanded: function() {
    var role = this.getRole()
    if (role) {
      return role.get('type').getCandidatesExpanded()
    }

    var users = this.get('candidateIds').pluck('value')
    var groups = this.get('candidateGroupIds').pluck('value')

    var candidates = users

    _.each(groups, group => {
      candidates = candidates.concat(group.members())
    })

    return _.uniq(Sorting.users(candidates))
  },

  hasCandidates: function() {
    return this.getCandidatesExpanded().length > 0
  },

  isCandidate: function(user) {
    return !!_.some(this.getCandidatesExpanded(), candidate => {
      return candidate === user
    })
  },

  getCandidateUsers: function() {
    var role = this.getRole()
    if (role) {
      return role.get('type').get('candidates').models
    }

    return this.get('candidateIds').pluck('value')
  },

  getCandidateGroups: function() {
    var role = this.getRole()
    if (role) {
      return role.get('type').get('candidateGroups').models
    }

    return this.get('candidateGroupIds').pluck('value')
  },

  addCandidate: function(entity, isGroup) {
    var key
    var role = this.getRole()
    if (role) {
      key = isGroup ? 'candidateGroups' : 'candidates'
      role.get('type').get(key).add(entity)
      return
    }

    key = isGroup ? 'candidateGroupIds' : 'candidateIds'
    this.get(key).add({ value: entity })
  },

  removeCandidate: function(entity, isGroup) {
    var key
    var role = this.getRole()
    if (role) {
      key = isGroup ? 'candidateGroups' : 'candidates'
      role.get('type').get(key).remove(entity)
      return
    }

    key = isGroup ? 'candidateGroupIds' : 'candidateIds'
    this.get(key).removeValue(entity)
  },

  getEscalationUsers: function() {
    return this.get('escalateToIds').pluck('value')
  },

  getEscalationGroups: function() {
    return this.get('escalateToGroupIds').pluck('value')
  },

  hasVariablesForReuse: function() {
    return this.getVariablesForReuse().length !== 0
  },

  getVariablesForReuse: function() {
    var vars = this.getVariables()
    var ignoreTypes = ['emailId']

    if (!vars) return []

    vars = vars.filter(variable => {
      // Ignore variables without name
      if (!variable.get('name')) {
        return false
      }
      // ignore unsaved variables
      if (variable.isNew()) {
        return false
      }
      // Ignore variables with unsupported types
      if (
        !variable.get('type') ||
        _.includes(ignoreTypes, variable.get('type').get('name'))
      ) {
        return false
      }
      // ignore variables that are already used in this form
      var used = this.get('form').get('fields').some(field => {
        return (
          field.get('binding') &&
          field.get('binding').get('variable') === variable
        )
      })

      return !used
    }, this)

    return _.sortBy(vars, variable => {
      return (variable.get('name') || '').toLowerCase()
    })
  },
}



// WEBPACK FOOTER //
// ./src/activities/models/mixins/UserTaskMixin.js