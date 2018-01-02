'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _backboneRelPartialput = require('backbone-rel-partialput');

var _backboneRelPartialput2 = _interopRequireDefault(_backboneRelPartialput);

var _lodash = require('lodash');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
     * Generic class for a collection
     */
exports.default = _backboneRelPartialput2.default.Collection.extend({
  // override constructor to add support for default models
  constructor: function constructor(models, options) {
    var defaults = (0, _lodash.result)(this, 'defaults');
    models = models || defaults;

    this._meta = {};

    this.on('sync', this.updateMetaInfo, this);

    // if some models are passed, the overriden reset method will make sure that
    // the defaults are set as well
    return _backboneRelPartialput2.default.Collection.prototype.constructor.call(this, models, options);
  },

  updateMetaInfo: function updateMetaInfo(collection, response, options) {
    if (!options) {
      return;
    }

    var metaSize = options.xhr.getResponseHeader('Meta-Result-Size');

    if (!metaSize) {
      this.meta('size', null);

      return;
    }

    this.meta('size', parseInt(metaSize, 10));
  },

  set: function set() {
    var args = arguments;
    var result;
    _reactDom2.default.unstable_batchedUpdates(function () {
      result = _backboneRelPartialput2.default.Collection.prototype.set.apply(this, args);
    }.bind(this));
    return result;
  },

  // override reset to add support for default models
  reset: function reset(models, options) {
    var defaults = (0, _lodash.result)(this, 'defaults');
    if (defaults) {
      models = (0, _lodash.union)(models, defaults);
    }
    return _backboneRelPartialput2.default.Collection.prototype.reset.call(this, models, options);
  },

  /**
         * Calls the callback once its synced. If its already synced once
         * then get called imediatly.
         * TODO: get rid of this, as the isSynced flag are not consistently set on embedded models
         */
  synced: function synced(fn, context, syncEvents) {
    if ('function' !== typeof fn) {
      return false;
    }

    syncEvents = syncEvents || 'sync error';

    if (!this.isSynced || this.isSyncing) {
      var once = false;
      this.once(syncEvents, function () {
        if (!once && (once = true)) {
          // Call only once
          window.setTimeout(function () {
            // ensure async call
            context ? fn.call(context) : fn();
          }, 1);
        }
      }, context);
    } else {
      context ? fn.call(context) : fn();
    }
  },

  /**
         * Same as synced, but for synchronized for all individual items.
         * The passed callback is called as soon as all pending item syncs are done
         * ATTENTION: this is slightly different to synced in that it won't wait for items
         * with isSynced: undefined and syncing: false.
         */
  allItemsSynced: function allItemsSynced(fn, context, syncEvents) {
    if ('function' !== typeof fn) {
      return false;
    }

    if (this.length === 0) {
      fn.apply(context);
      return;
    }

    syncEvents = syncEvents || 'sync error';

    var itemSyncedCb = (0, _lodash.after)(this.length, fn.bind(context));
    this.each(function (item) {
      if (!item.isSyncing) {
        window.setTimeout(function () {
          // ensure async call
          itemSyncedCb();
        }, 1);
      } else {
        item.once(syncEvents, itemSyncedCb);
      }
    });
  },

  meta: function meta(key, value) {
    if ((0, _lodash.isUndefined)(value)) {
      return this._meta[key];
    }

    this._meta[key] = value;
  }

  // action: function(name, options) {
  //     this._performAction(name, options);
  // },

  // _performAction: function(action, options) {
  //     options = options || {};

  //     var url = result(this, "url") + "/" + action;

  //     Backbone.$.ajax({
  //         type: options.method || "POST",
  //         url: url,
  //         data: JSON.stringify(options.data || {}),
  //         success: function(response) {
  //             this.trigger("action:" + action, response);
  //         }.bind(this),
  //         error: function() {
  //             this.trigger("error");
  //         }.bind(this)
  //     });
  // }
});


// WEBPACK FOOTER //
// ./packages/commons/lib/collections/BaseCollection.js