'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMentions = require('react-mentions');

var _recompose = require('recompose');

var _effektifApi = require('@signavio/effektif-api');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _UserTile = require('./UserTile');

var _UserTile2 = _interopRequireDefault(_UserTile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAX_MEMBERS = 5;

function searchUsers() {
  var users = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var participants = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var search = arguments[2];
  var currentUser = arguments[3];

  var allUsers = (0, _lodash.uniqBy)([].concat((0, _toConsumableArray3.default)(participants), (0, _toConsumableArray3.default)(users)), 'id');
  return (0, _lodash.filter)(allUsers, function (user) {
    return _effektifApi.userUtils.name(user).toLowerCase().indexOf((search || '').toLowerCase()) >= 0 && user.id !== currentUser.id;
  }).filter(function (user) {
    return !user.inactive && _effektifApi.userUtils.name(user).length > 0;
  }).slice(0, MAX_MEMBERS).map(function (user) {
    return {
      id: user.id,
      display: _effektifApi.userUtils.name(user),
      user: user
    };
  });
}

function UserMentionsInput(props) {
  var children = props.children,
      _props$markdown = props.markdown,
      markdown = _props$markdown === undefined ? true : _props$markdown,
      onRequestUsers = props.onRequestUsers,
      style = props.style,
      rest = (0, _objectWithoutProperties3.default)(props, ['children', 'markdown', 'onRequestUsers', 'style']);

  var Component = markdown ? _components.MarkdownMentionsInput : _components.MentionsInput;

  return _react2.default.createElement(
    Component,
    (0, _extends3.default)({}, rest, { markup: '@[__display__](__type__:__id__)' }),
    children,
    _react2.default.createElement(_reactMentions.Mention, {
      style: style('mention'),
      key: 'user',
      type: 'user',
      trigger: '@',
      data: onRequestUsers,
      renderSuggestion: function renderSuggestion(suggestion, a, b, index) {
        var id = suggestion.id,
            display = suggestion.display,
            user = suggestion.user;

        var _style = style('suggestion'),
            className = _style.className,
            suggestionStyle = _style.style;

        return _react2.default.createElement(
          _UserTile2.default,
          {
            user: user,
            className: className,
            style: (0, _extends3.default)({}, suggestionStyle, index > 0 ? { marginTop: 1 } : null),
            subtitle: user.emailAddress
          },
          display
        );
      }
    })
  );
}

exports.default = (0, _recompose.compose)(_effektifApi.withUser, _effektifApi.withOrganization, (0, _recompose.withState)('query', 'setQuery'), (0, _recompose.withHandlers)(function () {
  var resultsCallback = void 0;
  return {
    getResultsCallback: function getResultsCallback() {
      return function () {
        return resultsCallback;
      };
    },
    setResultsCallback: function setResultsCallback() {
      return function (callback) {
        resultsCallback = callback;
      };
    }
  };
}), (0, _effektifApi.connect)(function (_ref) {
  var query = _ref.query;
  return {
    fetchUsers: {
      type: _effektifApi.types.USERS,
      query: {
        name: query,
        pageSize: MAX_MEMBERS
      },
      lazy: !query
    }
  };
}), (0, _recompose.withPropsOnChange)(['setQuery'], function (_ref2) {
  var setQuery = _ref2.setQuery;
  return {
    debouncedSetQuery: (0, _lodash.debounce)(setQuery, 200)
  };
}), (0, _recompose.lifecycle)({
  componentWillReceiveProps: function componentWillReceiveProps(_ref3) {
    var participants = _ref3.participants,
        getResultsCallback = _ref3.getResultsCallback,
        fetchUsers = _ref3.fetchUsers,
        query = _ref3.query,
        user = _ref3.user;

    if (fetchUsers.value !== this.props.fetchUsers.value) {
      var provideResults = getResultsCallback();
      provideResults(searchUsers(fetchUsers.value, participants, query, user));
    }
  }
}), (0, _recompose.withHandlers)({
  onRequestUsers: function onRequestUsers(_ref4) {
    var setResultsCallback = _ref4.setResultsCallback,
        participants = _ref4.participants,
        debouncedSetQuery = _ref4.debouncedSetQuery,
        fetchUsers = _ref4.fetchUsers,
        user = _ref4.user;
    return function (search, callback) {
      setResultsCallback(callback);
      debouncedSetQuery(search);
      return searchUsers(fetchUsers.value, participants, search, user);
    };
  }
}), (0, _components.omitProps)(['handleRequestUsers', 'getResultsCallback', 'setResultsCallback', 'user', 'organization', 'query', 'setQuery', 'debouncedSetQuery', 'participants', 'fetchUsers']), (0, _styles.defaultStyle)(function (theme) {
  return {
    mention: {
      backgroundColor: theme.color.primary.light
    },
    suggestion: {
      backgroundColor: null
    }
  };
}))(UserMentionsInput);


// WEBPACK FOOTER //
// ./packages/organizations/lib/users/components/MentionsInput.js