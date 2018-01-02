'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReadableSize = getReadableSize;
exports.isImage = isImage;
exports.isText = isText;
exports.isVideo = isVideo;
exports.isAudio = isAudio;
exports.isPDF = isPDF;
exports.isWord = isWord;
exports.isExcel = isExcel;
exports.isGoogleSpreadsheet = isGoogleSpreadsheet;
exports.isSpreadsheet = isSpreadsheet;
exports.isPowerPoint = isPowerPoint;
exports.isXML = isXML;
exports.isArchive = isArchive;
exports.isFolder = isFolder;
exports.getIcon = getIcon;

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getExtension = function getExtension(fileName) {
  if (!fileName) {
    return null;
  }

  var i = fileName.lastIndexOf('.');

  if (i === -1 || i + 1 === fileName.length) {
    return null;
  }

  return fileName.substring(i + 1);
};

function getReadableSize(size) {
  if (!size) {
    return '';
  }

  if (size < 1024 * 1024) {
    return Math.round(size / 1024) + ' kb';
  }

  return Math.round(size / (1024 * 1024)) + ' mb';
}

function isImage() {
  var contentType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return contentType.indexOf('image') === 0;
}

function isText() {
  var contentType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return contentType.indexOf('text') === 0;
}

function isVideo() {
  var contentType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return contentType.indexOf('video') === 0;
}

function isAudio() {
  var contentType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return contentType.indexOf('audio') === 0;
}

function isPDF() {
  var contentType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return contentType === 'application/pdf';
}

function isWord() {
  var contentType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return contentType.indexOf('application/msword') === 0 || contentType.indexOf('application/vnd.ms-word') === 0 || contentType.indexOf('application/vnd.openxmlformats-officedocument.wordprocessingml') === 0;
}

function isExcel() {
  var contentType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return contentType.indexOf('application/vnd.ms-excel') === 0 || contentType.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml') === 0;
}

function isGoogleSpreadsheet() {
  var contentType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return contentType.indexOf('application/vnd.google-apps.spreadsheet') === 0;
}

function isSpreadsheet() {
  var contentType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return isExcel(contentType) || isGoogleSpreadsheet(contentType);
}

function isPowerPoint() {
  var contentType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return contentType.indexOf('application/vnd.ms-powerpoint') === 0 || contentType.indexOf('application/vnd.openxmlformats-officedocument.presentationml') === 0;
}

function isXML(fileName) {
  var contentType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return !!contentType.match(/(text|application)\/(.*\+)?xml/) || (0, _includes2.default)(['xml', 'html', 'xhtml', 'wsdl'], getExtension(fileName));
}

function isArchive(fileName) {
  return (0, _includes2.default)(['zip', 'rar', 'gz', 'tgz', 'tar', 'ace', '7z', 'bz2'], getExtension(fileName));
}

function isFolder() {
  var contentType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return contentType.indexOf('application/vnd.google-apps.folder') === 0 || contentType.indexOf('application/vnd.box.folder') === 0;
}

function prefix(icon, addPrefix) {
  return addPrefix ? 'fa fa-' + icon : icon;
}

function getIcon(fileName, contentType) {
  var addPrefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (isImage(contentType)) {
    return prefix('file-image-o', addPrefix);
  }

  if (isVideo(contentType)) {
    return prefix('file-video-o', addPrefix);
  }

  if (isAudio(contentType)) {
    return prefix('file-audio-o', addPrefix);
  }

  if (isPDF(contentType)) {
    return prefix('file-pdf-o', addPrefix);
  }

  if (isWord(contentType)) {
    return prefix('file-word-o', addPrefix);
  }

  if (isSpreadsheet(contentType)) {
    return prefix('file-excel-o', addPrefix);
  }

  if (isPowerPoint(contentType)) {
    return prefix('file-powerpoint-o', addPrefix);
  }

  if (isXML(fileName, contentType)) {
    return prefix('file-code-o', addPrefix);
  }

  // text should be checked after XML as text/xml will also be positive for text
  if (isText(contentType)) {
    return prefix('file-text-o', addPrefix);
  }

  if (isFolder(contentType)) {
    return prefix('folder-o', addPrefix);
  }

  return prefix('file-o', addPrefix);
}


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/FileUtils.js