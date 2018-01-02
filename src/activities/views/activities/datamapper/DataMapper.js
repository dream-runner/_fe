// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { isEqual, reject } from 'lodash'

import { Divider, Box, Disable } from 'commons-components'
import { padding } from 'commons-style'

import AddMapping from './AddMapping'
import Mappings from './Mappings'

type PropsT = {
  model: any,

  readOnly: boolean,
}

export default function DataMapper({ model, readOnly }: PropsT) {
  return (
    <div>
      <h3 style={{ marginBottom: padding.normal }}>
        {i18n('Data Mappings')}
      </h3>

      <Box white>
        <Mappings
          readOnly={readOnly}
          mappings={model.get('mappings')}
          onRemove={mapping => {
            model.set(
              'mappings',
              reject(model.get('mappings'), m => isEqual(mapping, m))
            )
            model.save()
          }}
        />

        <Divider title={i18n('Add mapping')} />

        <Disable disabled={readOnly}>
          <AddMapping
            value={model.get('mappings')}
            onAdd={mapping => {
              model.set('mappings', [...(model.get('mappings') || []), mapping])

              model.save()
            }}
          />
        </Disable>
      </Box>
    </div>
  )
}



// WEBPACK FOOTER //
// ./src/activities/views/activities/datamapper/DataMapper.js