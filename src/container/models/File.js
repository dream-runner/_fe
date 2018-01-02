import UniqueModel from 'uniquemodel'
import _ from 'underscore'

import Effektif from 'singleton/Effektif'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels

import { FileUtils } from 'commons-utils'

module.exports = UniqueModel(
  BaseModel.extend({
    urlRoot: function() {
      return Effektif.makeUrl('files')
    },

    getReadableSize: function() {
      return FileUtil.getReadableSize(this.get('size'))
    },

    // alias
    size: function() {
      return this.getReadableSize()
    },

    isImage: function() {
      return FileUtil.isImage(this.get('contentType'))
    },

    isText: function() {
      return FileUtil.isText(this.get('contentType'))
    },

    isVideo: function() {
      return FileUtil.isVideo(this.get('contentType'))
    },

    isAudio: function() {
      return FileUtil.isAudio(this.get('contentType'))
    },

    isPdf: function() {
      return FileUtil.isPDF(this.get('contentType'))
    },

    isArchive: function() {
      return FileUtil.isArchive(this.get('name'))
    },

    isWord: function() {
      return FileUtil.isWord(this.get('contentType'))
    },

    isExcel: function() {
      return FileUtil.isExcel(this.get('contentType'))
    },

    isPowerpoint: function() {
      return FileUtil.isPowerPoint(this.get('contentType'))
    },

    isXml: function() {
      return FileUtil.isXML(this.get('name'), this.get('contentType'))
    },

    getIcon: function() {
      return FileUtil.getIcon(this.get('name'), this.get('contentType'))

      // if(this.get("type") === "url") {
      //     return 'fa fa-globe';
      // }
    },

    src: function() {
      if (this.get('type') === 'url') {
        return this.get('url')
      }

      //if(this.get("taskId")){
      //    return urlPrefix + "/tasks/" + this.get("taskId") + "/documents/" + this.id + "/stream?token="+ Const.login.id;
      //}

      return this.url()
    },
  }),
  'File'
)



// WEBPACK FOOTER //
// ./src/container/models/File.js