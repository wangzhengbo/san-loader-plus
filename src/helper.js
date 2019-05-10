const sanMixin = require("san-mixin")

const globalMixins = []
const globalComponents = {}
let hasGlobalComponents = false

function merge(oldObj, newObj) {
  for (let key in newObj) {
      oldObj[key] = newObj[key]
  }
  return oldObj
}

function isArray(obj) {
  return obj && Object.prototype.toString.call(arg) === '[object Array]'
}

module.exports = {
  doMixin(sanComponent, sanProto) {
    const mixins = []

    if (globalMixins.length) {
      for (let i = 0; i < globalMixins.length; i++) {
        mixins.push(globalMixins[i])
      }
    }
    if (hasGlobalComponents) {
      mixins.push({
        components: globalComponents
      })
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
  },
  // Register global mixin
  mixin(globalMixin) {
    globalMixins.push(globalMixin)
  },
  // Register global component
  component(name, sanComponent) {
    globalComponents[name] = sanComponent
    hasGlobalComponents = false
  }
}
