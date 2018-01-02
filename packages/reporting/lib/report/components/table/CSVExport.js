'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFormats = function getFormats() {
  return [{
    id: 'standard',
    value: (0, _signavioI18n2.default)('Standard')
  }, {
    id: 'excel',
    value: (0, _signavioI18n2.default)('Excel')
  }, {
    id: 'excel_north_europe',
    value: (0, _signavioI18n2.default)('Excel (North Europe)')
  }, {
    id: 'tab',
    value: (0, _signavioI18n2.default)('Tabs')
  }];
};

function CSVExport(_ref) {
  var format = _ref.format,
      onClose = _ref.onClose,
      onConfirm = _ref.onConfirm,
      onFormatChange = _ref.onFormatChange;

  return _react2.default.createElement(
    _components.Confirm,
    {
      title: (0, _signavioI18n2.default)('Download full result set as CSV'),
      onCancel: onClose,
      onConfirm: onConfirm
    },
    _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'div',
        { className: 'col-xs-8' },
        _react2.default.createElement(
          'h5',
          { className: 'container-header' },
          (0, _signavioI18n2.default)('Format'),
          _react2.default.createElement(
            _components.ContextHelp,
            null,
            (0, _signavioI18n2.default)('If you encounter problems when you import the standard comma separated list of values into another application, you can choose a more specific format here.')
          )
        ),
        _react2.default.createElement(_components.Select, {
          options: getFormats(),
          value: format,
          onChange: onFormatChange
        })
      )
    )
  );
}

exports.default = (0, _recompose.compose)((0, _recompose.withState)('format', 'setFormat', 'standard'), (0, _recompose.withHandlers)({
  onConfirm: function (_onConfirm) {
    function onConfirm(_x) {
      return _onConfirm.apply(this, arguments);
    }

    onConfirm.toString = function () {
      return _onConfirm.toString();
    };

    return onConfirm;
  }(function (_ref2) {
    var format = _ref2.format,
        onConfirm = _ref2.onConfirm;
    return function () {
      onConfirm(format);
    };
  }),
  onFormatChange: function onFormatChange(_ref3) {
    var setFormat = _ref3.setFormat;
    return function (format) {
      setFormat(format);
    };
  }
}))(CSVExport);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/table/CSVExport.js