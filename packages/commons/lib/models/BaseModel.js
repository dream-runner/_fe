'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _lodash = require('lodash');

var _backboneRelPartialput = require('backbone-rel-partialput');

var _backboneRelPartialput2 = _interopRequireDefault(_backboneRelPartialput);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _backboneRelPartialput2.default.Model.extend({
  autoFetchRelated: false,

  // Calling a method listed in this array will invoke **all** mixins' methods for that key.
  // All other mixin methods will simply override the respective base class methods.
  mixinSupportedMethods: ['initialize'],

  // Exclude specific keys from the JSON sent to the server
  excludeJSON: [],

  /**
         * Generic class for a data model
         */
  constructor: function constructor() {
    this._mixins = [];

    if (this.mixins) {
      this.mixin(this.mixins, false);
    }

    _backboneRelPartialput2.default.Model.prototype.constructor.apply(this, arguments);
  },

  initialize: function initialize() {
    var result = _backboneRelPartialput2.default.Model.prototype.initialize.apply(this, arguments);

    // call all mixins' initialize functions
    for (var i = 0; i < this._mixins.length; i++) {
      if (this._mixins[i].initialize) {
        this._mixins[i].initialize.apply(this, arguments);
      }
    }

    return result;
  },

  action: function action(name, options) {
    this._performAction(name, options);
  },

  _performAction: function _performAction(action, options) {
    options = options || {};

    var url = (0, _lodash.result)(this, 'url') + '/' + action;

    _backboneRelPartialput2.default.$.ajax({
      type: options.method || 'POST',
      url: url,
      data: JSON.stringify(options.data || this.toJSON()),
      success: function (response) {
        this.trigger('action:' + action, response);
      }.bind(this),
      error: function (response) {
        this.trigger('error', response.responseJSON);
      }.bind(this)
    });
  },

  /**
         * Allows to dynamically mixin additional methods, references, embeddings, etc.
         * defaults will by default always be set
         */
  mixin: function mixin(_mixin, setDefaults) {
    var _this = this;

    if ((0, _lodash.isArray)(_mixin)) {
      (0, _lodash.each)(_mixin, function (mixin) {
        return _this.mixin(mixin, setDefaults);
      });

      return;
    }

    if ((0, _lodash.includes)(this._mixins, _mixin)) {
      return;
    }

    this._mixins.push(_mixin);

    if (_mixin.references) {
      // add additional references
      this.references = (0, _lodash.extend)({}, this.references, _mixin.references);
    }

    if (_mixin.embeddings) {
      // add additional embeddings
      this.embeddings = (0, _lodash.extend)({}, this.embeddings, _mixin.embeddings);
    }

    if (_mixin.defaults) {
      // set defaults if the respective attributes are undefined
      var defaults = (0, _lodash.result)(_mixin, 'defaults');
      if (defaults && setDefaults !== false) {
        // merge default attribute values
        var defaultsToApply = {};
        (0, _lodash.each)(defaults, function (value, key) {
          if ((0, _lodash.isUndefined)(_this.get(key))) {
            defaultsToApply[key] = value;
          }
        });
        this.set(defaultsToApply);
      }

      var _defaults = this.defaults;

      this.defaults = function () {
        var originalDefaults = (0, _lodash.isFunction)(_defaults) ? _defaults() : _defaults;

        return (0, _lodash.extend)({}, originalDefaults, (0, _lodash.result)(_mixin, 'defaults'));
      }.bind(this);
    }

    if (_mixin.autoFetchRelated) {
      // add additional keys to autoFetchRelated config
      this.autoFetchRelated = (0, _lodash.uniq)((0, _lodash.flatten)((0, _lodash.union)([this.autoFetchRelated || []], [_mixin.autoFetchRelated])));
    }

    (0, _lodash.each)(_mixin, function (obj, key) {
      if ((0, _lodash.includes)(['references', 'embeddings', 'defaults', 'autoFetchRelated'], key)) {
        return;
      }

      if ((0, _lodash.includes)(_this.mixinSupportedMethods, key)) {
        return;
      }

      // for all remaining members of the mixin,
      // override/add those as new members of the instance
      _this[key] = obj;
    });
  },

  // Subclasses may override this method to do stuff that must happen **before** new attributes
  // are set on instances, such as dynamically adding mixins depending on the attribute values
  // that are going to be set
  prepareForSet: function prepareForSet() {},

  /**
         * Override set to add the dynamic mixin hook before anything is actually set
         */
  //@ReactDOM.unstable_batchedUpdates
  set: function set(key, val, options) {
    var attrs;
    if (key === null) {
      return this;
    }

    // Handle both `"key", value` and `{key: value}` -style arguments.
    if ((typeof key === 'undefined' ? 'undefined' : (0, _typeof3.default)(key)) === 'object') {
      attrs = key;
      options = val;
    } else {
      ;(attrs = {})[key] = val;
    }

    options || (options = {});

    var args = arguments;
    var result;
    _reactDom2.default.unstable_batchedUpdates(function () {
      this.prepareForSet(attrs, options);
      result = _backboneRelPartialput2.default.Model.prototype.set.apply(this, args);
    }.bind(this));
    return result;
  },

  /**
         * Use this method for instance that have client assigned IDs to force POST method
         */
  create: function create(options) {
    options = (0, _lodash.extend)(options || {}, { forceMethod: 'create' });

    var isNew = this.isNew;
    this.isNew = function () {
      return true;
    };

    this.save(null, options);

    this.isNew = isNew;
  },

  /**
         * Calls the callback once its synced. If its already synced once
         * then get called imediatly.
         * TODO: get rid of this, as the isSynced flag is not consistently set on embedded models
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
            context ? fn.call(context) : fn();
          }, 1);
        }
      }, context);
    } else {
      context ? fn.call(context) : fn();
    }
  },

  /**
         * @overwrite
         */
  destroy: function destroy(options) {
    options = (0, _lodash.extend)({}, options) || {};

    // double destroyment might be problematic, as it might no longer be
    // possible to build the URL for sync for a destroyed model
    if (this.destroyed) return;

    // support destroying with out sync to the server
    if (options.noSync) {
      this.trigger('destroy', this, this.collection, options);
      if (options.success) options.success(this);
      return false;
    }

    if (options.cascade) {
      if (!options.url) options.url = (0, _lodash.result)(this, 'url');

      if (options.url.indexOf('?') > 0) {
        options.url += '&';
      } else {
        options.url += '?';
      }
      options.url += 'cascade=' + options.cascade;
    }

    this.destroyed = true;
    var error = options.error;
    options.error = function (model, resp, options) {
      if (error) error(model, resp, options);
      delete this.destroyed;
    }.bind(this);
    return _backboneRelPartialput2.default.Model.prototype.destroy.apply(this, [options]);
  },

  toJSON: function toJSON() {
    var result = _backboneRelPartialput2.default.Model.prototype.toJSON.apply(this, arguments);
    return (0, _lodash.omit)(result, this.excludeJSON);
  }
});


// WEBPACK FOOTER //
// ./packages/commons/lib/models/BaseModel.js