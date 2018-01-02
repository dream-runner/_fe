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

var _components = require('../components');

var _styles = require('../styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ColumnList(_ref) {
  var children = _ref.children,
      chunkLength = _ref.chunkLength,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['children', 'chunkLength']);

  if (!children || !chunkLength) {
    return null;
  }

  var chunksOfChildren = (0, _lodash.chunk)(children, chunkLength);
  var columnStyles = rest.style('column');

  return _react2.default.createElement(
    _components.List,
    { direction: 'horizontal', style: rest.style },
    (0, _lodash.map)(chunksOfChildren, function (chunkChildren, idx) {
      return _react2.default.createElement(
        _components.List,
        (0, _extends3.default)({}, columnStyles, { key: idx }),
        chunkChildren
      );
    })
  );
}

var styled = (0, _styles.defaultStyle)({
  column: {}
});

exports.default = styled(ColumnList);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/ColumnList.js