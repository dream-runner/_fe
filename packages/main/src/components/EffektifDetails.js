import React, { Component } from 'react'
import i18n from 'signavio-i18n'

import { withUser } from '@signavio/effektif-api'

import moment from '@signavio/effektif-commons/lib/extensions/moment'
import { Markdown } from '@signavio/effektif-commons/lib/components'
import { variables } from '@signavio/effektif-commons/lib/styles'

class EffektifDetails extends Component {
  render() {
    return (
      <div className="effektif-details">
        {this.renderVersion()}
        {this.renderDate()}
        {this.renderReleaseNotes()}
        {this.renderCommits()}
      </div>
    )
  }

  renderVersion() {
    return (
      <div className="row">
        <div className="col-xs-4">
          <label>{i18n('Version')}</label>
        </div>
        <div className="col-xs-8">{this.props.model.get('version')}</div>
      </div>
    )
  }

  renderDate() {
    const { user } = this.props

    if (!user.systemAdmin) {
      return
    }

    let buildDate = this.props.model.get('buildDate')

    if (!buildDate) {
      return
    }

    let date = moment(buildDate)

    return (
      <div className="row">
        <div className="col-xs-4">
          <label>{i18n('Last updated')}</label>
        </div>
        <div className="col-xs-8">
          {i18n('__relative__ on __absolute__', {
            relative: date.fromNow(),
            absolute: date.format('LLL'),
          })}
        </div>
      </div>
    )
  }

  renderReleaseNotes() {
    let note = this.props.model.get('releaseNote')
    if (!note) {
      return
    }
    let date = moment(note.releaseDate)
    let style = {
      lineHeight: variables.lineHeight.clear,
      paddingTop: '12px',
    }

    return (
      <div className="row">
        <div className="col-xs-4">
          <label>{i18n('Release Notes')}</label>
        </div>
        <div className="col-xs-8">
          <Markdown style={style}>{note.notes}</Markdown>
        </div>
      </div>
    )
  }

  renderCommits() {
    const { user } = this.props

    if (!user.systemAdmin) {
      return
    }

    let commits = this.props.model.get('latestCommits')

    if (!commits) {
      return
    }

    return (
      <div className="row">
        <div className="col-xs-4">
          <label>{i18n('Latest changes')}</label>
        </div>
        <div className="col-xs-8">
          <table className="table">
            <thead>
              <tr>
                <th>{i18n('Reference')}</th>
                <th>{i18n('Date')}</th>
                <th>{i18n('Author')}</th>
              </tr>
            </thead>
            <tbody>{commits.map(commit => this.renderCommit(commit))}</tbody>
          </table>
        </div>
      </div>
    )
  }

  renderCommit(commit) {
    let [hash, date, user] = commit.split(';')

    return (
      <tr key={hash}>
        <td>{hash}</td>
        <td>{moment(date, 'YYYY-MM-DD HH:mm:ss ZZ').format('LLL')}</td>
        <td>{user}</td>
      </tr>
    )
  }
}

export default withUser(EffektifDetails)



// WEBPACK FOOTER //
// ./packages/main/src/components/EffektifDetails.js