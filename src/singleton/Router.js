// @flow
import {
  some,
  every,
  find,
  pickBy,
  isUndefined,
  isNull,
  isPlainObject,
  values,
  includes,
  isRegExp,
} from 'lodash'
import Backbone from 'backbone-rel-partialput'
import React from 'react'
import { locale } from 'i18n'
import pathToRegexp from 'path-to-regexp'
import queryString from 'query-string'

import Task from 'tasks/models/Task'
import Case from 'cases/models/Case'
import Process from 'processes/models/Process'
import TaskCollection from 'tasks/collections/TaskCollection'
import ProcessCollection from 'processes/collections/ProcessCollection'

import { Container } from '@signavio/effektif-commons/lib/components'
import { history } from '../../packages/main/src/index'
import NotFound from '../../packages/main/src/components/NotFound'

import Effektif from './Effektif'
import Login from './Login'

const TASKS = new TaskCollection()
const PROCESSES = new ProcessCollection()

const Router = Backbone.Router.extend({
  /**
     * Options:
     *  - `callback` The property name of the callback function to invoke for this route
     *  - `name` (optional) A name for referencing the route in reverse routing. (defaults to the callback name.)
     *  - `global` (optional) If set to true, the URL for this route is not preceded by the organization key.
     *  - `public` (optional) If the to true, the route is accessible without login. (implicates `global` value of true)
     */

  routes: {
    '/profile': { callback: 'profile', global: true },

    '/:organization/buy': { callback: 'buy', purchase: true },
    '/:organization/buy/:license': { callback: 'buy', purchase: true },

    '/:organization/admin': 'admin',
    '/:organization/admin/system': 'admin_system',
    '/:organization/admin/organization/:id?': {
      name: 'admin_organizations',
      callback: 'admin_organizations',
    },

    '/:organization/admin/users/:id?': 'admin_users',

    '/:organization/admin/registrations/:id?': {
      callback: 'admin_registrations',
      fallback: 'admin_registrations',
    },
    '/:organization/admin/auth/:tab?/:id?': {
      callback: 'admin_auth',
      fallback: 'admin_auth',
    },

    '/:organization/admin/feedback/:id?': {
      callback: 'admin_feedback',
      fallback: 'admin_feedback',
    },
    '/:organization/admin/logs/:id?': {
      callback: 'admin_logs',
      fallback: 'admin_logs',
    },
    '/:organization/admin/purchase/:id?': {
      callback: 'admin_purchase',
      fallback: 'admin_purchase',
    },
    '/:organization/admin/releases/:id?': {
      callback: 'admin_releases',
      fallback: 'admin_releases',
    },

    '/:organization/processes': 'processes',

    '/:organization/process/:id/start': {
      callback: 'create_case',
      fallback: 'cases',
    },
    '/:organization/process/:id/start/form': {
      callback: 'process_start_form',
      fallback: 'cases',
    },

    '/:organization/process': 'create_process',
    '/:organization/process/:id/:tab?/:sub?/:actionsub?': {
      callback: 'process',
      fallback: 'processes',
    },

    '/:organization/tour': 'tour',
    '/:organization/tour/:step': 'tour',

    '/:organization/tasks/:tab?': 'tasks',

    '/:organization/cases': 'cases',
    '/:organization/cases/adhoc': 'cases_adhoc',
    '/:organization/cases/deleted': 'cases_deleted',
    '/:organization/cases/:pid': 'cases',
    '/:organization/cases/:pid/config': 'cases_config',

    '/:organization/case': 'create_case',
    '/:organization/case/:id': { callback: 'case', fallback: 'cases' },
    '/:organization/case/:id/task/:tid': {
      callback: 'case',
      fallback: 'cases',
    },

    '/:organization/case/:id/print': {
      callback: 'case_print',
      fallback: 'cases',
    },
    '/:organization/case/:id/task/:tid/print': {
      callback: 'case_print',
      fallback: 'cases',
    },

    '/:organization/examples': 'examples',

    '/:organization/organization/:tab?': 'organization',

    '/:organization/services/:tab?/:id?': 'services',

    // catch all
    '*anything': { callback: 'default', global: true },
  },

  defaultFallback: 'tasks',

  navigate: function(pathname, options = {}) {
    history[options.replace ? 'replace' : 'push']({
      pathname,
      search: options.search,
    })
  },

  getQuery() {
    return this.reactRouterLocation.search.replace('?', '')
  },

  applyParams: function(url, params) {
    const toPath = pathToRegexp.compile(url)

    return toPath(params)
  },

  getActiveParams(params) {
    return pickBy(params, value => !isUndefined(value) && !isNull(value))
  },

  /**
     * Reverse finds a route's URL based on its name and the passed URL parameters
     */
  findRouteUrl: function(routes, name, params) {
    let matchingUrl

    const activeParams = this.getActiveParams(params)
    const org = activeParams.organization

    if (org) delete activeParams.organization

    const currentOrganization = Login.organization()

    some(routes, (value, url) => {
      if (value !== name && value.name !== name && value.callback !== name) {
        return false
      }

      const compiledUrl = this.applyParams(url, {
        ...activeParams,
        organization: org || (currentOrganization && currentOrganization.key),
      })

      // only match if all parameters passed to this method could be inserted into the URL pattern
      if (!every(values(activeParams), param => includes(compiledUrl, param))) {
        return false
      }

      // only match if all parameters passed to this method could be inserted into the URL pattern
      if (compiledUrl.indexOf(':') >= 0) {
        return false
      }

      matchingUrl = compiledUrl

      return true
    })

    return matchingUrl
  },

  reverse: function(name, params) {
    const { query, ...rest } = params || {}

    const url = this.findRouteUrl(this.routes, name, rest)

    if (!url) {
      throw new Error(
        "No matching reverse found for name '" +
          name +
          "' " +
          "and params '" +
          JSON.stringify(params) +
          "'"
      )
    }

    return `${url}${query ? `?${query}` : ''}`
  },

  redirect: function(name, params) {
    this.navigate(this.reverse(name, params), { replace: true })
  },

  fallback: function() {
    this.navigate(this.reverse(this._fallbackRoute), {
      replace: true,
    })
  },

  currentPage: function() {
    const { pathname, search, hash } = window.location

    let currentPage = window.history.pushState
      ? pathname
      : hash && hash.substring(1)

    if (search) {
      currentPage = currentPage + search
    }

    if (currentPage[0] !== '/') currentPage = '/' + currentPage

    return currentPage
  },

  /**
     * Overwrite the route function
     *  - to perform login if necessary
     *  - to prepend the organization key to non-global routes
     */
  route: function(route, name, callback) {
    var isPublic = false
    var isGlobal = false
    var fallbackRoute = this.defaultFallback
    var isForPurchase = false

    if ('object' === typeof name) {
      isPublic = name.public === true
      isGlobal = isPublic || name.global === true
      isForPurchase = name.purchase === true
      if (name.fallback) {
        fallbackRoute = name.fallback
      }

      if (name.redirect) {
        name = this.redirect.bind(this, name.redirect, name.params)
      } else {
        name = name.callback
      }
    }

    if (!isRegExp(route)) route = this._routeToRegExp(route)

    // Wrap every route with a login check
    callback = callback || this[name]
    if (callback) {
      callback = function(fn, fragment) {
        var routeArgs = this._extractParameters(route, fragment)

        // set the router's active fallback route
        this._fallbackRoute = fallbackRoute

        if (!isGlobal) {
          // non-global URLs always include the organization key as the first argument
          let [orgKey, ...rest] = routeArgs
          routeArgs = rest
        }

        var organization = Login.getActiveOrganization()
        if (organization && organization.licenseRequired && !isForPurchase) {
          window.setTimeout(() => {
            this.navigate(this.reverse('buy'), { replace: true })
          }, 1)
          return null
        }

        return fn.apply(this, routeArgs)
      }.bind(this, callback)
    }
    this.handlers = this.handlers || []
    this.handlers.unshift({ route, callback })
  },

  _routeToRegExp(route) {
    return pathToRegexp(route)
  },

  handleRoute(location: Location) {
    const { pathname } = location

    this.reactRouterLocation = location

    const handler = find(this.handlers, handler => handler.route.test(pathname))

    if (handler) {
      return handler.callback(pathname)
    }

    return null
  },

  organization: function(tab, connectorId) {
    var OrganizationView = require('organizations/views/OrganizationView')
      .default

    var organization = Login.getActiveOrganization()

    if (!organization.admin) {
      window.setTimeout(() => {
        this.navigate('/', {
          replace: true,
        })
      }, 1)

      return null
    }

    return (
      <Container>
        <OrganizationView model={organization} tab={tab || 'members'} />
      </Container>
    )
  },

  services: function(tab, connectorId) {
    let ServicesAndConnectors = require('services/views').default

    let organization = Login.getActiveOrganization()

    if (!organization.admin) {
      this.navigate('/', {
        replace: true,
      })

      return
    }

    return (
      <Container>
        <ServicesAndConnectors
          connectorId={connectorId}
          tab={tab || 'services'}
        />
      </Container>
    )
  },

  profile: function() {
    const UserProfileView = require('users/views/ProfileView').default

    return (
      <Container>
        <UserProfileView />
      </Container>
    )
  },

  /**
     * /processes
     */
  processes: function() {
    const { Processes } = require('processes/views')

    return (
      <Container>
        <Processes />
      </Container>
    )
  },

  /**
     * /tasks
     */
  tasks(tab) {
    const Main = require('tasks/views/Main').default

    const user = Login.user()

    tab = tab || user.preferences.tasksTab

    return (
      <Container>
        <Main processes={PROCESSES} collection={TASKS} tab={tab || 'inbox'} />
      </Container>
    )
  },

  tour: function(step) {
    var Main = require('tasks/views/Main').default
    var InitialTour = require('../../packages/main/src/components/InitialTour')
      .default

    step = step && parseInt(step)
    if (!step || step < 1 || step > 4) step = 1
    return (
      <Container>
        <div>
          <Main processes={PROCESSES} collection={TASKS} tab="inbox" />
          <InitialTour step={step} />
        </div>
      </Container>
    )
  },

  /**
     * /examples
     */
  examples: function() {
    var ProcessTemplateCollection = require('processes/collections/ProcessTemplateCollection')
    var ExampleProcessCollectionView = require('processes/views/ExampleProcessCollectionView')

    const organization = Login.getActiveOrganization()

    if (
      !Effektif.list('features').hasFeature('Action.ViewExamples') ||
      (organization && !organization.workflowCreator)
    ) {
      window.setTimeout(() => {
        this.navigate('/', {
          replace: true,
        })
      }, 1)

      return null
    }

    var lang = Login.user().preferences.language || locale() || 'en'
    lang = lang.split('_')[0]

    var templates = new ProcessTemplateCollection(null, {
      reset: true,
      category: 'examples_' + lang,
    })

    return (
      <Container>
        <ExampleProcessCollectionView collection={templates} />
      </Container>
    )
  },

  create_process: function() {
    var CreateProcessView = require('processes/views/CreateView')

    return (
      <Container>
        <CreateProcessView model={new Process()} />
      </Container>
    )
  },

  /**
     * /process/:id
     * /process/:id/:tab
     * /process/:id/:tab/:sub
     * /process/:id/:tab/:sub/:actionsub
     */
  process: function(id, tab, sub, actionsub) {
    var EditView = require('processes/views/EditView')
    var LoadView = require('processes/views/LoadView')

    var process = new Process({ id: id })

    if (!process) {
      // fallback to processes list
      this.fallback()
      return
    }

    var rights = process.getRights(Login.user())
    if (!rights.view) {
      this.fallback()
      return
    }

    if (
      !includes(['trigger', 'actions', 'details', 'versions', 'variables'], tab)
    ) {
      // if the tab is missing or invalid, redirect to /actions
      window.setTimeout(() => {
        this.redirect('process', {
          id: id,
          tab: process.get('activities').length === 0 ? 'trigger' : 'actions',
          sub: sub,
        })
      }, 1)

      return null
    }

    var activityId

    if (tab === 'actions') {
      activityId = sub
      sub = actionsub
    }

    return (
      <Container>
        <LoadView model={process}>
          <EditView
            model={process}
            tab={tab}
            sub={sub}
            activityId={activityId}
            services={Effektif.list('services')}
          />
        </LoadView>
      </Container>
    )
  },

  /*
     * /case
     * /process/:id/start
     */
  create_case: function(id) {
    var CaseCreateView = require('cases/views/case/CreateView')

    var process
    if (id) {
      process = new Process({ id: id })
    }

    var newCase = new Case({
      triggerInstance: process ? { sourceWorkflow: process } : null,
    })

    return (
      <Container>
        <CaseCreateView model={newCase} />
      </Container>
    )
  },

  process_start_form: function(id) {
    const StartFormView = require('processes/views/StartFormView').default

    const initialValues = queryString.parse(this.reactRouterLocation.search)

    return (
      <Container>
        <StartFormView sourceWorkflowId={id} defaultValues={initialValues} />
      </Container>
    )
  },

  case: function(id, tid, print) {
    var CaseView = require('cases/views/case').default
    var caze = new Case({ id: id })

    var task
    if (tid) {
      task = new Task({ id: tid })
    }

    return (
      <Container>
        <CaseView
          backOrForwardButtonUsed={
            this.reactRouterLocation &&
            this.reactRouterLocation.action === 'POP'
          }
          model={caze}
          task={task}
          print={print}
        />
      </Container>
    )
  },

  case_print: function(id, tid) {
    return this.case(id, tid, true)
  },

  cases: function(pid, options) {
    options = options || {}

    const CasesView = require('cases/views/CasesView').default

    var process

    if (pid) {
      process = new Process({ id: pid })
    }

    return (
      <Container>
        <CasesView
          showDeleted={options.deleted}
          showAdhoc={options.adhoc}
          showConfig={options.config}
          process={process}
          processId={pid}
        />
      </Container>
    )
  },

  cases_deleted: function() {
    return this.cases(null, { deleted: true })
  },

  cases_adhoc: function() {
    return this.cases(null, { adhoc: true })
  },

  cases_config: function(pid) {
    return this.cases(pid, { config: true })
  },

  admin: function(subview, props) {
    if (!Login.user().systemAdmin) {
      this.fallback()
    }

    props = props || {}

    if (!subview) {
      return this.admin_organizations()
    }

    var Admin = require('eff-admin/views/AdminView')

    return (
      <Container>
        <Admin {...props}>{subview}</Admin>
      </Container>
    )
  },

  admin_organizations: function(id) {
    var Organization = require('eff-admin/models/Organization')
    var OrganizationCollection = require('eff-admin/collections/OrganizationCollection')
    var ManageOrganizations = require('eff-admin/views/organizations').default

    var organization

    if (id) {
      organization = new Organization({ id: id })
    }

    return this.admin(
      <ManageOrganizations
        organization={organization}
        collection={new OrganizationCollection()}
      />,
      { tab: 'admin_organizations' }
    )
  },

  admin_users: function(id) {
    var User = require('eff-admin/models/User')
    var ManageUsers = require('eff-admin/views/users').default

    var user

    if (id) {
      user = new User({ id: id })
    }

    return this.admin(<ManageUsers user={user} />, { tab: 'admin_users' })
  },

  admin_logs: function(id) {
    var LogsView = require('eff-admin/views/logs').default
    var LogGroups = require('eff-admin/collections/LogGroups')
    var LogQuery = require('eff-admin/models/params/LogQuery')
    var LogGroup = require('eff-admin/models/LogGroup')

    var logGroup

    if (id) {
      logGroup = new LogGroup({ _id: id })
    }

    return this.admin(
      <LogsView
        collection={new LogGroups()}
        activeItem={logGroup}
        query={new LogQuery({ query: this.getQuery() })}
      />,
      { tab: 'admin_logs' }
    )
  },

  admin_releases: function(id) {
    let Releases = require('eff-admin/views/ManageReleases').default
    let ReleaseQuery = require('eff-admin/models/params/ReleaseQuery').default
    let ReleaseCollection = require('eff-admin/collections/ReleaseCollection')
    let Release = require('eff-admin/models/Release').default

    let release

    if (id) {
      if (id === 'new') {
        id = void 0
      }

      release = new Release({ id })
    }

    return this.admin(
      <Releases
        collection={new ReleaseCollection()}
        model={release}
        query={new ReleaseQuery(this.getQuery())}
      />,
      { tab: 'admin_releases' }
    )
  },

  admin_auth: function(tab, id) {
    var AuthQuery = require('eff-admin/models/params/AuthQuery')
    var License = require('eff-admin/models/License')
    var LicenseCollection = require('eff-admin/collections/LicenseCollection')
    var GeneratorCollection = require('eff-admin/collections/GeneratorCollection')
    var ManageAuthView = require('eff-admin/views/licenses/components').default
    var model

    var query = new AuthQuery({ query: this.getQuery() })

    if (id) {
      if (id === 'new') {
        id = void 0
      }

      model = new License({
        id: id,
        isGenerator: tab === 'generators',
      })

      model.set(query.print(), { silent: true })
    }

    var collection

    if (tab === 'generators') {
      collection = new GeneratorCollection()
    } else {
      collection = new LicenseCollection()
    }

    return this.admin(
      <ManageAuthView
        category={tab || 'licenses'}
        collection={collection}
        model={model}
        query={query}
      />,
      { tab: 'admin_auth' }
    )
  },

  admin_purchase: function(id) {
    var PurchaseQuery = require('eff-admin/models/params/PurchaseQuery')
    var Purchase = require('eff-admin/models/Purchase')

    var PurchaseCollection = require('eff-admin/collections/PurchaseCollection')
    var PurchaseList = require('eff-admin/views/purchases').default

    var purchase

    if (id) {
      purchase = new Purchase({ id: id })
    }

    return this.admin(
      <PurchaseList
        model={purchase}
        collection={new PurchaseCollection()}
        query={
          new PurchaseQuery({
            query: this.getQuery(),
          })
        }
      />,
      { tab: 'admin_purchase' }
    )
  },

  admin_registrations: function(id, query) {
    var RegistrationQuery = require('eff-admin/models/params/RegistrationQuery')
    var Registration = require('eff-admin/models/Registration')
    var RegistrationCollection = require('eff-admin/collections/RegistrationCollection')
    var RegistrationsView = require('eff-admin/views/registrations').default

    var registration

    if (id) {
      registration = new Registration({ id: id })
    }

    var regQuery = new RegistrationQuery({
      query: this.getQuery(),
    })

    return this.admin(
      <RegistrationsView
        model={registration}
        collection={new RegistrationCollection()}
        query={regQuery}
      />,
      { tab: 'admin_registrations' }
    )
  },

  buy: function(license) {
    const { PaySomeMoney } = require('../../packages/organizations')

    return (
      <Container>
        <PaySomeMoney licenseType={license} />
      </Container>
    )
  },

  admin_feedback: function(id) {
    var FeedbackQuery = require('eff-admin/models/params/FeedbackQuery')
    var FeedbackCollection = require('eff-admin/collections/FeedbackCollection')
    var Feedback = require('eff-admin/models/Feedback')
    var FeedbackView = require('eff-admin/views/feedback').default

    var feedback

    if (id) {
      feedback = new Feedback({ id: id })
    }

    var paramsQuery = new FeedbackQuery({
      queryType: 'feedback',
      query: this.getQuery(),
    })

    return this.admin(
      <FeedbackView
        model={feedback}
        collection={new FeedbackCollection()}
        query={paramsQuery}
      />,
      { tab: 'admin_feedback' }
    )
  },

  admin_system: function() {
    var Configuration = require('eff-admin/models/Configuration')
    var SystemConfiguration = require('eff-admin/views/SystemConfigurationView')

    return this.admin(<SystemConfiguration model={new Configuration()} />, {
      tab: 'admin_system',
    })
  },

  /**
     * Called when no other route matched
     */
  default: function(fragment) {
    return (
      <Container>
        <NotFound />
      </Container>
    )

    fragment = fragment || ''
    var fallbackUrl

    // ensure backwards compatibility whith URLs not containing the org key yet:
    // if a routes matches when prepending the org key, navigate to that one
    var organization = Login.organization()
    if (fragment.indexOf(organization.key + '/') !== 0) {
      fallbackUrl = organization.key + '/' + fragment
    }

    if (!fallbackUrl) {
      fallbackUrl = this.reverse('tasks')
    }

    window.setTimeout(() => {
      this.navigate(fallbackUrl, {
        replace: true,
      })
    }, 1)

    return null
  },
})

export default new Router()



// WEBPACK FOOTER //
// ./src/singleton/Router.js