import React from 'react'
import { sortBy } from 'lodash'

import { List } from '@signavio/effektif-commons/lib/components'

import { getRights } from '../../../packages/access'

import type { CompactProcessT } from '../types'

import Process from './Process'

type PropsT = {
  name: string,

  processes: Array<CompactProcessT>,
}

export default function ProcessGroup({ name, processes }: PropsT) {
  return (
    <div className="group">
      <div className="row">
        <div className="col-xs-1">
          <h3>{name}</h3>
        </div>
        <div className="col-xs-11">
          <List>
            {sortBy(processes, (proc: CompactProcessT) =>
              (proc.name || '').toLowerCase()
            ).map(proc => {
              const { view, start } = getRights(proc.access, 'view', 'start')

              if (!view && !start) {
                return null
              }

              return <Process key={proc.id} proc={proc} />
            })}
          </List>
        </div>
      </div>
    </div>
  )
}



// WEBPACK FOOTER //
// ./src/processes/views/ProcessGroup.js