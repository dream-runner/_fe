import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import _ from 'underscore'
import i18n from 'i18n'

import { User, Group } from 'users/models'

import { BaseMixin } from 'commons-mixins'
import VariableType from 'processes/models/VariableType'
import Action from 'activities/models/Action'

import { UserSelect } from '../../../packages/organizations'

// This component renders a list of candidate users and groups for a model (currently used for userTask Actions and userId VariableTypes)
module.exports = createReactClass({
  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.oneOfType([
      PropTypes.instanceOf(VariableType),
      PropTypes.instanceOf(Action),
    ]).isRequired,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
  },

  getDefaultProps: function() {
    return {
      readOnly: false,
      onChange: function() {},
    }
  },

  render: function() {
    return (
      <UserSelect
        showGroups
        readOnly={this.props.readOnly}
        placeholder={i18n('Select users or groups')}
        onUserSelect={this.addCandidate}
        onGroupSelect={this.addCandidateGroup}
        onRemove={this.removeCandidate}
        items={{
          users: this.props.model.getCandidateUsers(),
          groups: this.props.model.getCandidateGroups(),
        }}
      />
    )
  },

  addCandidate: function(entity) {
    if (!entity) {
      return
    }

    this.props.model.addCandidate(new User(entity), false)
    this.props.onChange()
  },

  addCandidateGroup: function(entity) {
    if (!entity) {
      return
    }

    this.props.model.addCandidate(new Group(entity), true)
    this.props.onChange()
  },

  removeCandidate: function(entity, { isGroup }) {
    this.props.model.removeCandidate(
      new (isGroup ? Group : User)(entity),
      isGroup
    )
    this.props.onChange()
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/CandidatesEditView.js