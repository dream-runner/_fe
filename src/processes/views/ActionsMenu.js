import PropTypes from 'prop-types'
import React from 'react'
import i18n from 'i18n'

import Router from 'singleton/Router'

import { IconButton } from 'commons-components/buttons'
import { font } from 'commons-style'

import ImportView from './ImportView'

export default function ActionsMenu({ onImport }) {
  return (
    <div className="actions-menu">
      <IconButton
        light
        block
        href={Router.reverse('create_process')}
        icon="plus"
        style={{
          textAlign: 'center',
          fontSize: font.size.form,
        }}
      >

        {i18n('Create new process')}
      </IconButton>

      <ImportView onComplete={onImport} />
    </div>
  )
}

ActionsMenu.propTypes = {
  onImport: PropTypes.func.isRequired,
}



// WEBPACK FOOTER //
// ./src/processes/views/ActionsMenu.js