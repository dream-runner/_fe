import UniqueModel from 'uniquemodel'
import _, { each, mergeWith, reduce } from 'lodash'
import $ from 'jquery'

import Effektif from 'singleton/Effektif'
import Login from 'singleton/Login'
import variableTypeDescriptors from 'singleton/VariableTypeDescriptors'

import { EventUtils } from 'commons-utils'

import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections

import { User } from 'users/models'

import * as __FieldViews__ from 'forms/views/fields'

import { Action, Trigger } from 'activities/models'
import { ActionCollection } from 'activities/collections'

import { getRightsFromOverview } from '../../../packages/access'

import { getAccessDefinition, getInitialRights } from '../utils'

import Version from './Version'
import Transition from './Transition'
import StartInfo from './StartInfo'

import { Diagram } from './diagram'

import {
  TransitionCollection,
  VersionCollection,
  VariableCollection,
  CaseColumnCollection,
} from '../collections'

const SUPPORTED_TYPES = _.keys(__FieldViews__)

/**
     * A Process defines a template for recurring work procedures consisting of Activities
     * and Transitions between those.
     *
     */
module.exports = UniqueModel(
  BaseModel.extend({
    urlRoot: function() {
      return Effektif.makeUrl('workflows')
    },

    references: {
      owner: User,
      editor: User,
    },

    embeddings: {
      trigger: Trigger,
      activities: ActionCollection,
      transitions: TransitionCollection,
      variables: VariableCollection,
      diagram: Diagram,
      caseColumns: CaseColumnCollection,

      versions: VersionCollection,

      startInfo: StartInfo,
    },

    defaults: () => {
      return {
        name: '',
        changed: false,
        published: false,
        trigger: calculateDefaultTrigger(),
        transitions: [],
        activities: [],
        versions: [],
        variables: [],
        caseColumns: [],
        diagram: {},
      }
    },

    // Always inline all embeddings
    inlineJSON: function() {
      return ['owner'].concat(
        _.without(_.keys(this.embeddings), 'versions', 'startForm')
      )
    },

    constructor: function() {
      this.on('change:trigger', this.handleTriggerChange, this)

      // Call constructor
      return BaseModel.prototype.constructor.apply(this, arguments)
    },

    /**
         * Override set to trigger attach events on attached models after full set is completed
         */
    set: function(key, val, options) {
      var eventListeners = []
      var triggerAttachAndDetach = (process, constituent, opts) => {
        var key = _.find(_.keys(process.embeddings), key => {
          return process.get(key) === constituent
        })
        var previous = process.previous(key)
        if (previous) {
          previous._process = null
          previous.trigger('detach', previous, process, opts)
        }

        if (constituent) {
          constituent._process = process
          constituent.trigger('attach', constituent, process, opts)
        }
      }

      _.each(
        this.embeddings,
        (val, key) => {
          eventListeners.push(
            EventUtils.eachOnce(
              this,
              ['change:' + key, 'change'],
              triggerAttachAndDetach
            )
          )
        },
        this
      )

      var result = BaseModel.prototype.set.apply(this, arguments)

      _.invoke(eventListeners, 'off')

      return result
    },

    // Iterate all constituents of this process, i.e., all deep embeddings
    // skip arguments takes a function for filtering on items that shall be skipped in traversing (also all their embeddings will be skipped)
    forEachConstituent: function(callback, ctx, skip) {
      var models = []
      this._collectConstituentsRecursive(models, this, skip)
      _.each(models, callback.bind(ctx))
    },

    _collectConstituentsRecursive: function(models, model, skip) {
      if (_.isFunction(skip) && skip(model)) {
        return
      }

      models.push(model)

      var keys, key, i, l

      // continue with traversing all embeddings of the currently inspected model
      keys = _.keys(model.embeddings)
      for (i = 0, l = keys.length; i < l; ++i) {
        key = keys[i]

        var embeddee = model.get(key)

        if (embeddee instanceof BaseCollection) {
          models.push(embeddee)
          embeddee.each(item =>
            this._collectConstituentsRecursive(models, item, skip)
          )
        } else if (embeddee) {
          this._collectConstituentsRecursive(models, embeddee, skip)
        }
      }
    },

    parse: function(resp, options) {
      if (options && options.onlySetServerAttrs) {
        // make sure that only attributes that are set on the server are updated
        return _.pick(resp, [
          'id',
          'editor',
          'editorId',
          'editorLock',
          'lastUpdated',
          'owner',
          'ownerId',
        ])
      } else {
        return BaseModel.prototype.parse.apply(this, arguments)
      }
    },

    // Override to disable partial put
    // TODO: do not set response on the model, but handle error message
    save: function(key, val, options) {
      if (this._saveInProgress) {
        this._saveOutstanding = true
        return
      }

      this._saveInProgress = true

      this.forEachConstituent(constituent => {
        constituent.trigger('save', constituent, this)
      })

      var model = this
      var attrs

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (_.isUndefined(key) || _.isNull(key) || typeof key === 'object') {
        attrs = key
        options = val
      } else {
        ;(attrs = {})[key] = val
      }

      this.set('changed', true)

      // disable partial put and ensure that clear is false as parse will ensure that only the server-modifiable attrs are set
      options || (options = {})
      options = _.extend({}, options, {
        partial: false,
        clear: false,
        parse: true,
        onlySetServerAttrs: true,
      })

      // TODO: the server should only send error messages when responding with a non 200 status code
      // Here we should handle such errors and alert the user and Track.js, maybe even enforce page reload.

      // TODO: on response 403 Forbidden (locked), we should unset the editor (turns the process document read-only)
      // and then show a message (explain that the latest change will have to be redone, offer to reload the page)
      _.extend(options, {
        error: function(process, response) {
          delete this._saveInProgress

          if (response.status === 403) {
            process.set('editor', null)
            process.trigger('lostlock', process)
          }

          if (response.status === 409) {
            process.trigger('conflict')
          }

          if (response.status === 500) {
            process.trigger('servererror')
          }
        }.bind(this),
        success: function() {
          delete this._saveInProgress
          if (this._saveOutstanding) {
            this.debouncedSave()
          }
        }.bind(this),
      })

      // reset _saveOutstanding for debounced saving
      delete this._saveOutstanding
      return BaseModel.prototype.save.apply(this, [attrs, options])
    },

    /**
         * Waits a little bit before it calls the save method.
         * If the method is called multiple time, it get called
         * only once after the last call.
         *
         */
    debouncedSave: function() {
      this._saveOutstanding = true
      if (!this._debouncedSave) {
        this._debouncedSave = _.debounce(this.ensureSaved, 100)
      }
      return this._debouncedSave()
    },

    isPrivate() {
      return !!this.get('access')
    },

    isPublic() {
      return !this.isPrivate()
    },
    makePublic() {
      this.set('access', null)
    },

    ensureSaved(options) {
      if (!this._saveOutstanding) {
        return
      }

      if (this.isLocked() && !this.isLockedTo(Login.user())) {
        return
      }

      if (this.isPrivate() && !this.hasRight('edit', Login.user())) {
        return
      }

      this.save(undefined, options)
    },

    load(onLoad) {
      this.once('sync', () =>
        this.lock().then(() => {
          this.cleanup()

          let diagram

          if (!this.get('diagram')) {
            this.initDiagram()
          } else {
            diagram = this.get('diagram')

            if (
              diagram.cleanup(this.get('activities'), this.get('transitions'))
            ) {
              diagram.save()
            }

            diagram.initDeepListeners()
          }

          this.get('transitions').initListeners()
          this.get('activities').initListeners()

          /*
            In some cases the references are re-instantianted (cleared) and the listeners get lost.
            In order to prevent that we subscribe for every transition or activity change
            and re-init the Listeners
          */
          this.on('change:transitions', () => {
            this.get('transitions').initListeners()
          })
          this.on('change:activities', () => {
            this.get('activities').initListeners()
          })

          onLoad()
        })
      )

      this.fetch({ clear: true })
      variableTypeDescriptors.fetch()
    },

    cleanup() {
      const visited = {}
      const toDelete = []

      this.get('transitions').each(transition => {
        if (!transition.get('fromId') || !transition.get('toId')) {
          toDelete.push(transition)

          return
        }

        const id = `${transition.get('fromId')}-${transition.get('toId')}`

        if (visited[id]) {
          // remove duplicate transitions
          toDelete.push(transition)

          return
        }

        visited[id] = true
      })

      each(toDelete, transition => transition.destroy())
    },

    loadVersions: function(clb, ctx) {
      var versions = this.get('versions')

      versions.once('sync', clb, ctx)
      versions.fetch()
    },

    fetchStartInfo: function(cb, context) {
      this.set('startInfo', {})
      this.get('startInfo').fetch()
      this.get('startInfo').once(
        'sync error',
        (model, resp, opts) => {
          // if there's no start form for this process no content will be responded (responseText: "")
          if (opts.xhr.status !== 200) {
            this.set('startInfo', null)
          }

          cb.call(context, this.get('startInfo'), opts.xhr.status >= 400)
        },
        this
      )
    },

    lock() {
      if (!this._lockPending) {
        this._lockPending = new Promise((resolve, reject) => {
          const rights = this.getRights(Login.user())

          if (this.isLocked() || !rights.edit) {
            delete this._lockPending

            resolve()

            return
          }

          $.post(`${this.url()}/lock`)
            .done(data => {
              this.set(this.parse(data), { parse: true })

              resolve()
            })
            .fail((xhr, status, error) => reject(error))
            .always(() => delete this._lockPending)
        })
      }

      return this._lockPending
    },

    unlock(async = true, user, organization) {
      if (!this.isLockedTo(user) && !this._lockPending) {
        return
      }

      if (!this._unlockPending) {
        this._unlockPending = $.post(
          `/api/v1/${organization.key}/workflows/${this.id}/unlock`,
          { async }
        )
          .done(() => {
            this.set({
              editor: null,
              editorLock: null,
            })
          })
          .always(() => delete this._unlockPending)
      }

      return this._unlockPending
    },

    isLocked: function() {
      return !!this.get('editorLock')
    },

    isLockedTo: function(user) {
      return this.isLocked() && this.get('editorId') === user.id
    },

    addActivity: function(activity, options) {
      options = options || {}

      if (_.isNumber(options.index)) {
        this.get('activities').add(activity, { at: options.index })
      } else {
        this.get('activities').add(activity)
      }

      if (options.nextTo) {
        this.addFollowing(options.nextTo, activity)
      } else {
        this.get('diagram').add(activity, options.position)
      }
    },

    addFollowing: function(source, target) {
      var origin = this.get('activities').get(source)

      if (!origin) {
        return
      }

      var activity

      if (target.id) {
        activity = this.get('activities').get(target.id)
      }

      if (!activity) {
        activity = new Action({
          type: target.type,
        })

        this.get('activities').add(activity)
      }

      if (target.position) {
        this.get('diagram').addAt(activity, target.position)
      } else {
        this.get('diagram').addNextTo(activity, origin)
      }

      this.addConnection(origin, activity)
      return activity
    },

    addConnection: function(from, to) {
      var transition = this.get('transitions').find(transition => {
        return transition.get('from') === from && transition.get('to') === to
      })

      if (!transition) {
        transition = new Transition({
          from: from,
          to: to,
        })

        this.get('transitions').add(transition)
      }

      this.get('diagram').addConnection(transition)
    },

    initDiagram: function() {
      var diagram = new Diagram()
      diagram.init(this, this.get('activities'), this.get('transitions'))

      this.set('diagram', diagram)
    },

    removeActivity: function(activity) {
      if (!activity) {
        return
      }

      activity.destroy()
    },

    makePrivate: function(users) {
      this.set('access', getInitialRights(users))
    },

    // TODO: this should be removed and replaced by server computed access
    getRights: function(user) {
      const rights = getAccessDefinition().order

      const accessMerger = (objectValue, sourceValue) =>
        objectValue || sourceValue

      const groupIds = user.groupIds
      const organization = Login.getActiveOrganization()

      const userAccess = getRightsFromOverview(this.get('access'), rights, user)
      const groupAccess = reduce(
        groupIds,
        (result, id) =>
          mergeWith(
            getRightsFromOverview(this.get('access'), rights, {
              id,
              type: 'group',
            }),
            result,
            accessMerger
          ),
        {}
      )
      const organizationAccess = getRightsFromOverview(
        this.get('access'),
        rights,
        organization
      )

      return mergeWith(
        userAccess,
        groupAccess,
        organizationAccess,
        accessMerger
      )
    },

    hasRight: function(right, entity) {
      return !!this.getRights(entity)[right]
    },

    getRoles: function() {
      return this.get('variables').filter(variable => {
        return variable.get('type').get('name') === 'userId'
      })
    },

    getCaseVariable: function() {
      return this.get('variables').get('case')
    },

    // Returns an array of all bindables within this process
    // @param Array `types` (optional) Filter bindables by type
    //
    getBindables: function(types) {
      var bindables = []
      this.get('variables').each(variable => {
        bindables = _.union(bindables, variable.getBindables())
      })

      if (!types) {
        return _.filter(bindables, bindable =>
          _.includes(SUPPORTED_TYPES, bindable.getType().get('name'))
        )
      }

      types = _.isArray(types) ? types : [types]

      return _.filter(bindables, bindable => {
        return _.some(types, type => {
          let bindableType = bindable.getType()

          return (
            bindableType.convertsTo(type) &&
            _.includes(SUPPORTED_TYPES, bindableType.get('name'))
          )
        })
      })
    },

    hasTransitions: function() {
      return this.get('transitions').size() > 0
    },

    hasFlowElements: function() {
      var activities = this.get('activities')

      if (activities.length === 0) {
        return false
      }

      return activities.some(activity => {
        return activity.get('type').isFlowElement()
      })
    },

    publish: function(commitMessage = null, success, error) {
      this.trigger('prepublish', this)
      this.trigger('publish', this)

      this.cleanup()

      var createNewVersion = function() {
        var version = new Version({
          commitMessage: commitMessage,
          creator: Login.user(),
        })

        this.get('versions').add(version)
        version.save(null, {
          success: () => {
            this.set({
              latestVersion: version.id,
              changed: false,
            })

            this.get('versions').reset()
            success && success(version)
          },
          error: (model, resp, options) => {
            this.get('versions').remove(version)
            error && error(resp.responseJSON.message)
          },
        })
      }.bind(this)

      if (this._saveOutstanding) {
        // ensure that the latest changes are saved, before creating the new version
        this.save()
        this.once('sync', createNewVersion)
        return
      }

      createNewVersion()
    },

    isPublished: function() {
      return !!this.get('latestVersion') || this.get('versions').length > 0
    },

    isApprovalWorkflow: function() {
      var trigger = this.get('trigger')

      return !!trigger && trigger.get('type').get('key') === 'approvalWorkflow'
    },

    /**
         * Returns true if the process can be started inside of Effektif
         */
    isStartable: function(user) {
      if (user) {
        var rights = this.getRights(user)

        if (!rights.start) {
          return false
        }
      }

      if (!this.isPublished()) {
        return false
      }

      if (this.isApprovalWorkflow()) {
        return false
      }

      return true
    },

    handleTriggerChange: function() {
      if (
        !this.get('trigger') ||
        this.get('trigger').get('type') === 'manual'
      ) {
        // reset case name template
        this.set('nameTemplate', null)
      }
    },

    // This method is required for the ProcessConstituent's getProcess lookup
    getProcess: function() {
      return this
    },
  }),
  'Process'
)

// If the manual trigger is not available for the given license, we have to use another default for the trigger
function calculateDefaultTrigger() {
  var defaultTrigger = null

  if (Effektif.list('features').hasFeature('Trigger.Manual')) {
    return null
  }

  var triggerFeatures = Effektif.list('features').filterByCategory('trigger')

  if (triggerFeatures.length === 0) {
    return
    // throwing an error here makes testing a pain in the arse, because you need
    // to specify licenses and features. Since I guess this configuration is very
    // unlikely in the wild I removed the exception --Phil
    // throw new Error("The license does not include any trigger types, thus it is not possible to create workflows.")
  }

  var firstTriggerType = triggerFeatures[0].get('key').slice('Trigger.'.length)
  firstTriggerType =
    firstTriggerType.charAt(0).toLowerCase() + firstTriggerType.slice(1)

  return {
    type: firstTriggerType,
  }
}



// WEBPACK FOOTER //
// ./src/processes/models/Process.js