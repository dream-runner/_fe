import React from 'react'
import createReactClass from 'create-react-class'
import Color from 'color'

import i18n from 'signavio-i18n'

import { getTheme, utils } from '@signavio/effektif-commons/lib/styles'
import { SecondaryHeader } from '@signavio/effektif-commons/lib/components/headers'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'
import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'

import Login from 'singleton/Login'
import Router from 'singleton/Router'

import TaskAssignment from './TaskAssignment'

import DueDate from './DueDateView'

module.exports = getTheme(
  createReactClass({
    displayName: 'TaskHeader',

    mixins: [BaseMixin],

    render() {
      const { model, disabled, readOnly, canAssign, theme } = this.props

      return (
        <div className="task-header">
          <IconButton
            light
            icon="list"
            href={Router.reverse('case', { id: model.get('case').id })}
            style={{
              display: 'block',
              width: '50%',

              marginBottom: -1,
            }}
          >
            {i18n('Show all tasks in this case')}
          </IconButton>

          <SecondaryHeader
            style={
              disabled && {
                value: {
                  backgroundColor: theme.color.mono.light,
                  color: utils.textColor(theme.color.mono.light),
                },
                input: {
                  backgroundColor: theme.color.mono.light,

                  ':hover': {
                    backgroundColor: Color(theme.color.mono.light)
                      .lighten(0.03)
                      .string(),
                  },
                  ':focus': {
                    backgroundColor: Color(theme.color.mono.light)
                      .lighten(0.03)
                      .string(),
                  },
                },
              }
            }
            readOnly={readOnly || disabled}
            value={model.get('name')}
            onChange={ev => model.set('name', ev.target.value)}
            onBlur={() => model.save()}
            placeholder={i18n('What is specific for this task?')}
            toolbar={
              <div className="toolbar">
                <div className="row">
                  <div className="col-sm-6">
                    <TaskAssignment
                      model={model}
                      disabled={disabled}
                      readOnly={!canAssign}
                    />
                  </div>

                  <div className="col-sm-6">
                    <DueDate model={model} readOnly={readOnly || disabled} />
                  </div>
                </div>
              </div>
            }
          />
        </div>
      )
    },
  })
)



// WEBPACK FOOTER //
// ./src/tasks/views/TaskHeaderView.js