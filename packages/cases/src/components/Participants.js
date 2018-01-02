import React, { Component } from 'react'
import i18n from 'signavio-i18n'
import { find } from 'lodash'

import {
  DropDown,
  Hint,
  Popover,
  List,
  Divider,
} from '@signavio/effektif-commons/lib/components'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import {
  User,
  UserAvatar,
} from '@signavio/workflow-organizations/lib/users/components'

class Participants extends Component {
  render() {
    const { participants, style } = this.props

    return (
      <div {...style('container')}>
        <DropDown
          toggle={
            <List direction="horizontal">
              {participants.map(({ id }) => <UserAvatar key={id} value={id} />)}
            </List>
          }
        >
          <List>
            {participants.map(({ id, events }) =>
              <Popover
                small
                key={id}
                placement="right"
                popover={this.renderInfo(events)}
              >
                <User
                  value={id}
                  key={id}
                  subtitle={
                    events.length > 0 &&
                    i18n('__count__ action item', '__count__ action items', {
                      count: events.length,
                    })
                  }
                  {...style('user')}
                />
              </Popover>
            )}
          </List>
        </DropDown>
      </div>
    )
  }

  renderInfo(events) {
    if (events.length === 0) {
      return (
        <Hint inline>
          {i18n('No further information')}
        </Hint>
      )
    }

    return (
      <List>
        {this.renderStartCase(events)}
        {this.renderInitialTaskCreated(events)}
        {this.renderActivity(events)}
        {this.renderCollaboration(events)}
      </List>
    )
  }

  renderStartCase(events) {
    const event = find(events, event => event.type === 'caseCreate')

    if (!event) {
      return
    }

    return (
      <TextTile
        iconSet="fontAwesome"
        icon="folder-open-o"
        style={this.props.style('entry')}
        small
      >
        {i18n('Started this case')}
      </TextTile>
    )
  }

  renderInitialTaskCreated(events) {
    const event = find(events, event => event.type === 'taskCreate')

    if (!event) {
      return
    }

    return (
      <TextTile
        iconSet="fontAwesome"
        icon="plus"
        style={this.props.style('entry')}
        small
      >
        {i18n('Created __task__', { task: event.name })}
      </TextTile>
    )
  }

  reduceEvents(events, ...types) {
    return events.reduce((result, event) => {
      if (types.indexOf(event.type) === -1) {
        return result
      }

      return {
        ...result,

        [event.type]: [...(result[event.type] || []), event],
      }
    }, {})
  }

  renderActivity(events) {
    const { complete = [], assign = [], taskCreate = [] } = this.reduceEvents(
      events,
      'assign',
      'complete',
      'taskCreate'
    )

    if (complete.length === 0 && assign.length === 0) {
      return
    }

    return (
      <List>
        <Divider title={i18n('Activity')} />

        {this.renderTaskCreate(taskCreate)}
        {this.renderCompleteTasks(complete)}
        {this.renderAssignments(assign)}
      </List>
    )
  }

  renderTaskCreate(events) {
    return events.map(event =>
      <TextTile
        key={event.id}
        style={this.props.style('entry')}
        icon="plus"
        small
      >
        {i18n('Created __task__', { task: event.name })}
      </TextTile>
    )
  }

  renderCompleteTasks(events) {
    return events.map(event =>
      <TextTile
        key={event.id}
        small
        icon="check"
        style={this.props.style('entry')}
      >
        {i18n('Completed __task__', { task: event.name || i18n('unnamed') })}
      </TextTile>
    )
  }

  renderAssignments(events) {
    return events.map(event => {
      const icon = 'icon-square' // TODO: use without task.get("completed")

      return (
        <TextTile
          key={event.id}
          style={this.props.style('entry')}
          icon={icon}
          small
        >
          {i18n('Assignee for __task__', {
            task: event.name || i18n('unnamed'),
          })}
        </TextTile>
      )
    })
  }

  renderCollaboration(events) {
    const { commentAdd = [], fileAdd = [] } = this.reduceEvents(
      events,
      'commentAdd',
      'fileAdd'
    )

    if (commentAdd.length === 0 && fileAdd.length === 0) {
      return
    }

    return (
      <List>
        <Divider title={i18n('Collaboration')} />

        {this.renderComments(commentAdd)}
        {this.renderDocuments(fileAdd)}
      </List>
    )
  }

  renderComments(events) {
    if (events.length === 0) {
      return
    }

    return (
      <TextTile icon="comment" style={this.props.style('entry')} small>
        {i18n('Left a comment', 'Left __count__ comments', {
          count: events.length,
        })}
      </TextTile>
    )
  }

  renderDocuments(events) {
    if (events.length === 0) {
      return
    }

    return (
      <TextTile icon="file" style={this.props.style('entry')} small>
        {i18n('Added a file', 'Added __count__ files', {
          count: events.length,
        })}
      </TextTile>
    )
  }
}

export default defaultStyle({
  container: {
    display: 'inline-block',
  },
  entry: {
    backgroundColor: null,

    icon: {
      backgroundColor: null,
    },
  },
  user: {
    backgroundColor: null,
    cursor: 'default',
  },
})(Participants)



// WEBPACK FOOTER //
// ./packages/cases/src/components/Participants.js