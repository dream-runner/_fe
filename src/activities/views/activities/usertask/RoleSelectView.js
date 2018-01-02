import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import _ from 'underscore'

import Variable from 'processes/models/Variable'
import Binding from 'processes/models/Binding'

import { getTheme, padding, variables } from 'commons-style'

import { BaseMixin } from 'commons-mixins'
import { InplaceEdit, DropDown, Divider, List } from 'commons-components'
import { Hint } from 'commons-components/hints'
import { ActionTile, TextTile } from 'commons-components/tiles'

module.exports = getTheme(
  createReactClass({
    displayName: 'RoleSelect',

    mixins: [BaseMixin],

    getInitialState: function() {
      return {
        newRoleName: null,
        newRoleOtherTask: null,
      }
    },

    render: function() {
      if (this.props.readOnly) {
        return this.renderReadOnly()
      }

      return (
        <DropDown
          className="role-select"
          toggle={this.renderToggle}
          readOnly={this.props.readOnly}
          style={{ backgroundColor: this.props.theme.color.mono.ultralight }}
          closeOnClick
        >

          <List>
            {this.renderClear()}
            {this.renderAddNew()}
          </List>

          {this.renderAvailableRoles()}
          {this.renderRoleReuse()}
        </DropDown>
      )
    },

    renderReadOnly: function() {
      if (!this.props.model.getRole()) {
        return (
          <TextTile>
            {i18n('No role')}
          </TextTile>
        )
      }

      return (
        <TextTile icon="user">
          {this.props.model.getRole().get('name')}
        </TextTile>
      )
    },

    renderToggle: function(open) {
      const { newRoleName } = this.state

      if (newRoleName !== null) {
        return (
          <InplaceEdit
            editing
            value={newRoleName}
            onChange={ev => this.setState({ newRoleName: ev.target.value })}
            placeholder={i18n('What is the name of this role?')}
            onBlur={this.handleRoleNameInputBlur}
            onClick={this.stopPropagation}
          />
        )
      }

      var role = this.props.model.getRole()
      if (role) {
        return (
          <InplaceEdit
            value={role.get('name')}
            onChange={ev => role.set('name', ev.target.value)}
            placeholder={i18n('What is the name of this role?')}
            onBlur={this.handleRoleNameInputBlur}
            onClick={this.stopPropagation}
          />
        )
      }

      return (
        <Hint
          inline
          style={{
            lineHeight: `${variables.lineHeight.block}px`,
            paddingLeft: padding.normal,
          }}
        >
          {i18n('No role')}
        </Hint>
      )
    },

    renderAvailableRoles: function() {
      var process = this.props.model.getProcess()
      var currentRole = this.props.model.getRole()
      var roles = _.filter(process.getRoles(), role => {
        return role !== currentRole
      })

      if (roles.length === 0) {
        return
      }

      return (
        <List>
          <Divider title={i18n('Select role')} />

          {_.map(roles, this.renderRole)}
        </List>
      )
    },

    renderRoleReuse: function() {
      let process = this.props.model.getProcess()

      var tasks = _.without(
        process.get('activities').filter(act => {
          return act.get('type').id === 'userTask' && !act.getRole()
        }),
        this.props.model
      )

      if (tasks.length === 0) {
        return
      }

      return (
        <List>
          <Divider title={i18n('Use assignment from another task')} />

          {_.map(tasks, this.renderReuseAssignment)}
        </List>
      )
    },

    renderReuseAssignment: function(task) {
      return (
        <ActionTile
          key={task.cid}
          icon={task.get('type').getIcon()}
          onClick={this.addNewRole.bind(null, task)}
        >

          {this.renderTaskName(task)}
        </ActionTile>
      )
    },

    renderClear: function() {
      if (!this.props.model.getRole()) {
        return
      }

      return (
        <ActionTile key="clear" icon="times" onClick={this.clearRole}>

          {i18n('Remove role from this task')}
        </ActionTile>
      )
    },

    renderAddNew: function() {
      return (
        <ActionTile
          key="add-new"
          icon="plus"
          onClick={this.addNewRole.bind(null, this.props.model)}
        >

          {i18n('Create a new role')}
        </ActionTile>
      )
    },

    renderRole: function(role) {
      return (
        <ActionTile
          key={role.cid}
          icon="user"
          onClick={this.selectRole.bind(null, role)}
        >

          {this.renderRoleName(role)}
        </ActionTile>
      )
    },

    renderRoleName: function(role) {
      if (!role.get('name')) {
        return (
          <Hint inline>
            {i18n('Unnamed role')}
          </Hint>
        )
      }

      return role.get('name')
    },

    renderTaskName: function(task) {
      if (!task.get('name')) {
        return (
          <Hint inline>
            {task.getName()}
          </Hint>
        )
      }

      return task.get('name')
    },

    selectRole: function(role) {
      this.props.model.set('assigneeId', new Binding({ variable: role }))
      this.props.model.save()
    },

    clearRole: function() {
      this.props.model.set('assigneeId', null)
      this.props.model.save()
    },

    addNewRole: function(task) {
      this.setState({
        newRoleName: '',
        newRoleOtherTask: task,
      })
    },

    handleRoleNameInputBlur: function() {
      if (this.state.newRoleName === null) {
        this.props.model.save()
        return
      }

      if (this.state.newRoleName.length > 0) {
        // create the role using the candidates of the task
        var role = new Variable({
          name: this.state.newRoleName,
          type: {
            name: 'userId',
            candidates: this.props.model.get('candidateIds').pluck('value'),
            candidateGroups: this.props.model
              .get('candidateGroupIds')
              .pluck('value'),
          },
        })

        // new role: add the variable to the process
        this.props.model.getProcess().get('variables').add(role)
        // assign to this task and the other task
        this.props.model.set('assigneeId', new Binding({ variable: role }))
        if (this.state.newRoleOtherTask) {
          this.state.newRoleOtherTask.set(
            'assigneeId',
            new Binding({ variable: role })
          )
        }
        this.props.model.save()
      }
      // if no name has been entered, the new role will simple be discarded

      this.setState({
        newRoleName: null,
        newRoleOtherTask: null,
      })
    },

    stopPropagation: function(ev) {
      ev.stopPropagation()
    },
  })
)



// WEBPACK FOOTER //
// ./src/activities/views/activities/usertask/RoleSelectView.js