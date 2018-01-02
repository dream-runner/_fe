'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components2 = require('@signavio/workflow-organizations/lib/users/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Participants = function (_Component) {
  (0, _inherits3.default)(Participants, _Component);

  function Participants() {
    (0, _classCallCheck3.default)(this, Participants);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  Participants.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        participants = _props.participants,
        style = _props.style;


    return _react2.default.createElement(
      'div',
      style('container'),
      _react2.default.createElement(
        _components.DropDown,
        {
          toggle: _react2.default.createElement(
            _components.List,
            { direction: 'horizontal' },
            participants.map(function (_ref) {
              var id = _ref.id;
              return _react2.default.createElement(_components2.UserAvatar, { key: id, value: id });
            })
          )
        },
        _react2.default.createElement(
          _components.List,
          null,
          participants.map(function (_ref2) {
            var id = _ref2.id,
                events = _ref2.events;
            return _react2.default.createElement(
              _components.Popover,
              {
                small: true,
                key: id,
                placement: 'right',
                popover: _this2.renderInfo(events)
              },
              _react2.default.createElement(_components2.User, (0, _extends4.default)({
                value: id,
                key: id,
                subtitle: events.length > 0 && (0, _signavioI18n2.default)('__count__ action item', '__count__ action items', {
                  count: events.length
                })
              }, style('user')))
            );
          })
        )
      )
    );
  };

  Participants.prototype.renderInfo = function renderInfo(events) {
    if (events.length === 0) {
      return _react2.default.createElement(
        _components.Hint,
        { inline: true },
        (0, _signavioI18n2.default)('No further information')
      );
    }

    return _react2.default.createElement(
      _components.List,
      null,
      this.renderStartCase(events),
      this.renderInitialTaskCreated(events),
      this.renderActivity(events),
      this.renderCollaboration(events)
    );
  };

  Participants.prototype.renderStartCase = function renderStartCase(events) {
    var event = (0, _lodash.find)(events, function (event) {
      return event.type === 'caseCreate';
    });

    if (!event) {
      return;
    }

    return _react2.default.createElement(
      _tiles.TextTile,
      {
        iconSet: 'fontAwesome',
        icon: 'folder-open-o',
        style: this.props.style('entry'),
        small: true
      },
      (0, _signavioI18n2.default)('Started this case')
    );
  };

  Participants.prototype.renderInitialTaskCreated = function renderInitialTaskCreated(events) {
    var event = (0, _lodash.find)(events, function (event) {
      return event.type === 'taskCreate';
    });

    if (!event) {
      return;
    }

    return _react2.default.createElement(
      _tiles.TextTile,
      {
        iconSet: 'fontAwesome',
        icon: 'plus',
        style: this.props.style('entry'),
        small: true
      },
      (0, _signavioI18n2.default)('Created __task__', { task: event.name })
    );
  };

  Participants.prototype.reduceEvents = function reduceEvents(events) {
    for (var _len = arguments.length, types = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      types[_key - 1] = arguments[_key];
    }

    return events.reduce(function (result, event) {
      if (types.indexOf(event.type) === -1) {
        return result;
      }

      return (0, _extends4.default)({}, result, (0, _defineProperty3.default)({}, event.type, [].concat((0, _toConsumableArray3.default)(result[event.type] || []), [event])));
    }, {});
  };

  Participants.prototype.renderActivity = function renderActivity(events) {
    var _reduceEvents = this.reduceEvents(events, 'assign', 'complete', 'taskCreate'),
        _reduceEvents$complet = _reduceEvents.complete,
        complete = _reduceEvents$complet === undefined ? [] : _reduceEvents$complet,
        _reduceEvents$assign = _reduceEvents.assign,
        assign = _reduceEvents$assign === undefined ? [] : _reduceEvents$assign,
        _reduceEvents$taskCre = _reduceEvents.taskCreate,
        taskCreate = _reduceEvents$taskCre === undefined ? [] : _reduceEvents$taskCre;

    if (complete.length === 0 && assign.length === 0) {
      return;
    }

    return _react2.default.createElement(
      _components.List,
      null,
      _react2.default.createElement(_components.Divider, { title: (0, _signavioI18n2.default)('Activity') }),
      this.renderTaskCreate(taskCreate),
      this.renderCompleteTasks(complete),
      this.renderAssignments(assign)
    );
  };

  Participants.prototype.renderTaskCreate = function renderTaskCreate(events) {
    var _this3 = this;

    return events.map(function (event) {
      return _react2.default.createElement(
        _tiles.TextTile,
        {
          key: event.id,
          style: _this3.props.style('entry'),
          icon: 'plus',
          small: true
        },
        (0, _signavioI18n2.default)('Created __task__', { task: event.name })
      );
    });
  };

  Participants.prototype.renderCompleteTasks = function renderCompleteTasks(events) {
    var _this4 = this;

    return events.map(function (event) {
      return _react2.default.createElement(
        _tiles.TextTile,
        {
          key: event.id,
          small: true,
          icon: 'check',
          style: _this4.props.style('entry')
        },
        (0, _signavioI18n2.default)('Completed __task__', { task: event.name || (0, _signavioI18n2.default)('unnamed') })
      );
    });
  };

  Participants.prototype.renderAssignments = function renderAssignments(events) {
    var _this5 = this;

    return events.map(function (event) {
      var icon = 'icon-square'; // TODO: use without task.get("completed")

      return _react2.default.createElement(
        _tiles.TextTile,
        {
          key: event.id,
          style: _this5.props.style('entry'),
          icon: icon,
          small: true
        },
        (0, _signavioI18n2.default)('Assignee for __task__', {
          task: event.name || (0, _signavioI18n2.default)('unnamed')
        })
      );
    });
  };

  Participants.prototype.renderCollaboration = function renderCollaboration(events) {
    var _reduceEvents2 = this.reduceEvents(events, 'commentAdd', 'fileAdd'),
        _reduceEvents2$commen = _reduceEvents2.commentAdd,
        commentAdd = _reduceEvents2$commen === undefined ? [] : _reduceEvents2$commen,
        _reduceEvents2$fileAd = _reduceEvents2.fileAdd,
        fileAdd = _reduceEvents2$fileAd === undefined ? [] : _reduceEvents2$fileAd;

    if (commentAdd.length === 0 && fileAdd.length === 0) {
      return;
    }

    return _react2.default.createElement(
      _components.List,
      null,
      _react2.default.createElement(_components.Divider, { title: (0, _signavioI18n2.default)('Collaboration') }),
      this.renderComments(commentAdd),
      this.renderDocuments(fileAdd)
    );
  };

  Participants.prototype.renderComments = function renderComments(events) {
    if (events.length === 0) {
      return;
    }

    return _react2.default.createElement(
      _tiles.TextTile,
      { icon: 'comment', style: this.props.style('entry'), small: true },
      (0, _signavioI18n2.default)('Left a comment', 'Left __count__ comments', {
        count: events.length
      })
    );
  };

  Participants.prototype.renderDocuments = function renderDocuments(events) {
    if (events.length === 0) {
      return;
    }

    return _react2.default.createElement(
      _tiles.TextTile,
      { icon: 'file', style: this.props.style('entry'), small: true },
      (0, _signavioI18n2.default)('Added a file', 'Added __count__ files', {
        count: events.length
      })
    );
  };

  return Participants;
}(_react.Component);

exports.default = (0, _styles.defaultStyle)({
  container: {
    display: 'inline-block'
  },
  entry: {
    backgroundColor: null,

    icon: {
      backgroundColor: null
    }
  },
  user: {
    backgroundColor: null,
    cursor: 'default'
  }
})(Participants);


// WEBPACK FOOTER //
// ./packages/cases/lib/components/Participants.js