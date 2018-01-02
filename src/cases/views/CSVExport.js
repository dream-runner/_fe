import PropTypes from 'prop-types'
import React, { Component } from 'react'
import i18n from 'i18n'

import { Confirm, Divider, Select, ContextHelp } from 'commons-components'
import { IconButton } from 'commons-components/buttons'

import ListSorting from './ListSorting'

const getFilters = () => [
  {
    id: 'all',
    value: i18n('All cases'),
  },
  {
    id: 'open',
    value: i18n('Only open cases'),
  },
  {
    id: 'closed',
    value: i18n('Only closed cases'),
  },
]

const getFormats = () => [
  {
    id: 'standard',
    value: i18n('Standard'),
  },
  {
    id: 'excel',
    value: i18n('Excel'),
  },
  {
    id: 'excel_north_europe',
    value: i18n('Excel (North Europe)'),
  },
  {
    id: 'tab',
    value: i18n('Tabs'),
  },
]

export default class CSVExport extends Component {
  static propTypes = {
    onExport: PropTypes.func.isRequired,
  }

  constructor(props = {}) {
    super(...arguments)

    this.state = {
      showDialog: false,
      sorting: props.sorting,
      filter: 'all',
      format: 'standard',
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.sorting === this.props.sorting) {
      return
    }

    if (nextProps.sorting !== this.state.sorting) {
      this.setState({
        sorting: nextProps.sorting,
      })
    }
  }

  render() {
    return (
      <div>
        <h5 className="container-header">{i18n('Export')}</h5>

        <IconButton
          light
          block
          icon="cloud-download"
          onClick={() => this.showExportDialog()}
        >

          {i18n('Export as CSV')}
        </IconButton>

        {this.renderDialog()}
      </div>
    )
  }

  showExportDialog() {
    this.setState({
      showDialog: true,
    })
  }

  renderDialog() {
    if (!this.state.showDialog) {
      return
    }

    return (
      <Confirm
        title={i18n('Export case table as CSV')}
        onCancel={() => this.setState({ showDialog: false })}
        onConfirm={() => this.handleExport()}
      >

        <p>
          {i18n(
            'By default the CSV will use the same options as your case view. If you want to change sorting or filtering, go ahead.'
          )}
        </p>

        <div className="row">
          <div className="col-xs-8">
            <ListSorting
              sorting={this.state.sorting}
              onChange={sorting => this.handleSortChange(sorting)}
            />
          </div>

          <div className="col-xs-4">
            <h5 className="container-header">
              {i18n('Filter')}
            </h5>

            <Select
              options={getFilters()}
              value={this.state.filter}
              onChange={item => this.handleFilterChange(item)}
            />
          </div>
        </div>
        <Divider title={i18n('Output')} />
        <div className="row">
          <div className="col-xs-8">
            <h5 className="container-header">
              {i18n('Format')}

              <ContextHelp>
                {i18n(
                  'If you encounter problems when you import the standard comma separated list of values into another application, you can choose a more specific format here.'
                )}
              </ContextHelp>
            </h5>

            <Select
              options={getFormats()}
              value={this.state.format}
              onChange={item => this.handleFormatChange(item)}
            />
          </div>
        </div>
      </Confirm>
    )
  }

  handleExport() {
    let { sorting, filter, format } = this.state

    this.props.onExport({
      ...(sorting ? { sorting } : null),

      ...(filter !== 'all' ? { closed: filter === 'closed' } : null),

      ...(format !== 'standard' ? { format } : null),
    })

    this.setState({
      showDialog: false,
    })
  }

  handleSortChange(sorting) {
    this.setState({
      sorting,
    })
  }

  handleFilterChange(filter) {
    this.setState({
      filter,
    })
  }

  handleFormatChange(format) {
    this.setState({
      format,
    })
  }
}



// WEBPACK FOOTER //
// ./src/cases/views/CSVExport.js