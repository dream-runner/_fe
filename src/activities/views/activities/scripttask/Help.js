import React from 'react'
import ReactDOM from 'react-dom'
import i18n from 'i18n'
import $ from 'jquery'
import ace from 'brace'

import { Modal } from 'commons-components'
import { TextButton } from 'commons-components/buttons'

module.exports = class extends React.Component {
  static displayName = 'ScriptTaskHelp'

  handleModalShow = () => {
    $('.ace-hightlight').each((index, element) => {
      var editor = ace.edit(element)
      editor.setTheme('ace/theme/textmate')
      editor.setOptions({
        readOnly: true,
        highlightActiveLine: false,
        highlightGutterLine: false,
      })
      editor.getSession().setMode('ace/mode/javascript')
      editor.getSession().setUseWorker(false)

      editor.renderer.$cursorLayer.element.style.opacity = 0

      $(element).height(editor.getSession().getLength() * 16)

      editor.resize()
    })
  }

  render() {
    return (
      <Modal
        title={i18n('Help')}
        footer={this.renderModalFooter()}
        onShow={this.handleModalShow}
        onRequestHide={this.props.onRequestHide}
      >
        {this.renderContent()}
      </Modal>
    )
  }

  renderModalFooter = () => {
    return (
      <TextButton primary block onClick={this.props.onRequestHide}>
        {i18n('Close')}
      </TextButton>
    )
  }

  renderContent = () => {
    return (
      <div className="script-task-help">
        {i18n(
          'For debugging purposes, you can use console.log to print something to the logs.'
        )}
        <div className="ace-hightlight">console.log("Hello World!");</div>

        {i18n(
          'To access data of form fields, activate script variable mappings in table below the script editor.'
        )}
        <div className="ace-hightlight">
          {i18n("// 'firstname', 'lastname', and 'age' must be form fields")}
          {'\n'}
          var name = firstname + " " + lastname;{'\n'}
          age = 21;{'\n'}
          console.log(name, age);
        </div>

        {i18n(
          'To perform HTTP requests, use [the request module](https://github.com/mikeal/request/blob/master/README.md).',
          {
            markdown: true,
          }
        )}
        <div className="ace-hightlight">
          {
            "request('https://itunes.apple.com/search?entity=musicTrack&term=never+gonna+give+you+up&limit=1',\n"
          }
          {'\tfunction (error, response, body) {\n'}
          {'\t\tif (!error && response.statusCode === 200) {\n'}
          {`\t\t\t// ${i18n('Print link to track')}\n`}
          {'\t\t\tconsole.log(JSON.parse(body).results[0].previewUrl);\n'}
          {'\t\t}\n'}
          {'\t}\n'}
          {');'}
        </div>

        <div className="alert alert-info">
          {i18n('Info: Use CTRL + Space to get some code completion.')}
        </div>
      </div>
    )
  }
}



// WEBPACK FOOTER //
// ./src/activities/views/activities/scripttask/Help.js