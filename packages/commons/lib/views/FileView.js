'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tiles = require('../components/tiles');

var _higherOrder = require('../components/higher-order');

var _propTypes3 = require('../propTypes');

var _utils = require('../utils');

var _styles = require('../styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getSrc = function getSrc(_ref, token) {
  var src = _ref.src;
  return src + '/stream?token=' + token;
};

function File(_ref2) {
  var file = _ref2.file,
      showImage = _ref2.showImage,
      token = _ref2.token,
      rest = (0, _objectWithoutProperties3.default)(_ref2, ['file', 'showImage', 'token']);
  var name = file.name,
      contentType = file.contentType,
      size = file.size;


  if (showImage && _utils.FileUtils.isImage(contentType)) {
    return _react2.default.createElement(
      'a',
      (0, _extends3.default)({}, rest.style, { href: getSrc(file, token), rel: 'external' }),
      _react2.default.createElement('img', (0, _extends3.default)({}, rest.style('image'), {
        src: getSrc(file, token),
        alt: name,
        title: name
      }))
    );
  }

  return _react2.default.createElement(
    _tiles.TextTile,
    {
      style: rest.style,
      iconSet: 'fontAwesome',
      icon: _utils.FileUtils.getIcon(name, contentType, false),
      subtitle: _utils.FileUtils.getReadableSize(size)
    },
    _react2.default.createElement(
      'a',
      { href: getSrc(file, token), rel: 'external' },
      name
    )
  );
}

File.propTypes = {
  file: _propTypes3.File.isRequired,
  token: _propTypes2.default.string.isRequired,
  showImage: _propTypes2.default.bool
};

var styled = (0, _styles.defaultStyle)(function (theme) {
  return {
    backgroundColor: null,

    icon: {
      display: 'block',

      marginLeft: theme.padding.xsmall,
      marginRight: theme.padding.xsmall,

      opacity: 0.5,

      backgroundColor: null,

      width: 21 // TODO: get rid of magic number
    },

    main: {
      paddingLeft: null
    },

    image: {
      display: 'block',

      maxWidth: '100%'
    }
  };
});

exports.default = styled((0, _higherOrder.getToken)(File));


// WEBPACK FOOTER //
// ./packages/commons/lib/views/FileView.js