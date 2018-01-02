'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _effektifApi = require('@signavio/effektif-api');

var _models = require('@signavio/effektif-commons/lib/models');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _User = require('../User');

var _User2 = _interopRequireDefault(_User);

var _UserTile = require('../UserTile');

var _UserTile2 = _interopRequireDefault(_UserTile);

var _Items = require('./Items');

var _Items2 = _interopRequireDefault(_Items);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSelect = function (_Component) {
  (0, _inherits3.default)(UserSelect, _Component);

  function UserSelect(props) {
    (0, _classCallCheck3.default)(this, UserSelect);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.state = {
      singleSelectOpen: false,
      emptyQuery: true
    };
    return _this;
  }

  UserSelect.prototype.render = function render() {
    var _this2 = this;

    if (this.hasValues()) {
      return _react2.default.createElement(
        'div',
        { className: 'user-select' },
        this.renderItems('top'),
        _react2.default.createElement(
          _tiles.Tile,
          { icon: 'user' },
          this.renderAutocomplete()
        ),
        this.renderItems('bottom')
      );
    }

    var _props = this.props,
        value = _props.value,
        disabled = _props.disabled,
        readOnly = _props.readOnly;


    var user = value && value.toJSON ? value.toJSON() : value;

    if (value && !this.state.singleSelectOpen) {
      return _react2.default.createElement(
        _UserTile2.default,
        {
          user: user,
          toolbar: _react2.default.createElement(_buttons.IconButton, {
            disabled: disabled || readOnly,
            icon: 'angle-down',
            iconSet: 'fontAwesome'
          }),
          onClick: function onClick(ev) {
            return _this2.handleClick(ev);
          }
        },
        _effektifApi.userUtils.isDeleted(user) ? _react2.default.createElement(
          _components.Hint,
          { inline: true },
          (0, _signavioI18n2.default)('User has been deleted.')
        ) : _effektifApi.userUtils.name(user)
      );
    }

    return _react2.default.createElement(
      'div',
      { className: 'user-select' },
      this.renderAutocomplete()
    );
  };

  UserSelect.prototype.renderAutocomplete = function renderAutocomplete() {
    var _this3 = this;

    var _props2 = this.props,
        value = _props2.value,
        placeholder = _props2.placeholder,
        children = _props2.children,
        query = _props2.query;
    var singleSelectOpen = this.state.singleSelectOpen;


    return _react2.default.createElement(
      _components.Autocomplete,
      (0, _extends3.default)({}, this.props, {
        resetOnBlur: true,
        resetOnComplete: true,
        ref: function ref(_ref) {
          _this3.autocomplete = _ref;
        },
        query: query,
        value: value && ((0, _lodash.isFunction)(value.name) ? value.name() : value.name),
        renderItem: function renderItem(item) {
          if (item.type === 'user' && !item.isEmail) {
            return _react2.default.createElement(_User2.default, { transparent: true, value: item.entity.id });
          }

          return _react2.default.createElement(
            _tiles.TextTile,
            {
              transparent: true,
              iconSet: item.type === 'organization' ? 'fontAwesome' : undefined,
              icon: getIcon(item)
            },
            getTitle(item)
          );
        },
        onComplete: function onComplete(item) {
          return _this3.handleComplete(item);
        },
        onResult: function onResult(results, transform, query) {
          return _this3.handleResult(results, transform, query);
        },
        onBlur: function onBlur() {
          return _this3.handleBlur();
        },
        placeholder: placeholder || (0, _signavioI18n2.default)('Type user name or email to search'),
        autoFocus: singleSelectOpen
      }),
      children,
      this.renderShowAll()
    );
  };

  UserSelect.prototype.handleBlur = function handleBlur() {
    var onBlur = this.props.onBlur;


    if (onBlur) {
      onBlur();
    }

    if (this.props.static) {
      return;
    }

    this.props.setShowAll(false);
    this.setState({
      emptyQuery: false,
      singleSelectOpen: false
    });
  };

  UserSelect.prototype.handleClick = function handleClick(ev) {
    if (this.props.disabled || this.props.readOnly) {
      return;
    }

    ev.stopPropagation();
    ev.preventDefault();

    if (ev.nativeEvent && ev.nativeEvent.stopImmediatePropagation) {
      ev.nativeEvent.stopImmediatePropagation();
    }

    this.setState({ singleSelectOpen: true });
  };

  UserSelect.prototype.getValues = function getValues() {
    var items = this.props.items;


    if (!items) {
      return {
        users: []
      };
    }

    if ((0, _lodash.isArray)(items)) {
      return { users: items };
    }

    return items;
  };

  UserSelect.prototype.renderItems = function renderItems(position) {
    var _props3 = this.props,
        listPosition = _props3.listPosition,
        emptyHint = _props3.emptyHint,
        readOnly = _props3.readOnly,
        onRemove = _props3.onRemove,
        hideToolbar = _props3.hideToolbar;


    if (position !== listPosition) {
      return null;
    }

    if (!this.hasValues()) {
      if (!emptyHint) {
        return null;
      }

      return _react2.default.createElement(
        _components.Hint,
        null,
        emptyHint
      );
    }

    var _getValues = this.getValues(),
        _getValues$users = _getValues.users,
        users = _getValues$users === undefined ? [] : _getValues$users,
        _getValues$groups = _getValues.groups,
        groups = _getValues$groups === undefined ? [] : _getValues$groups;

    return _react2.default.createElement(_Items2.default, {
      readOnly: readOnly,
      groups: groups.map(function (group) {
        return group.toJSON ? group.toJSON() : group;
      }),
      users: users.map(function (user) {
        return user.toJSON ? user.toJSON() : user;
      }),
      onRemove: onRemove,
      hideToolbar: hideToolbar
    });
  };

  UserSelect.prototype.renderShowAll = function renderShowAll() {
    var _this4 = this;

    if (!selectionIsRestricted(this.props) || !this.state.emptyQuery) {
      return null;
    }

    return _react2.default.createElement(
      'button',
      {
        className: 'btn btn-link btn-text btn-show-all',
        onClick: function onClick(event) {
          return _this4.showAllUsers(event);
        }
      },
      (0, _signavioI18n2.default)('Show all users')
    );
  };

  UserSelect.prototype.showAllUsers = function showAllUsers(ev) {
    var _this5 = this;

    ev.stopPropagation();

    if (ev.nativeEvent && ev.nativeEvent.stopImmediatePropagation) {
      ev.nativeEvent.stopImmediatePropagation();
    }

    this.props.setShowAll(true);

    (0, _lodash.defer)(function () {
      // must happen deferred because the new query must only be dispatched when the new state
      // has become active
      _this5.autocomplete.focus();
    });
  };

  UserSelect.prototype.handleComplete = function handleComplete(item) {
    var _props4 = this.props,
        onUserSelect = _props4.onUserSelect,
        onGroupSelect = _props4.onGroupSelect,
        onOrganizationSelect = _props4.onOrganizationSelect;


    switch (item.type) {
      case 'user':
        if (onUserSelect) {
          onUserSelect(item.entity, item.isEmail, item.type);
        }

        break;
      case 'group':
        if (onGroupSelect) {
          onGroupSelect(item.entity);
        }

        break;
      case 'organization':
        if (onOrganizationSelect) {
          onOrganizationSelect(item.entity);
        }

        break;
    }

    this.setState({
      singleSelectOpen: false
    });
  };

  UserSelect.prototype.handleResult = function handleResult(results, transform, query) {
    var _props5 = this.props,
        filter = _props5.filter,
        showAll = _props5.showAll;


    if (!query || query.length === 0) {
      this.setState({
        emptyQuery: true
      });

      if (!showAll) {
        if (hasAssigneeGroup(this.props)) {
          transform(filter(results));

          return;
        }
      }
    } else {
      this.setState({
        emptyQuery: false
      });
    }

    var filteredResults = this.filterResults(filter(this.matchGroups(results)));

    var grouped = (0, _lodash.groupBy)(filteredResults, function (entity) {
      return entity.type;
    });

    grouped.user = this.sortResults(grouped.user);

    transform((0, _lodash.compact)([].concat(grouped.organization, grouped.group, grouped.user)));
  };

  UserSelect.prototype.matchGroups = function matchGroups(results) {
    var _props6 = this.props,
        items = _props6.items,
        showGroups = _props6.showGroups;


    if (!showGroups || !items || !items.groups) {
      return results;
    }

    if (items.groups.length === 0) {
      return results;
    }

    var _groupBy = (0, _lodash.groupBy)(results, function (result) {
      return result.type;
    }),
        _groupBy$user = _groupBy.user,
        users = _groupBy$user === undefined ? [] : _groupBy$user,
        _groupBy$group = _groupBy.group,
        groups = _groupBy$group === undefined ? [] : _groupBy$group;

    return [].concat((0, _toConsumableArray3.default)((0, _lodash.map)(users, function (user) {
      var matchedByGroup = (0, _lodash.some)(items.groups, function (group) {
        return !!(0, _lodash.find)(user.entity.groupIds, function (id) {
          return id === group.id;
        });
      });

      if (!matchedByGroup) {
        return user;
      }

      return (0, _extends3.default)({}, user, {

        disabled: true
      });
    })), (0, _toConsumableArray3.default)(groups));
  };

  UserSelect.prototype.sortResults = function sortResults(items) {
    var _this6 = this;

    var user = this.props.user;


    return (0, _lodash.sortBy)(items, function (item) {
      // sort candidates to top
      // TODO: is there any way to get candidateGroupIds in here as well?
      var prefix = (0, _lodash.find)(_this6.props.candidateIds, function (candidateId) {
        return candidateId === item.entity.id;
      }) ? '1_' : '2_';

      if (_this6.props.selfOnTop && item.entity.id === user.id) {
        prefix = '0_';
      }

      var val = item.entity.lastName.toLowerCase();

      return prefix + val;
    });
  };

  UserSelect.prototype.hasValues = function hasValues() {
    var _getValues2 = this.getValues(),
        _getValues2$users = _getValues2.users,
        users = _getValues2$users === undefined ? [] : _getValues2$users,
        _getValues2$groups = _getValues2.groups,
        groups = _getValues2$groups === undefined ? [] : _getValues2$groups;

    return [].concat((0, _toConsumableArray3.default)(groups), (0, _toConsumableArray3.default)(users)).length !== 0;
  };

  UserSelect.prototype.filterResults = function filterResults(results) {
    if (!this.hasValues()) {
      return results;
    }

    // first transforming current value list

    var _getValues3 = this.getValues(),
        _getValues3$users = _getValues3.users,
        users = _getValues3$users === undefined ? [] : _getValues3$users,
        _getValues3$groups = _getValues3.groups,
        groups = _getValues3$groups === undefined ? [] : _getValues3$groups;

    var current = (0, _lodash.compact)([].concat((0, _toConsumableArray3.default)(groups), (0, _toConsumableArray3.default)(users))).map(function (item) {
      if ((0, _lodash.isString)(item)) {
        return item;
      }

      return item.id;
    });

    // now filtering curretn results
    return (0, _lodash.map)(results, function (result) {
      if (!(0, _lodash.isUndefined)(result.disabled)) {
        return result;
      }

      return (0, _extends3.default)({}, result, {

        disabled: (0, _lodash.includes)(current, result.entity.id)
      });
    });
  };

  UserSelect.prototype.focus = function focus() {
    this.autocomplete.focus();
  };

  return UserSelect;
}(_react.Component);

