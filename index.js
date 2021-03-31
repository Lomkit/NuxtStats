import path from 'path'

export default function stats(moduleOptions) {
  const options = Object.assign({}, this.options.stats, moduleOptions)

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: path.join('stats.js'),
    options
  })
}
module.exports.meta = require('./package.json')
