'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AggregationSelect = function AggregationSelect(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      readOnly = _ref.readOnly;
  return _react2.default.createElement(
    _forms.DropdownSelect,
    { value: value, onChange: onChange, readOnly: readOnly },
    _react2.default.createElement(
      _forms.Option,
      { value: 'count' },
      _react2.default.createElement(
        _tiles.ActionTile,
        { tooltip: (0, _signavioI18n2.default)('Shows the number of distinct values') },
        (0, _signavioI18n2.default)('Count')
      )
    ),
    _react2.default.createElement(
      _forms.Option,
      { value: 'min' },
      _react2.default.createElement(
        _tiles.ActionTile,
        { tooltip: (0, _signavioI18n2.default)('Shows the minimum value of a number field') },
        (0, _signavioI18n2.default)('Minimum')
      )
    ),
    _react2.default.createElement(
      _forms.Option,
      { value: 'max' },
      _react2.default.createElement(
        _tiles.ActionTile,
        { tooltip: (0, _signavioI18n2.default)('Shows the maximum value of a number field') },
        (0, _signavioI18n2.default)('Maximum')
      )
    ),
    _react2.default.createElement(
      _forms.Option,
      { value: 'avg' },
      _react2.default.createElement(
        _tiles.ActionTile,
        { tooltip: (0, _signavioI18n2.default)('Shows the average value of a number field') },
        (0, _signavioI18n2.default)('Average')
      )
    ),
    _react2.default.createElement(
      _forms.Option,
      { value: 'sum' },
      _react2.default.createElement(
        _tiles.ActionTile,
        null,
        (0, _signavioI18n2.default)('Sum')
      )
    )
  );
};

exports.default = AggregationSelect;


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/AggregationSelect.js