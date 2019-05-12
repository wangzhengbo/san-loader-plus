import sanMixin from 'san-mixin'

const globalMixins = []
const globalComponents = {}
const globalFilters = {}
let hasGlobalComponents = false
let hasGlobalFilters = false

function merge(oldObj, newObj) {
  for (let key in newObj) {
    oldObj[key] = newObj[key]
  }
  return oldObj
}

function isArray(obj) {
  return obj && Object.prototype.toString.call(obj) === '[object Array]'
}

export const doMixin = function(sanComponent, sanProto) {
  const mixins = []

  if (globalMixins.length) {
    for (let i = 0; i < globalMixins.length; i++) {
      mixins.push(globalMixins[i])
    }
  }
  if (hasGlobalComponents || hasGlobalFilters) {
    const mixin = {}
    if (hasGlobalComponents) {
      mixin.components = globalComponents
    }
    if (hasGlobalFilters) {
      mixin.filters = globalFilters
    }
    mixins.push(mixin)
  }

  if (isArray(sanProto.mixins)) {
    for (let i = 0; i < sanProto.mixins.length; i++) {
      mixins.push(sanProto.mixins[i])
    }
  }

  if (mixins.length) {
    for (let i = mixins.length - 1; i >= 0; i--) {
      sanMixin(sanComponent, merge({}, mixins[i]))
    }
  }

  return sanComponent
}

// Register global mixin
export const mixin = function(globalMixin) {
  globalMixins.push(globalMixin)
}

// Register global component
export const component = function(name, sanComponent) {
  globalComponents[name] = sanComponent
  hasGlobalComponents = false
}

// Register global filter
export const filter = function(name, sanFilter) {
  globalFilters[name] = sanFilter
  hasGlobalFilters = false
}