var getIcon = function getIcon(item) {
  if (item.type === 'group') {
    return 'group';
  }

  if (item.isEmail) {
    return 'at';
  }

  if (item.type === 'organization') {
    return 'building-o';
  }

  return null;
};

var getTitle = function getTitle(item) {
  if ((0, _lodash.includes)(['group', 'organization'], item.type) || item.isEmail) {
    return item.value;
  }

  return null;
};

/**
 * Creates the userIds and groupIds parameters for the user queries
 * based on the existing candidates, candidate groups and the assignee group.
 */
var createUserQueryParameters = function createUserQueryParameters(_ref2) {
  var showAll = _ref2.showAll,
      candidateIds = _ref2.candidateIds,
      candidateGroupIds = _ref2.candidateGroupIds,
      groupId = _ref2.groupId;

  var hasLimitation = !showAll && (!!groupId || candidateIds.length > 0 || candidateGroupIds.length > 0);
  var parameters = {};
  if (hasLimitation) {
    if (groupId) {
      // it's an assignee group
      parameters.groupIds = [groupId];
    } else {
      if (candidateIds.length > 0) {
        parameters.userIds = candidateIds;
      }
      if (candidateGroupIds.length > 0) {
        parameters.groupIds = candidateGroupIds;
      }
    }
  }
  return parameters;
};

