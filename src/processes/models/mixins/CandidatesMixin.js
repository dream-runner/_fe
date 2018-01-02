import _ from 'underscore'
import { Sorting } from 'commons-utils'
import UserCollection from 'users/collections/UserCollection'
import GroupCollection from 'users/collections/GroupCollection'

// A mixin used for managing candidates of the user type model and the task model
module.exports = {
  references: {
    candidates: UserCollection,
    candidateGroups: GroupCollection,
  },

  defaults: {
    candidates: [],
    candidateGroups: [],
  },

  getCandidates: function() {
    return this.get('candidates')
      .toArray()
      .concat(this.get('candidateGroups').toArray())
  },

  getCandidateGroups: function() {
    return this.get('candidateGroups').toArray()
  },

  getCandidateUsers: function() {
    return this.get('candidates').toArray()
  },

  getCandidatesExpanded: function() {
    var users = this.get('candidates').toArray()
    var groups = this.get('candidateGroups').toArray()

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
      return candidate.id === user.id
    })
  },

  addCandidate: function(candidate, isGroup) {
    var attr = isGroup ? 'candidateGroups' : 'candidates'
    this.get(attr).add(candidate)
  },

  removeCandidate: function(candidate, isGroup) {
    var attr = isGroup ? 'candidateGroups' : 'candidates'
    this.get(attr).remove(candidate)
  },
}



// WEBPACK FOOTER //
// ./src/processes/models/mixins/CandidatesMixin.js