/* @flow */

import React from 'react'
import i18n from 'signavio-i18n'

import { MarkdownInput, Buffered } from 'commons-components'
import { padding } from 'commons-style'

type Props = {
  value: string,

  readOnly: boolean,

  onChange: (value: string) => void,
}

function Description({ value, readOnly, onChange, ...rest }: Props) {
  return (
    <div
      style={{
        padding: padding.normal,

        marginBottom: padding.normal,

        backgroundColor: 'white',
      }}
    >

      <h5 style={{ marginBottom: padding.normal }}>
        {i18n('Description')}
      </h5>

      <MarkdownInput
        {...rest}
        style={{
          textarea: {
            minHeight: 70,
          },
        }}
        readOnly={readOnly}
        {...{
          /* Disabling the placeholder here to temporarily fix IE */
          /* placeholder={ i18n("Enter a description of what has to be done") } */
        }}
        value={value}
        onChange={ev => onChange(ev.target.value)}
      />
    </div>
  )
}

export default Buffered(Description)



// WEBPACK FOOTER //
// ./src/activities/views/Description.js