var hasCandidates = function hasCandidates(_ref3) {
  var candidateIds = _ref3.candidateIds,
      candidateGroupIds = _ref3.candidateGroupIds;
  return candidateIds.length > 0 || candidateGroupIds.length > 0;
};

var hasAssigneeGroup = function hasAssigneeGroup(_ref4) {
  var groupId = _ref4.groupId;
  return !!groupId;
};

/**
 * The group selection should never be shown if a list of candidates
 * is defined. Only by selecting 'showAll' this behaviour can be overriden.
 */
var selectionIsRestricted = function selectionIsRestricted(props) {
  var showAll = props.showAll;

  return (hasAssigneeGroup(props) || hasCandidates(props)) && !showAll;
};

exports.default = (0, _recompose.compose)(_effektifApi.withUser, _effektifApi.withOrganization, (0, _recompose.defaultProps)({
  candidateIds: [],
  candidateGroupIds: [],
  items: [],
  listPosition: 'top',
  // if set to true, no other users are selectable than those that are candidates
  restrictToCandidates: false,
  filter: function filter(results) {
    return results;
  }
}), (0, _recompose.withState)('showAll', 'setShowAll', false), (0, _recompose.withState)('query', 'changeQuery', function (props) {
  var organization = props.organization,
      showGroups = props.showGroups,
      showOrganization = props.showOrganization;

  var parameters = createUserQueryParameters(props);
  var queries = [new _models.UserQuery(organization, parameters)];

  if (showGroups) {
    var groupQuery = new _models.GroupQuery(organization);
    groupQuery.setDisabled(selectionIsRestricted(props));
    queries.unshift(groupQuery);
  }

  if (showOrganization) {
    queries.unshift(new _models.OrganizationQuery(organization));
  }

  return new (Function.prototype.bind.apply(_models.QueryContainer, [null].concat(queries)))();
}), (0, _recompose.withPropsOnChange)(['groupId', 'showAll'], function (props) {
  var query = props.query,
      showGroups = props.showGroups;

  var parameters = createUserQueryParameters(props);
  query.getQuery('user').setParameters(parameters);
  if (showGroups) {
    query.getQuery('group').setDisabled(selectionIsRestricted(props));
  }
  return { query: query };
}), (0, _components.omitProps)(['organization', 'changeQuery']))(UserSelect);


// WEBPACK FOOTER //
// ./packages/organizations/lib/users/components/select/Select.js