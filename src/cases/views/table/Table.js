/* @flow */
import React from 'react'
import { compose, withPropsOnChange } from 'recompose'
import { ScrollbarWrapper } from '@signavio/react-scrollbars'
import { find, isEmpty, map } from 'lodash'

import Header from './Header'
import Body from './Body'

import { ListItem } from '../../../../packages/cases'

import type { CaseT } from '../../../../packages/cases'
import type { Column } from '../../types'

type ApiPropsT = {
  columns: Array<Column>,
  stats: StatsT,
  openCases?: Array<CaseT>,
  closedCases?: Array<CaseT>,
  selectMode: boolean,
  selectedCases: Array<CaseT>,
  onSelectionChange: () => void,
}

type PropsT = {
  columnIds: Array<string>,
} & ApiPropsT

function CaseTable({
  openCases,
  closedCases,
  columns,
  columnIds,
  stats,
  selectMode,
  selectedCases,
  onSelectionChange,
}: ApiPropsT) {
  return (
    <div className="case-table-container row">
      <div
        className={`case-names col-xs-12 ${isEmpty(columnIds)
          ? ''
          : 'col-sm-6 col-md-5'}`}
      >
        <ScrollbarWrapper scrollbarAffix>
          <table className="case-table">
            <tbody>
              {map(openCases, (caze: Case) => (
                <tr key={caze.id} className="case open">
                  <td>
                    <ListItem
                      caze={caze}
                      stats={stats}
                      selectMode={selectMode}
                      selected={isSelected(selectedCases, caze)}
                      onSelectionChange={onSelectionChange}
                    />
                  </td>
                </tr>
              ))}

              {map(closedCases, (caze: Case) => (
                <tr key={caze.id} className="case closed">
                  <td>
                    <ListItem
                      caze={caze}
                      stats={stats}
                      selectMode={selectMode}
                      selected={isSelected(selectedCases, caze)}
                      onSelectionChange={onSelectionChange}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollbarWrapper>
      </div>
      {!isEmpty(columnIds) && (
        <div className="case-columns hidden-xs col-sm-6 col-md-7">
          <div className="case-columns-border" />

          <ScrollbarWrapper
            horizontal
            scrollbarAffix
            vertical={false}
            className="case-columns-container"
          >
            <table className="case-table">
              <Header columns={columns} />

              <Body
                open={openCases}
                closed={closedCases}
                columnIds={columnIds}
              />
            </table>
          </ScrollbarWrapper>
        </div>
      )}
    </div>
  )
}

const isSelected = (selectedCases: Array<CaseT>, caze: CaseT): boolean =>
  !!find(selectedCases, selectedCase => selectedCase.id === caze.id)

export default compose(
  withPropsOnChange(['columns', 'cases'], ({ columns }: PropsT) => ({
    columnIds: map(columns, ({ id }) => id),
  }))
)(CaseTable)



// WEBPACK FOOTER //
// ./src/cases/views/table/Table.js