// @flow
import i18n from 'signavio-i18n'
import React from 'react'

import createReactClass from 'create-react-class'

import Router from 'singleton/Router'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { Tab, TabBar } from '@signavio/effektif-commons/lib/components/tabs'

import { AccessRights, Reminders } from '../usertask'

import Form from './Form'
import General from './General'
import Results from './Results'

type PropsT = {
  tab: string,
}

export default createReactClass({
  displayName: 'MultiInstanceTask',

  mixins: [BaseMixin],

  render() {
    const { model, readOnly, variableCollection } = this.props

    const activeTab = getActiveTab(this.props)

    return (
      <div>
        <TabBar>
          <a href={getUrl('general', model)}>
            <Tab {...getTabProps(activeTab, 'general')}>{i18n('General')}</Tab>
          </a>
          <a href={getUrl('form', model)}>
            <Tab {...getTabProps(activeTab, 'form')}>{i18n('Form')}</Tab>
          </a>
          <a href={getUrl('results', model)}>
            <Tab {...getTabProps(activeTab, 'results')}>{i18n('Results')}</Tab>
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
          <General
            readOnly={readOnly}
            model={model}
            task={model.toJSON()}
            onChange={changes => {
              model.set(changes)
              model.save()
            }}
          />
        )}

        {activeTab === 'form' && (
          <Form
            readOnly={readOnly}
            activity={model}
            variableCollection={variableCollection}
          />
        )}

        {activeTab === 'results' && (
          <Results
            globalVariables={variableCollection.toJSON()}
            localVariables={model.get('variables') || []}
            onChange={(globalVariableId, newValue) => {
              const globalVariable = variableCollection.find(
                variable => variable.id === globalVariableId
              )
              globalVariable.set('name', newValue)
              globalVariable.save()
            }}
            readOnly={readOnly}
          />
        )}

        {activeTab === 'reminders' && (
          <Reminders
            readOnly={readOnly}
            action={model.toJSON()}
            onChange={changes => {
              model.set(changes)
              model.save()
            }}
          />
        )}

        {activeTab === 'access' && (
          <AccessRights readOnly={readOnly} model={model} />
        )}
      </div>
    )
  },
})

const getTabProps = (activeTab: string, id: string) => ({
  active: activeTab === id,
  style: {
    flap: { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
  },
})

const getUrl = (key: string, model) =>
  Router.reverse('process', {
    id: model.getProcess().id,
    tab: 'actions',
    sub: model.id,
    actionsub: key,
  })

const getActiveTab = ({ tab, model }: PropsT) => {
  if (tab) {
    return tab
  }

  if (model.get('form') && model.get('form').fields.length > 0) {
    return 'form'
  }

  return 'general'
}



// WEBPACK FOOTER //
// ./src/activities/views/activities/multiInstance/MultiInstance.js