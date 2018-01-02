// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'

import type { Case as CaseT } from '../types'

type PropsT = {
  onSelectCases: () => void,
}

const SelectCases = ({ onSelectCases, style, selectMode }: PropsT) => (
  <div {...style}>
    <h5 className="container-header">{i18n('Select')}</h5>

    <IconButton
      light
      style={style('selectionButton')}
      icon={selectMode ? 'times' : 'mouse-pointer'}
      iconSet={!selectMode && 'fontAwesome'}
      onClick={onSelectCases}
    >
      {selectMode ? i18n('Stop selection') : i18n('Select cases')}
    </IconButton>
  </div>
)

const styled = defaultStyle(() => ({
  selectionButton: {
    width: '100%',
  },
}))

export default styled(SelectCases)



// WEBPACK FOOTER //
// ./src/cases/views/SelectCases.js