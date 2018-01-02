// @flow
import i18n from 'signavio-i18n'
import React from 'react'
import { omit } from 'lodash'
import { withState, withHandlers, compose } from 'recompose'

import {
  Clearfix,
  TabBar,
  Tab,
  Box,
} from '@signavio/effektif-commons/lib/components'
import {
  TextButton,
  LinkButton,
} from '@signavio/effektif-commons/lib/components/buttons'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import CheckConfiguration from '../CheckConfiguration'

import Editor from './Editor'
import VariableMappings from './VariableMappings'
import Help from './Help'
import TestRuns from './TestRuns'

function ScriptTask({
  model,
  readOnly,
  variableCollection,
  showHelp,
  testRuns,
  testRunning,
  activeTab,
  style,
  onActivateConfiguration,
  onActivateTestRunner,
  onTest,
  onShowHelp,
  onHideHelp,
  onMappingChange,
  onMappingAdd,
  onMappingRemove,
  onChangeScript,
}) {
  return (
    <CheckConfiguration
      service={i18n('Node.js server')}
      isMisconfigured={model.get('type').get('isMisconfigured')}
    >
      <div className="script-task">
        <Box white>
          <Editor
            readOnly={readOnly}
            script={model.get('script').get('script')}
            onChange={onChangeScript}
          />

          <div>
            <div className="pull-right">
              <LinkButton small onClick={onShowHelp}>
                {i18n('Help')}
              </LinkButton>
            </div>

            <Clearfix />
          </div>
        </Box>
        <div {...style('tabBarWrapper')}>
          <TabBar style={style('tabBar')}>
            <Tab
              style={style('tab')}
              active={activeTab === 'configuration'}
              onClick={onActivateConfiguration}
            >
              {i18n('Configuration')}
            </Tab>
            <Tab
              active={activeTab === 'testRunner'}
              style={style('tab')}
              onClick={onActivateTestRunner}
            >
              {i18n('Test runner')}
            </Tab>
          </TabBar>
          <TextButton
            style={style('testButton')}
            primary
            onClick={onTest}
            disabled={testRunning}
          >
            {testRunning ? (
              <Hint loading inline>
                {i18n('Running test...')}
              </Hint>
            ) : (
              i18n('Start new test')
            )}
          </TextButton>
        </div>

        <Box white>
          {activeTab === 'configuration' && (
            <VariableMappings
              readOnly={readOnly}
              mappings={model.get('script').get('mappings')}
              testValues={model.get('testValues')}
              onChange={onMappingChange}
              onMappingAdd={onMappingAdd}
              onMappingRemove={onMappingRemove}
            />
          )}

          {activeTab === 'testRunner' && (
            <TestRuns
              readOnly={readOnly}
              testRuns={testRuns}
              testRunning={testRunning}
            />
          )}
        </Box>

        {showHelp && <Help onRequestHide={onHideHelp} />}
      </div>
    </CheckConfiguration>
  )
}

export default compose(
  withState('showHelp', 'toggleHelp', false),
  withState('testRuns', 'setTestRuns', []),
  withState('testRunning', 'toggleTestRunning', false),
  withState('activeTab', 'setActiveTab', 'configuration'),
  withHandlers({
    onActivateConfiguration: ({ setActiveTab }) => () =>
      setActiveTab('configuration'),
    onActivateTestRunner: ({ setActiveTab }) => () =>
      setActiveTab('testRunner'),
    onTest: ({
      model,
      testRuns,
      toggleTestRunning,
      setTestRuns,
      setActiveTab,
    }) => () => {
      toggleTestRunning(true)

      model.testScript(testRun => {
        toggleTestRunning(false)
        setTestRuns([...testRuns, testRun])
      })

      setActiveTab('testRunner')
    },
    onShowHelp: ({ toggleHelp }) => () => toggleHelp(true),
    onHideHelp: ({ toggleHelp }) => () => toggleHelp(false),
    onMappingChange: ({ model }) => testValues => {
      model.set('testValues', testValues)
      model.save()
    },
    onMappingAdd: ({ model }) => (mapping, variable) => {
      model
        .getProcess()
        .get('variables')
        .add(variable)

      const script = model.get('script')

      script.set('mappings', {
        ...script.get('mappings'),
        ...mapping,
      })

      model.save()
    },
    onMappingRemove: ({ model }) => scriptName => {
      const mappings = model.get('script').get('mappings')
      const testValues = model.get('testValues')

      model.get('script').set('mappings', omit(mappings, scriptName))
      model.set('testValues', omit(testValues, scriptName))
      model.save()
    },
    onChangeScript: ({ model }) => script => {
      model.get('script').set('script', script)
      model.save()
    },
  }),
  defaultStyle(({ padding }) => ({
    tabBarWrapper: {
      position: 'relative',
    },
    testButton: {
      position: 'absolute',
      right: 0,
      top: 0,
    },
    tabBar: {
      marginTop: padding.normal,
    },
    tab: {
      flap: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      },
    },
  }))
)(ScriptTask)



// WEBPACK FOOTER //
// ./src/activities/views/activities/scripttask/Script.js