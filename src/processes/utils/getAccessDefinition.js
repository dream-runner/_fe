// @flow
import i18n from 'signavio-i18n'

export default () => ({
  rights: {
    edit: {
      title: i18n('Edit process'),
      icon: 'fa-pencil',
      implies: ['start', 'createReports', 'view', 'casesEdit', 'casesView'],
    },
    createReports: {
      icon: 'fa-pie-chart',
      title: i18n('Create reports'),
      implies: ['start', 'view', 'casesEdit', 'casesView'],
    },
    casesEdit: {
      icon: 'fa-edit',
      title: i18n('Edit cases'),
      implies: ['casesView', 'view', 'start'],
    },
    casesView: {
      icon: 'fa-folder-open-o',
      title: i18n('View cases'),
      implies: ['view', 'start'],
      description: i18n(
        'Additionally to users with this right every assignee of a task will be able to see the respective case.'
      ),
    },
    view: {
      icon: 'fa-eye',
      title: i18n('See process'),
      implies: ['start'],
    },
    start: {
      icon: 'fa-play',
      title: i18n('Start process'),
    },
  },
  order: ['edit', 'createReports', 'casesEdit', 'casesView', 'view', 'start'],
  defaults: ['casesView', 'view', 'start'],
})



// WEBPACK FOOTER //
// ./src/processes/utils/getAccessDefinition.js