import { each } from 'lodash'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import ace from 'brace'
import $ from 'jquery'

require('brace/mode/javascript')
require('brace/theme/textmate')

require('brace/ext/language_tools')

export default class ScriptEditor extends PureComponent {
  componentDidMount() {
    this.initializeEditor()
  }

  componentWillUnmount() {
    this.editor.destroy()

    delete this.editor
  }

  componentDidUpdate(prevProps) {
    if (prevProps.script === this.props.script) {
      return
    }

    this.updateEditor()
  }

  render() {
    return <div className="ace-editor" />
  }

  initializeEditor() {
    var editor = (this.editor = ace.edit(ReactDOM.findDOMNode(this)))

    // Set the theme and mode
    editor.setTheme('ace/theme/textmate')

    editor.getSession().setMode('ace/mode/javascript')
    editor.getSession().setUseWorker(false)
    editor.setReadOnly(this.props.readOnly)

    editor.on('blur', () => {
      this.props.onChange(editor.getValue())
    })

    this.updateEditor()
  }

  updateEditor() {
    const { script } = this.props
    this.editor.getSession().setValue(script)
  }

  markErrors(logs) {
    // Set error code in the editor:
    // 1. Get error description, row and column
    var ll = logs.match(/(.+) - In line ([0-9]+):([0-9]+)/)

    if (!ll || ll.length !== 4) {
      return
    }

    var Range = ace.Range,
      session = this.editor.getSession(),
      error = ll[1],
      row = parseInt(ll[2]) - 1,
      column = parseInt(ll[3]) - 1

    if (isNaN(row) || !isNaN(column)) {
      return
    }

    // 2. Get the word
    const { script } = this.props
    const line = script.split(/\n/)[row]
    const word = line.slice(column).split(/[^a-z0-9]/i)[0]

    // 3. Set error symbol in the front
    session.setAnnotations([
      {
        row: row,
        column: column,
        text: error,
        type: 'error', // also warning and information
      },
    ])

    // 5. Set marker for text and line
    if (column >= 0 && word) {
      this.markers.push(
        session.addMarker(
          new Range(row, column, row, column + word.length),
          'effektif_warning',
          'text'
        )
      )
    }
    this.markers.push(
      session.addMarker(
        new Range(row, 0, row + 1, 0),
        'effektif_warning line',
        'line'
      )
    )

    // 6. Register to hide the markers
    session.once('changeAnnotation', function() {
      this.clearMarkers()
    })
  }

  markers: []

  clearMarkers() {
    if (!this.editor || !this.editor.getSession()) {
      return
    }

    var session = this.editor.getSession()
    each(this.markers, function(m) {
      session.removeMarker(m)
    })

    this.markers = []
  }
}



// WEBPACK FOOTER //
// ./src/activities/views/activities/scripttask/Editor.js