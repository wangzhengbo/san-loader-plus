const sanLoader = require("san-loader")

module.exports = function(content) {
  const output = sanLoader.call(this, content)
  return output.replace('var __san_exports__ = san.defineComponent(__san_proto__)',
    `var __san_exports__ = require('san-loader-plus/lib/helper').doMixin(san.defineComponent(__san_proto__), __san_proto__)`)
}
