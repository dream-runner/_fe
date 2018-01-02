import i18n from 'signavio-i18n'
import PropTypes from 'prop-types'
import React from 'react'

import createReactClass from 'create-react-class'

import Router from 'singleton/Router'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { Feature } from '@signavio/effektif-commons/lib/components'
import { Tab, TabBar } from '@signavio/effektif-commons/lib/components/tabs'

import Activity from '../../../models/Activity'

import General from './General'
import AccesRights from './AccessRightsView'
import Reminders from './Reminders'
import Form from './Form'

module.exports = createReactClass({
  displayName: 'UserTaskView',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(Activity).isRequired,
  },

  render() {
    const { model, readOnly, variableCollection } = this.props

    const activeTab = getActiveTab(this.props)

    return (
      <div className="user-task">
        <TabBar>
          <a href={getUrl('general', model)}>
            <Tab {...getTabProps(activeTab, 'general')}>{i18n('General')}</Tab>
          </a>
          <a href={getUrl('form', model)}>
            <Tab {...getTabProps(activeTab, 'form')}>{i18n('Form')}</Tab>
          </a>
          <a href={getUrl('reminders', model)}>
            <Tab {...getTabProps(activeTab, 'reminders')}>
              {i18n('Reminders')}
            </Tab>
          </a>
          <a href={getUrl('access', model)}>
            <Tab {...getTabProps(activeTab, 'access')}>
              {i18n('Access Rights')}
            </Tab>
          </a>
        </TabBar>

        {activeTab === 'general' && (
          <General readOnly={readOnly} model={model} />
        )}

        {activeTab === 'form' && (
          <Form
            readOnly={readOnly}
            model={model}
            variableCollection={variableCollection}
          />
        )}

        {activeTab === 'reminders' && (
          <Feature sneakPeek feature="Component.EscalationManagement">
            <Reminders
              readOnly={readOnly}
              action={model.toJSON()}
              onChange={changes => {
                model.set(changes)
                model.save()
              }}
            />
          </Feature>
        )}

        {activeTab === 'access' && (
          <Feature sneakPeek feature="Component.AccessRights">
            <AccesRights readOnly={readOnly} model={model} />
          </Feature>
        )}
      </div>
    )
  },
})

const getTabProps = (activeTab, id) => ({
  active: activeTab === id,
  style: {
    flap: { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
  },
})

const getUrl = (key, model) =>
  Router.reverse('process', {
    id: model.getProcess().id,
    tab: 'actions',
    sub: model.id,
    actionsub: key,
  })

const getActiveTab = ({ tab, model }) => {
  if (tab) {
    return tab
  }

  if (model.get('form') && model.get('form').get('fields').length > 0) {
    return 'form'
  }

  return 'general'
}



// WEBPACK FOOTER //
// ./src/activities/views/activities/usertask/User.js