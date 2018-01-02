// @flow

import React from 'react'
import i18n from 'signavio-i18n'

import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import type { ConnectorT } from '../../types'

import Data from './Data'
import Configuration from './Configuration'
import Errors from './Errors'

type Props = {
  connector: ConnectorT,

  onChange: (connector: ConnectorT) => void,
}

export default function Connector({ connector, onChange }: Props) {
  const { errors, lastOperationFailed } = connector

  return (
    <div>
      {lastOperationFailed && (
        <Hint warning>
          {i18n(
            'Check this connector for errors. The last operation we executed on this connector has failed.'
          )}
        </Hint>
      )}

      <Configuration connector={connector} onChange={onChange} />

      <Errors errors={errors} />
      <Data descriptor={connector.connectorDescriptor} />
    </div>
  )
}



// WEBPACK FOOTER //
// ./src/services/views/connectors/Connector.js