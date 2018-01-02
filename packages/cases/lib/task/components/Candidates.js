'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _effektifApi = require('@signavio/effektif-api');

var _workflowOrganizations = require('@signavio/workflow-organizations');

var _utils = require('../utils');

var _Candidate = require('./Candidate');

var _Candidate2 = _interopRequireDefault(_Candidate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Candidates(props) {
  var circularAvatars = props.circularAvatars,
      users = props.users,
      _props$totalCount = props.totalCount,
      totalCount = _props$totalCount === undefined ? 0 : _props$totalCount,
      disabled = props.disabled,
      showDelay = props.showDelay,
      _props$small = props.small,
      small = _props$small === undefined ? false : _props$small,
      style = props.style,
      rest = (0, _objectWithoutProperties3.default)(props, ['circularAvatars', 'users', 'totalCount', 'disabled', 'showDelay', 'small', 'style']);

  var visibleCount = getVisibleCandidatesCount(users);
  var hasMoreUsers = users.length < totalCount;

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ key: 'base' }, (0, _lodash.omit)(rest, 'condensed'), style),
    users.slice(0, visibleCount).map(function (candidate) {
      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, style('candidateWrapper'), { key: candidate.id }),
        _react2.default.createElement(_Candidate2.default, (0, _extends3.default)({}, style('candidate'), {
          small: small,
          candidate: candidate,
          circular: circularAvatars,
          disabled: disabled,
          showDelay: showDelay
        }))
      );
    }),
    users.length > 3 && _react2.default.createElement(
      'div',
      style('candidateWrapper'),
      _react2.default.createElement(
        _components.Popover,
        {
          placement: 'right',
          small: small,
          popover: _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              _components.ColumnList,
              { chunkLength: 5 },
              users.map(function (candidate) {
                return _react2.default.createElement(
                  _workflowOrganizations.UserTile,
                  {
                    style: { backgroundColor: null },
                    key: candidate.id,
                    user: candidate,
                    small: small,
                    circular: circularAvatars
                  },
                  _effektifApi.userUtils.name(candidate)
                );
              })
            ),
            hasMoreUsers && _react2.default.createElement(
              'span',
              style('hint'),
              (0, _signavioI18n2.default)('Showing __count__ of __size__ candidates', {
                count: users.length,
                size: totalCount
              })
            )
          ),
          showDelay: showDelay
        },
        _react2.default.createElement(_components.Icon, (0, _extends3.default)({ icon: 'plus', small: small }, style('plus')))
      )
    )
  );
}


var getVisibleCandidatesCount = function getVisibleCandidatesCount(users) {
  if (users.length <= 3) {
    return users.length;
  }

  return 2;
};

var styled = (0, _styles.defaultStyle)(function (_ref) {
  var color = _ref.color,
      font = _ref.font,
      lineHeight = _ref.lineHeight,
      padding = _ref.padding;

  var size = _styles.utils.calculateIconSize({ font: font, lineHeight: lineHeight, padding: padding });

  return {
    position: 'relative',

    overflow: 'hidden',

    plus: {
      backgroundColor: color.mono.light,

      color: _styles.utils.color(color.mono.light)
    },

    hint: {
      display: 'inline-block',
      width: '100%',
      textAlign: 'center',
      fontSize: '0.9em',
      color: 'rgb(126, 126, 126)',
      marginTop: '1rem'
    },

    candidateWrapper: (0, _extends3.default)({
      float: 'left'

    }, _styles.utils.borderLeft('1px', 'solid', 'white')),

    '&one-item': {
      candidateWrapper: {
        borderLeft: null
      }
    },

    '&condensed': {
      width: size,
      height: size,

      '&two-items': {
        candidateWrapper: {
          overflowX: 'hidden',
          width: size / 2
        },

        candidate: {
          marginLeft: -(_styles.variables.lineHeight.block / 4)
        }
      },

      '&more-items': {
        candidateWrapper: {
          overflowX: 'hidden',
          width: size / 3
        },

        candidate: {
          marginLeft: -(_styles.variables.lineHeight.block / 3)
        }
      },

      '&spread-exceeded': {
        plus: {
          width: size / 3
        }
      }
    },

    '&circularAvatars': {
      plus: {
        borderRadius: '50%'
      }
    }
  };
}, function (_ref2) {
  var users = _ref2.users,
      condensed = _ref2.condensed,
      circularAvatars = _ref2.circularAvatars;
  return {
    '&condensed': condensed,
    '&spread-exceeded': users.length > 3,
    '&one-item': users.length === 1,
    '&two-items': users.length === 2,
    '&more-items': users.length > 2,
    '&circularAvatars': circularAvatars
  };
});

exports.default = styled(Candidates);


// WEBPACK FOOTER //
// ./packages/cases/lib/task/components/Candidates.js