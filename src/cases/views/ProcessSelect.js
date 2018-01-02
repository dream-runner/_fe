import React, { Component } from 'react'
import i18n from 'signavio-i18n'
import { find, sortBy } from 'lodash'
import { Link } from 'react-router-dom'

import { prependOrg } from '@signavio/effektif-api'

import Router from 'singleton/Router'
import { utils, defaultStyle } from '@signavio/effektif-commons/lib/styles'

import {
  DropDown,
  Icon,
  List,
  Divider,
} from '@signavio/effektif-commons/lib/components'
import {
  ActionTile,
  TextTile,
} from '@signavio/effektif-commons/lib/components/tiles'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

class ProcessSelect extends Component {
  render() {
    return (
      <div className="process-select">
        <h4>{i18n('Cases of')}</h4>

        <DropDown
          closeOnClick
          hideToggleButton
          toggle={open => (
            <TextTile
              key="title"
              className="process-name"
              inline
              style={this.props.style('selectedProcess')}
              toolbar={
                <Icon
                  iconSet="fontAwesome"
                  style={{ float: 'right' }}
                  icon={open ? 'angle-up' : 'angle-down'}
                />
              }
            >
              {this.getTitle()}
            </TextTile>
          )}
        >
          <div className="processes" {...this.props.style('processes')}>
            {this.renderProcesses()}
          </div>

          <Divider />

          <div className="special" {...this.props.style('special')}>
            <List>
              <Link to={prependOrg('/cases/adhoc')}>
                <ActionTile key="adhoc" icon="list">
                  {i18n('Cases without a process')}
                </ActionTile>
              </Link>

              <Link to={prependOrg('/cases/deleted')}>
                <ActionTile key="deleted" iconSet="fontAwesome" icon="question">
                  {i18n('Cases of deleted processes')}
                </ActionTile>
              </Link>
            </List>
          </div>
        </DropDown>
      </div>
    )
  }

  getTitle() {
    const { processId, showDeleted, showAdhoc, info } = this.props

    if (showDeleted) {
      return i18n('Deleted processes')
    }

    if (showAdhoc) {
      return i18n('Ad hoc task lists')
    }

    if (!processId) {
      return i18n('No process selected')
    }

    const selectedEntry = find(info, { editorWorkflowId: processId })

    if (!selectedEntry) {
      return i18n('Selected process does not exist')
    }

    return selectedEntry.editorWorkflow.name
  }

  renderProcesses() {
    const { info } = this.props

    if (info.length === 0) {
      return (
        <Hint info>
          {i18n(
            'No cases have been started yet. Once you start a case (i.e. from the [process list](__listLink__)) you can see them here.',
            {
              listLink: Router.reverse('processes'),
              markdown: true,
            }
          )}
        </Hint>
      )
    }

    return (
      <List>
        {sortBy(info, ({ editorWorkflow }) =>
          editorWorkflow.name.toLowerCase()
        ).map(({ editorWorkflow, open, closed }) => (
          <ActionTile
            key={editorWorkflow.id}
            iconSet="fontAwesome"
            icon="cogs"
            subtitle={i18n('__open__ open / __closed__ closed', {
              open,
              closed,
            })}
            onClick={() => this.handleSelect(editorWorkflow)}
          >
            {editorWorkflow.name.trim() || (
              <Hint inline>{i18n('Unnamed')}</Hint>
            )}
          </ActionTile>
        ))}
      </List>
    )
  }

  handleSelect(process) {
    this.props.onSelect(process)
  }
}

const styled = defaultStyle(({ font, color, padding, lineHeight }) => ({
  selectedProcess: {
    display: 'inline-block',

    width: '100%',
    border: `1px solid ${color.mono.lighter}`,

    paddingTop: padding.xsmall,
    paddingBottom: padding.xsmall,

    marginTop: padding.xsmall,

    fontFamily: font.family.heading,
    fontSize: '30px',
    fontWeight: font.weight.light,

    backgroundColor: 'transparent',

    cursor: 'pointer',

    ...utils.ellipsis(),
    ...utils.transition('box-shadow'),
  },

  ':hover': {
    ...utils.boxShadow(),
  },

  icon: {
    float: 'right',
  },

  body: {
    maxWidth: '100%',

    paddingRight: lineHeight.block,
  },

  main: {
    maxWidth: '100%',

    paddingRight: 0,
  },

  special: {
    marginTop: 1,
  },

  processes: {
    maxHeight: 7.5 * lineHeight.block,

    overflowY: 'auto',
  },
}))

export default styled(ProcessSelect)



// WEBPACK FOOTER //
// ./src/cases/views/ProcessSelect.js