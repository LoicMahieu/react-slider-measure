
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-slider-measure.cjs.production.min.js')
} else {
  module.exports = require('./react-slider-measure.cjs.development.js')
}
