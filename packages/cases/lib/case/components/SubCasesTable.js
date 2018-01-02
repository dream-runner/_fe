'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _SubCaseRow = require('./SubCaseRow');

var _SubCaseRow2 = _interopRequireDefault(_SubCaseRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SubCasesTable(_ref) {
  var style = _ref.style,
      subcases = _ref.subcases;

  return _react2.default.createElement(
    'table',
    style,
    _react2.default.createElement(
      'thead',
      null,
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'th',
          style('firstColumn'),
          _react2.default.createElement(
            _tiles.TextTile,
            { transparent: true },
            (0, _signavioI18n2.default)('Sub-Case')
          )
        ),
        _react2.default.createElement(
          'th',
          style('columns'),
          _react2.default.createElement(
            _tiles.TextTile,
            { transparent: true },
            (0, _signavioI18n2.default)('Created')
          )
        ),
        _react2.default.createElement(
          'th',
          style('columns'),
          _react2.default.createElement(
            _tiles.TextTile,
            { transparent: true },
            (0, _signavioI18n2.default)('Due date')
          )
        ),
        _react2.default.createElement(
          'th',
          style('columns'),
          _react2.default.createElement(
            _tiles.TextTile,
            { transparent: true },
            (0, _signavioI18n2.default)('Completed')
          )
        )
      )
    ),
    _react2.default.createElement(
      'tbody',
      null,
      subcases.map(function (subcase) {
        return _react2.default.createElement(_SubCaseRow2.default, { key: subcase.calledCaseId, subcase: subcase });
      })
    )
  );
}


var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color;
  return {
    width: '100%',

    date: (0, _extends3.default)({}, _styles.utils.borderLeft(1, 'solid', 'white')),
    subcase: (0, _extends3.default)({}, _styles.utils.borderBottom(1, 'solid', 'white')),
    firstColumn: (0, _extends3.default)({
      width: '55%'
    }, _styles.utils.borderLeft(1, 'solid', color.mono.light), _styles.utils.borderTop(1, 'solid', color.mono.light), _styles.utils.borderRight(1, 'solid', color.mono.light), _styles.utils.borderBottom(2, 'solid', color.mono.light), _styles.utils.media.xs({
      width: '100%'
    })),
    columns: (0, _extends3.default)({
      width: '15%'
    }, _styles.utils.borderLeft(1, 'solid', color.mono.light), _styles.utils.borderTop(1, 'solid', color.mono.light), _styles.utils.borderRight(1, 'solid', color.mono.light), _styles.utils.borderBottom(2, 'solid', color.mono.light), _styles.utils.media.xs({
      display: 'none'
    }))
  };
});

exports.default = styled(SubCasesTable);


// WEBPACK FOOTER //
// ./packages/cases/lib/case/components/SubCasesTable.js