'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _effektifApi = require('@signavio/effektif-api');

var _views = require('@signavio/effektif-commons/lib/views');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Show(_ref) {
  var fetchFile = _ref.fetchFile,
      small = _ref.small,
      transparent = _ref.transparent,
      showImage = _ref.showImage;

  if (fetchFile.pending) {
    return _react2.default.createElement(
      _tiles.TextTile,
      { small: small, transparent: transparent },
      _react2.default.createElement(
        _hints.Hint,
        { loading: true, inline: true },
        (0, _signavioI18n2.default)('Loading file...')
      )
    );
  }

  if (fetchFile.rejected) {
    return _react2.default.createElement(
      _tiles.TextTile,
      { small: small, transparent: transparent },
      _react2.default.createElement(
        _hints.Hint,
        { inline: true, danger: true },
        (0, _signavioI18n2.default)('Could not load file.')
      )
    );
  }

  var _fetchFile$value = fetchFile.value,
      id = _fetchFile$value.id,
      sizeInBytes = _fetchFile$value.sizeInBytes,
      name = _fetchFile$value.name,
      contentType = _fetchFile$value.contentType;


  return _react2.default.createElement(
    _tiles.Tile,
    { small: small, transparent: transparent },
    _react2.default.createElement(_views.File, {
      file: {
        src: (0, _effektifApi.getBaseUrl)() + '/files/' + id,
        size: sizeInBytes,
        name: name,
        contentType: contentType
      },
      showImage: showImage
    })
  );
}

var enhance = (0, _effektifApi.connect)(function (_ref2) {
  var value = _ref2.value;
  return {
    fetchFile: {
      type: _effektifApi.types.FILE,
      id: value
    }
  };
});

exports.default = enhance(Show);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/fileId/Show.js