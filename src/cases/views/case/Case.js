import { filter } from 'lodash'
import i18n from 'signavio-i18n'
import React from 'react'
import { compose } from 'recompose'
import {
  connect as apiConnect,
  types,
  withUserPreferences,
  withUser,
} from '@signavio/effektif-api'
import createReactClass from 'create-react-class'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import $ from 'jquery'

import Login from 'singleton/Login'
import Router from 'singleton/Router'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { CSSUtils } from '@signavio/effektif-commons/lib/utils'
import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { Hint as LegacyHint } from '@signavio/effektif-commons/lib/components'

import { Stream } from '../../../../packages/cases'
import { ControlTasks } from '../../../../packages/cases/lib/case/components'

import Task from 'tasks/views/TaskView'
import Print from 'tasks/views/PrintView'
import TaskList from 'tasks/views/list'

import CaseHeader from './CaseHeader'

const scrollIntoView = (top, toBottom) => {
  const scrollTop = $(window).scrollTop()
  const clientHeight =
    window.innerHeight || document.documentElement.clientHeight
  const animation = { duration: 300, easing: 'swing' }

  if (toBottom && top < scrollTop + clientHeight / 2) {
    // scroll back up so that top is at the bottom of the screen
    $('html, body').animate(
      {
        scrollTop: top - clientHeight,
      },
      animation
    )
  } else if (top < scrollTop) {
    // scroll back up so that top is at the top of the screen
    $('html, body').animate(
      {
        scrollTop: top,
      },
      animation
    )
  } else if (top > scrollTop + clientHeight) {
    $('html, body').animate(
      {
        scrollTop: top - clientHeight,
      },
      animation
    )
  }
}

/**
 * The main view for a case, right now it's basically a copy of the TaskView
 * URL: /case/:cid
 *
 */
