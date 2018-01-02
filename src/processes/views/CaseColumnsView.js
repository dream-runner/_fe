import i18n from 'i18n'
import React from 'react'
import createReactClass from 'create-react-class'
import {
  keys,
  map,
  compact,
  isEmpty,
  reject,
  sortBy,
  includes,
  union,
} from 'lodash'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { CSSUtils } from 'commons-utils'
import { BaseMixin } from 'commons-mixins'
import {
  ContextHelp,
  DragHandle,
  Icon,
  List,
  Sortable,
} from '@signavio/effektif-commons/lib/components'

import { Tile } from '@signavio/effektif-commons/lib/components/tiles'
import { LabeledField, textType } from '../../../packages/fields'
import { RemoveButton } from 'commons-components/buttons'
import { Hint } from 'commons-components/hints'

import CaseColumn from 'processes/models/CaseColumn'
import BindingView from 'processes/views/BindingView'
import VariableType from 'processes/models/VariableType'

import * as __FieldViews__ from 'forms/views/fields'

// an array of all variable type names, for which there are views
const SUPPORTED_TYPE_NAMES = keys(__FieldViews__)

const SUPPORTED_TYPES = map(
  SUPPORTED_TYPE_NAMES,
  typeName => new VariableType({ name: typeName })
)

/**
 * A view to manage the cases report columns
 *
 */
const CaseColumnsView = createReactClass({
  displayName: 'CaseColumnsView',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      newColumn: new CaseColumn(),
    }
  },

  render: function() {
    return (
      <div className="case-columns">
        {this.renderHeader()}

        {this.renderActiveColumns()}
        {this.renderAddNewColumn()}
      </div>
    )
  },

  renderHeader: function() {
    var cls = CSSUtils.cls({
      'config-header': true,
      clearfix: true,
    })

    return (
      <div className="config-header clearfix">
        <Hint view={this.getActiveColumns().length === 0}>
          {i18n(
            'Configure the columns to show in the reporting table for cases of this process.'
          )}
          <ContextHelp>
            {i18n(
              'Remove unnecessary columns from the table or add additional data columns. ' +
                'You can also change the order of columns and edit individual column titles.'
            )}
          </ContextHelp>
        </Hint>
      </div>
    )
  },

  getActiveColumns: function() {
    return this.props.model.get('caseColumns').filter(col => {
      return (
        !col.get('hidden') &&
        (!col.get('binding').getType() ||
          includes(
            SUPPORTED_TYPE_NAMES,
            col.get('binding').getType().get('name')
          ))
      )
    })
  },

  renderActiveColumns: function() {
    return (
      <Sortable component="div" childComponent="div" onSort={this.handleSort}>
        {map(this.getActiveColumns(), this.renderColumn)}
      </Sortable>
    )
  },

  renderColumn: function(column) {
    return (
      <Tile
        key={column.cid}
        header={
          <List direction="horizontal">
            <DragHandle />
            <Icon
              icon={this.getIcon(column)}
              iconSet="signavio"
              style={this.props.style('columnIcon')}
            />
          </List>
        }
        style={this.props.style('caseColumn')}
        toolbar={
          <RemoveButton
            onClick={this.removeColumn.bind(null, column)}
            tabIndex="-1"
          />
        }
      >
        <LabeledField
          label={
            column.get('binding').getType()
              ? column.get('binding').getName()
              : i18n('This field has been deleted')
          }
          noClear
          onBlur={this.saveColumn.bind(null, column)}
          onChange={value => column.set('name', value)}
          placeholder={i18n('Enter the column title')}
          type={textType()}
          value={column.get('name')}
        />
      </Tile>
    )
  },

  getIcon: function(column) {
    if (!column.get('binding').getType()) {
      return 'icon-question'
    }

    return column.get('binding').getType().getIcon()
  },

  renderAddNewColumn: function() {
    var bindables = this.getBindables()
    if (bindables.length === 0) {
      return
    }

    return (
      <div className="add-new-column">
        <BindingView
          model={this.state.newColumn}
          placeholder={i18n('Click to add an additional column to the table')}
          bindables={bindables}
          onChange={this.addNewColumn}
        />
      </div>
    )
  },

  getBindables: function() {
    var caseColumns = this.props.model.get('caseColumns')

    var bindables = this.props.model.getBindables(SUPPORTED_TYPES)
    var usedBindingIds = compact(
      caseColumns.map(col => {
        return (
          !(isEmpty(col.get('binding').get('fields')) && col.get('hidden')) &&
          col.get('binding').id
        )
      })
    )

    return sortBy(
      reject(bindables, function(bindable) {
        return (
          includes(usedBindingIds, bindable.id) ||
          (!caseColumns.some(col => {
            // if there is no case column for that variable, the variable does not
            // exist in the currently published version of the process yet
            return (
              col.get('binding').get('variable') === bindable.get('variable')
            )
          }) &&
            // ... execept for the case var, which is always available but might be
            // not used as a case column yet
            bindable.get('variable').id !== 'case')
        )
      }),
      function(bindable) {
        return isEmpty(bindable.get('fields')) ? 0 : 1
      }
    )
  },

  addNewColumn: function() {
    var newColumn = this.state.newColumn

    if (isEmpty(newColumn.get('binding').get('fields'))) {
      // top level binding -> toggle hidden flag
      var column = this.props.model.get('caseColumns').find(col => {
        return col.get('binding').id === newColumn.get('binding').id
      })
      column.set('hidden', false)
    } else {
      // nested binding -> add to list
      newColumn.set('name', newColumn.get('binding').getName())
      this.props.model.get('caseColumns').add(newColumn)
    }

    this.props.model.save()

    this.setState({
      newColumn: new CaseColumn(),
    })
  },

  removeColumn: function(column) {
    if (isEmpty(column.get('binding').get('fields'))) {
      column.set('hidden', true)
      column.save()
    } else {
      column.destroy()
    }
  },

  saveColumn: function(column) {
    column.save()
  },

  handleSort: function(reorder) {
    var caseColumns = this.props.model.get('caseColumns')
    var visibleCaseColumns = caseColumns.filter(col => {
      return (
        !col.get('hidden') &&
        (!col.get('binding').getType() ||
          includes(
            SUPPORTED_TYPE_NAMES,
            col.get('binding').getType().get('name')
          ))
      )
    })
    var orderedCaseColumns = map(
      reorder,
      oldIndex => visibleCaseColumns[oldIndex]
    )

    orderedCaseColumns = union(orderedCaseColumns, caseColumns.models)
    caseColumns.reset(orderedCaseColumns)
    this.props.model.save()
  },
})

const styled = defaultStyle(({ color }) => ({
  caseColumn: {
    marginBottom: 1,
  },
  columnIcon: {
    backgroundColor: color.mono.light,
    color: color.mono.middle,
  },
}))

export default styled(CaseColumnsView)



// WEBPACK FOOTER //
// ./src/processes/views/CaseColumnsView.js