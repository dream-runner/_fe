'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _effektifFields = require('@signavio/effektif-fields');

var _effektifFields2 = _interopRequireDefault(_effektifFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SharingInfo(_ref) {
  var _ref$viewers = _ref.viewers,
      viewers = _ref$viewers === undefined ? [] : _ref$viewers,
      onShare = _ref.onShare,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['viewers', 'onShare']);

  if (viewers.length === 0) {
    return _react2.default.createElement(
      _tiles.TextTile,
      rest,
      (0, _signavioI18n2.default)('Only you can see this report.'),
      _react2.default.createElement(
        _buttons.LinkButton,
        { onClick: onShare, style: rest.style('shareButton') },
        (0, _signavioI18n2.default)('Share with others')
      )
    );
  }

  return _react2.default.createElement(
    _components.Popover,
    {
      small: true,
      placement: 'right',
      popover: _react2.default.createElement(
        _components.List,
        null,
        viewers.map(function (_ref2) {
          var type = _ref2.type,
              id = _ref2.id;
          return _react2.default.createElement(_effektifFields2.default, {
            transparent: true,
            readOnly: true,
            small: true,
            type: { name: type + 'Id' },
            value: id,
            key: id
          });
        })
      )
    },
    _react2.default.createElement(
      _tiles.TextTile,
      rest,
      _react2.default.createElement(
        _buttons.LinkButton,
        { onClick: onShare, style: rest.style('shareButton') },
        getShareMessage(viewers)
      )
    )
  );
}

var getShareMessage = function getShareMessage(viewers) {
  var _groupBy = (0, _lodash.groupBy)(viewers, function (_ref3) {
    var type = _ref3.type;
    return type;
  }),
      organization = _groupBy.organization,
      group = _groupBy.group,
      user = _groupBy.user;

  if (organization) {
    return (0, _signavioI18n2.default)('Shared with the whole organization');
  }

  var userMessage = void 0;

  if (user) {
    userMessage = (0, _signavioI18n2.default)('one colleague', '__count__ colleagues', {
      count: user.length
    });
  }

  var groupMessage = void 0;

  if (group) {
    groupMessage = (0, _signavioI18n2.default)('one group', '__count__ groups', {
      count: group.length
    });
  }

  if (group && user) {
    return (0, _signavioI18n2.default)('Shared with __user__ and __group__', {
      user: userMessage,
      group: groupMessage
    });
  }

  return (0, _signavioI18n2.default)('Shared with __type__', {
    type: user ? userMessage : groupMessage
  });
};

var styled = (0, _styles.defaultStyle)(function (_ref4) {
  var font = _ref4.font,
      padding = _ref4.padding;
  return {
    fontSize: font.size.form,

    shareButton: {
      paddingLeft: padding.xsmall
    }
  };
});

exports.default = styled(SharingInfo);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/SharingInfo.js