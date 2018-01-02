import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import { filter, find, groupBy, keys, map, sortBy } from 'lodash'

import { BaseMixin } from 'commons-mixins'
import { InplaceEdit, Hint, List, withPopover } from 'commons-components'
import { Tile, TextTile } from 'commons-components/tiles'

import { getFieldsContext } from '../../../../packages/fields'

const TileWithPopover = withPopover(Tile)
const TextTileWithPopover = withPopover(TextTile)

const getOrderedArray = collection =>
  filter(
    collection.sortBy(variable => (variable.get('name') || '').toLowerCase()),
    ({ id }) => id !== 'case'
  )

const Variables = createReactClass({
  displayName: 'Variables',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      editing: false,
      orderedArray: getOrderedArray(this.props.collection),
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (!this.state.editing) {
      this.setState({
        orderedArray: getOrderedArray(nextProps.collection),
      })
    }
  },

  render: function() {
    if (this.state.orderedArray.length === 0) {
      return <Hint>{i18n("You haven't created any fields yet.")}</Hint>
    }

    var groups = groupBy(this.state.orderedArray, function(variable) {
      return variable.get('type').getName()
    })

    var order = sortBy(keys(groups), function(key) {
      return key.toLowerCase()
    })

    return (
      <div className="variables">
        {map(order, group => this.renderGroup(groups[group], group))}
      </div>
    )
  },

  renderGroup: function(variables, group) {
    if (variables.length === 0) {
      return
    }

    return (
      <div className="group" key={group}>
        <div className="row">
          <div className="col-sm-4 col-md-3">
            <h4>{group}</h4>
          </div>
          <div className="col-sm-8 col-md-9">
            <List>{variables.map(this.renderVariable)}</List>
          </div>
        </div>
      </div>
    )
  },

  renderVariable: function(variable) {
    const { dataTypeDescriptors, readOnly } = this.props

    const jsonVariable = variable.toJSON()
    const variableDescriptor = find(dataTypeDescriptors, typeDescriptor => {
      if (jsonVariable.type.name === 'connectorReference') {
        return typeDescriptor.id === jsonVariable.type.id
      }

      return typeDescriptor.key === jsonVariable.type.name
    })

    const deletedConnectorReference =
      variableDescriptor && variableDescriptor.deleted

    if (readOnly) {
      return (
        <TextTileWithPopover
          key={variable.id}
          icon={deletedConnectorReference ? 'warning' : variable.getIcon()}
          popover={
            deletedConnectorReference &&
            i18n('This field has been deleted from connectors')
          }
          small
        >
          {variable.get('name')}
        </TextTileWithPopover>
      )
    }

    return (
      <TileWithPopover
        key={variable.id}
        icon={deletedConnectorReference ? 'warning' : variable.getIcon()}
        popover={
          deletedConnectorReference &&
          i18n('This field has been deleted from connectors')
        }
        small
      >
        <InplaceEdit
          value={variable.get('name')}
          onChange={ev => variable.set('name', ev.target.value)}
          onClick={this.startEditing}
          onBlur={this.stopEditing.bind(null, variable)}
        />
      </TileWithPopover>
    )
  },

  startEditing: function() {
    this.trySetState({
      editing: true,
    })
  },

  stopEditing: function(variable) {
    this.trySetState({
      editing: false,
      orderedArray: getOrderedArray(this.props.collection),
    })

    if (!variable.get('name').trim()) {
      return
    }

    variable.save()
  },
})

module.exports = getFieldsContext(Variables)



// WEBPACK FOOTER //
// ./src/processes/views/edit/VariablesView.js