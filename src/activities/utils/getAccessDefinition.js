// @flow
import React from 'react'

import i18n from 'signavio-i18n'

export default () => ({
  order: ['edit', 'view'],
  defaults: ['view'],
  rights: {
    edit: {
      title: i18n('Edit task'),
      icon: 'fa-pencil',
      description: (
        <ul>
          <li>{i18n('edit the title')}</li>
          <li>{i18n('change the assignment')}</li>
          <li>{i18n('change the due date')}</li>
          <li>{i18n('create subtasks')}</li>
        </ul>
      ),
      implies: ['view'],
      inherits: {
        process: 'casesEdit',
      },
    },
    view: {
      title: i18n('View task'),
      description: (
        <ul>
          <li>{i18n('review the task')}</li>
          <li>{i18n('participate in discussion about this task')}</li>
        </ul>
      ),
      icon: 'fa-eye',
      inherits: {
        process: 'casesView',
      },
    },
  },
})



// WEBPACK FOOTER //
// ./src/activities/utils/getAccessDefinition.js