const CaseView = createReactClass({
  displayName: 'CaseView',

  mixins: [BaseMixin],

  getInitialState() {
    return {
      loading: true,
      loadingTasks: false,
      loadingEvents: false,
    }
  },

  componentWillMount() {
    const { userPreferences, task, model } = this.props

    if (userPreferences.useNewCaseView) {
      const url = `/ncase/case/${model.id}`

      Router.navigate(task ? `${url}/task/${task.id}` : url, {
        trigger: true,
        replace: true,
      })
      return
    }

    this.loadCase(model)

    $(document).on('keyup', this.handleKeyup)
  },

  componentWillReceiveProps(nextProps) {
    const { model, updatePreferences, task } = this.props
    const { model: nextModel } = nextProps

    if (updatePreferences.pending && !nextProps.updatePreferences.pending) {
      const url = `/ncase/case/${model.id}`

      Router.navigate(task ? `${url}/task/${task.id}` : url, {
        trigger: true,
      })

      return
    }

    if (model.id === nextModel.id) {
      return
    }

    this.loadCase(nextModel)
  },

  componentDidUpdate(prevProps) {
    if (this.props.task !== prevProps.task) {
      // task switched: scroll back to top
      this.scrollToTop()
    }
  },

  scrollToTop() {
    const { top } = $(this.containerEl).offset()
    const showingList = !this.props.task
    const scrollTo = showingList
      ? top + $(this.containerEl).height() // end of list should always be visible
      : top // top of the task should be visible

    // do not rescroll when browser back or forward buttons are used as in that case
    // an automatic restore of the original scroll position will happen
    if (!this.props.backOrForwardButtonUsed) {
      scrollIntoView(scrollTo, showingList)
    }
  },

  loadCase(model) {
    this.setState({
      loading: true,
    })

    model.fetch()
    model.once('sync', () => {
      this.setState({
        loading: false,
      })
    })
  },

  componentWillUnmount() {
    $(document).off('keyup', this.handleKeyup)
  },

  handleKeyup(event) {
    if (!$(event.target).is(':not(input, textarea, pre)')) {
      return
    }

    // only react to "r"
    if (event.keyCode !== 82) {
      return
    }

    this.handleRefresh()
  },

  render() {
    const { print, model, task } = this.props
    const cls = CSSUtils.cls({
      view: true,
      case: true,
      print: print,
      closed: model.get('closed'),
      blur: CSSUtils.knows('filter', 'blur(10px)') && task,
    })

    return (
      <div className={cls}>
        <div className="view-header">
          {this.renderHint()}
          {this.renderHeader()}
        </div>

        <div className="view-content">{this.renderContent()}</div>
      </div>
    )
  },

  renderHint() {
    if (this.props.print) {
      return (
        <div className="hidden-print">
          <LegacyHint info={true}>
            {i18n(
              'This is a special view meant for printing. Certain elements, including this message, will be hidden when you print this page.'
            )}
          </LegacyHint>
        </div>
      )
    }

    if (this.state.loading) {
      return (
        <Hint loading view>
          {i18n('Loading case information...')}
        </Hint>
      )
    }

    return (
      <div className="visible-print">
        <LegacyHint info={true}>
          {i18n(
            'We have a special view explicitly for printing cases and tasks. You can activate it using the case menu.'
          )}
        </LegacyHint>
      </div>
    )
  },

  renderHeader() {
    if (this.state.loading) {
      return
    }

    return (
      <CaseHeader
        print={this.props.print}
        model={this.props.model}
        onNewLayoutClick={this.handleNewLayoutClick}
        onRefresh={this.handleRefresh}
        onPrint={this.handlePrint}
      />
    )
  },

  handleNewLayoutClick() {
    const { updatePreferences, userPreferences } = this.props

    updatePreferences({
      ...userPreferences,
      useNewCaseView: true,
    })
  },

  handlePrint() {
    const { print, model, task } = this.props

    Router.navigate(
      Router.reverse(print ? 'case' : 'case_print', {
        id: model.id,
        tid: task && task.id,
      }),
      {
        trigger: true,
      }
    )
  },

  handleRefresh() {
    const { model } = this.props
    this.setState({
      loadingTasks: true,
    })

    Router.navigate(Router.reverse('case', { id: model.id }), {
      trigger: true,
    })

    model.once('sync', () => {
      this.setState({
        loadingTasks: false,
      })
    })

    model.fetch({ parse: true })
  },

  renderContent() {
    if (this.state.loading) {
      return
    }

    const { model, task, print } = this.props

    if (print) {
      return (
        <div className="row">
          <div className="col-lg-12">
            {this.renderTask()}
            {this.renderTasks()}
            {this.renderControlTasks()}
          </div>

          <div className="col-md-5 events-column">
            <Stream
              taskId={task && task.id}
              caseId={model.id}
              onEvent={this.handleEventAdd}
              participants={(model.get('participants') || []).map(
                ({ user }) => user
              )}
            />
          </div>
        </div>
      )
    }

    return (
      <div className="row">
        <div
          className="col-md-7"
          ref={ref => {
            this.containerEl = ref
          }}
        >
          {this.renderTask()}
          {this.renderTasks()}
          {this.renderControlTasks()}
        </div>

        <div className="col-md-5 events-column">
          <Stream
            taskId={task && task.id}
            caseId={model.id}
            participants={(model.get('participants') || []).map(
              ({ user }) => user
            )}
          />
        </div>
      </div>
    )
  },

  renderTask() {
    const { task, print } = this.props

    if (!task) {
      return
    }

    if (print) {
      return <Print model={task} />
    }

    return (
      <ReactCSSTransitionGroup transitionName="swap">
        <Task key={task.id} onComplete={this.handleTaskComplete} model={task} />
      </ReactCSSTransitionGroup>
    )
  },

  handleTaskComplete(completedTask, options) {
    const { model } = this.props

    options = options || {}

    if (!options.silent) {
      this.setState({
        loadingTasks: true,
      })
    }

    const previousTasks = [...model.get('tasks').models]

    model.once('sync', () => {
      if (!options.silent) {
        this.setState({
          loadingTasks: false,
        })
      }

      // only redirect to case base url / next tasks if the user did not
      // navigate somewhere else in the meanwhile
      const taskUrl = Router.reverse('case', {
        id: model.id,
        tid: completedTask.id,
      })
      let location = window.location.href

      location = location.replace(window.location.protocol + '//', '')
      location = location.replace(window.location.host, '')
      location = location.replace('#', '')

      if (location === taskUrl) {
        const newTasksForUser = filter(
          model.get('tasks').difference(previousTasks),
          task =>
            task
              .get('candidates')
              .items.find(({ id }) => id === Login.user().id) ||
            task.get('assigneeId') === Login.user().id
        )

        if (newTasksForUser.length > 0) {
          Router.navigate(
            Router.reverse('case', {
              id: model.id,
              tid: newTasksForUser[0].id,
            }),
            {
              trigger: true,
            }
          )
        } else {
          Router.navigate(Router.reverse('case', { id: model.id }), {
            trigger: true,
          })
        }
      }
    })
    model.fetch()
  },

  renderTasks() {
    const { print, task, model } = this.props

    if (print && task) {
      return
    }

    if (this.state.loadingTasks) {
      return <Hint loading>{i18n('Loading tasks...')}</Hint>
    }

    const rights = model.getRights()

    return (
      <TaskList
        caze={model}
        print={print}
        flat={print}
        title={i18n('Tasks')}
        collection={model.get('tasks')}
        loading={this.state.addingTask}
        onComplete={this.handleTaskComplete}
        readOnly={!rights.edit || this.state.addingTask}
        onAdd={this.handleTaskAdd}
      />
    )
  },

  renderControlTasks() {
    const { model, style } = this.props
    const tasks = model.get('controlTasks')
    if (!tasks || tasks.length === 0) {
      return
    }

    const rights = model.getRights()

    return (
      <div {...style('section')}>
        <h3 {...style('sectionHeader')}>{i18n('Other open activities')}</h3>

        <ControlTasks
          caseId={model.id}
          readOnly={!rights.edit}
          tasks={tasks}
          onActionSuccess={this.handleRefresh}
        />
      </div>
    )
  },

  handleTaskAdd(task) {
    this.setState({
      addingTask: true,
    })

    this.props.model.createTask(task, () => {
      this.setState({
        addingTask: false,
      })
    })
  },

  check(action) {
    this.props.model.check(action)
  },
})

export default compose(
  withUserPreferences,
  withUser,
  apiConnect(({ user }) => ({
    updatePreferences: {
      id: user.id,
      type: types.USER_PREFERENCE,
      method: 'update',
    },
  })),
  defaultStyle(({ padding }) => ({
    section: {
      marginTop: padding.large,
    },

    sectionHeader: {
      marginBottom: padding.normal,
    },
  }))
)(CaseView)



// WEBPACK FOOTER //
// ./src/cases/views/case/Case.js