import _ from 'underscore'

import { Query } from 'commons-models'
import { expressionUtils } from '../../../packages/fields'

export default class BindableQuery extends Query {
  constructor(bindables = [], dataTypeDescriptors = [], variables = []) {
    super()

    this.bindables = bindables
    this.dataTypeDescriptors = dataTypeDescriptors
    this.variables = variables
  }

  getDescriptor() {
    return {
      id: 'bindable',
    }
  }

  getName(bindable) {
    if (bindable.getName) {
      return bindable.getName()
    }

    return expressionUtils.resolveName(
      this.dataTypeDescriptors,
      this.variables,
      bindable.expression
    )
  }

  fetch(query, options = {}) {
    var bindables = this.bindables
    var bindables = bindables.filter(bindable => {
      if (!query) {
        return true
      }

      // filter based on search query
      return this.getName(bindable).toLowerCase().indexOf(query) >= 0
    })

    bindables = this.sortBindables(bindables)

    return new Promise(resolve => {
      var pageBindables = bindables
      if (!_.isUndefined(options.offset) && options.pagesize) {
        pageBindables = _.slice(
          bindables,
          options.offset,
          options.offset + options.pagesize
        )
      }
      resolve(this.transformBindables(pageBindables))
    })
  }

  sortBindables(bindables) {
    return _.sortBy(bindables, bindable => {
      return this.getName(bindable).toLowerCase()
    })
  }

  transformBindables(bindables) {
    return _.map(bindables, bindable => {
      return {
        type: 'bindable',
        entity: bindable,
        value: this.getName(bindable),
      }
    })
  }
}



// WEBPACK FOOTER //
// ./src/processes/models/BindableQuery.js