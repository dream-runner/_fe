import 'placeholders-js'

import 'backbone-rel-partialput'
import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import { init } from 'signavio-i18n'

import SignavioWorkflowAccelerator from '../packages/main/src'

import getLangLoader from './locales/getLangLoader'
import i18nConfig from './locales/config'

// require('@signavio/effektif-commons/lib/font/source-sans-pro/stylesheet')
// require('@signavio/effektif-commons/lib/font/robotoslab-thin/stylesheet')

require('./less/default.less')

$.ajaxSetup({
  contentType: 'application/json charset=utf-8',
  cache: false,
})

window.error = err => {
  throw new Error(err)
}

// Make React global
// (This is required for UMD-style React extensions)
window.React = React

// Trigger blur on page unload in case a save depends on that
window.addEventListener('beforeunload', () => {
  $(document.activeElement).blur()
})

$(document).ready(() => {
  init(getLangLoader, i18nConfig).then(() => {
    ReactDOM.render(
      <SignavioWorkflowAccelerator />,
      $('.outer-container').get(0)
    )
  })
})



// WEBPACK FOOTER //
// ./src/main.js