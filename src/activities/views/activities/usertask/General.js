import _ from 'underscore'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import Router from 'singleton/Router'

import { BaseMixin } from 'commons-mixins'

import CandidatesEdit from 'processes/views/CandidatesEditView'

import { ContextHelp, BindingsTextInput } from 'commons-components'
import { ActionTile } from 'commons-components/tiles'

import { ConfigurationBody } from '../components'

import RoleSelect from './RoleSelectView'

module.exports = createReactClass({
  displayName: 'UserTaskAssignmentView',

  mixins: [BaseMixin],

  render: function() {
    return (
      <ConfigurationBody>
        <div className="row">
          <div className="col-sm-6">
            {this.renderCandidates()}

            <h5 style={{ marginTop: 30 }}>
              {i18n('Task name template')}
            </h5>

            <p>
              {i18n(
                'If you want to use a customized name for your tasks, you can use the task name template. In there you can reference form fields from the process.'
              )}
            </p>

            <BindingsTextInput
              className="task-name-template"
              singleLine
              readOnly={this.props.readOnly}
              placeholder={i18n(
                'The name which will be used when this task is created'
              )}
              value={this.props.model.get('taskName')}
              onChange={value => this.props.model.set('taskName', value)}
              bindables={this.props.model.getProcess().getBindables()}
              onBlur={() => this.props.model.save()}
            />
          </div>
          <div className="col-sm-6">
            {this.renderRoles()}
          </div>
        </div>
      </ConfigurationBody>
    )
  },

  renderCandidates: function() {
    return (
      <div className="candidates">
        <h5>
          {i18n('Candidates for this task')}
          {this.renderCandidatesHelp()}
        </h5>
        <p>
          {this.renderDescription()}
        </p>

        <CandidatesEdit
          model={this.props.model}
          onChange={this.saveModel}
          readOnly={this.props.readOnly}
        />
      </div>
    )
  },

  renderCandidatesHelp: function() {
    var role = this.props.model.getRole()

    if (role) {
      return (
        <ContextHelp placement="top" title={i18n('Candidates for a role')}>
          {i18n(
            'Specify multiple people to set them as role candidates. All candidates are notified.  The one that takes the first task is automatically assigned to all subsequent tasks in this role.'
          )}
        </ContextHelp>
      )
    }

    return (
      <ContextHelp placement="top" title={i18n('Candidates')}>
        <p>{i18n('Specify one person to assign the tasks to that person.')}</p>
        <p>
          {i18n(
            'Specify multiple people to set them as candidates. All candidates are notified and one of them must take the task.'
          )}
        </p>
      </ContextHelp>
    )
  },

  renderDescription: function() {
    var role = this.props.model.getRole()

    if (role) {
      return i18n(
        'Select the assignee for this task or specify a group of candidates for the role "__role__"',
        {
          role: role.get('name'),
        }
      )
    }

    return i18n(
      'Select the assignee for this task or specify a group of candidates'
    )
  },

  renderRoles: function() {
    return (
      <div className="roles">
        <h5>
          {i18n('Assign using a role')}
          <ContextHelp
            chapter="processes"
            section="roles"
            placement="top"
            title={i18n('Use roles to share assignments with other tasks')}
          >
            <p>
              {i18n(
                "Specify a role (e.g. 'Reviewer') when multiple tasks should be completed by the same person. The first task is offered to all specified candidates.  Subsequent tasks will be assigned to the person taking the first task."
              )}
            </p>
          </ContextHelp>
        </h5>

        <RoleSelect readOnly={this.props.readOnly} model={this.props.model} />

        {this.renderRoleTasks()}
      </div>
    )
  },

  renderRoleTasks: function() {
    var role = this.props.model.getRole()
    if (!role) {
      return
    }

    var otherTasks = this.props.model
      .getProcess()
      .get('activities')
      .filter(act => {
        return (
          act !== this.props.model &&
          act.get('type').get('key') === 'userTask' &&
          act.getRole() === role
        )
      }, this)
    if (otherTasks.length === 0) {
      return
    }

    return (
      <div className="tasks-with-same-role">
        <h6>{i18n('Other tasks assigned to this role:')}</h6>
        {_.map(otherTasks, this.renderRoleTask)}
      </div>
    )
  },

  renderRoleTask: function(task) {
    var url = Router.reverse('process', {
      id: this.props.model.getProcess().id,
      tab: 'actions',
      sub: task.id,
    })
    return (
      <a href={url}>
        <ActionTile
          small
          key={task.id}
          icon={task.get('type').get('icon')}
          style={{
            icon: {
              backgroundColor: 'transparent',
            },
          }}
        >

          {task.getName()}
        </ActionTile>
      </a>
    )
  },
})



// WEBPACK FOOTER //
// ./src/activities/views/activities/usertask/General.js