process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')
const Dotenv = require('dotenv-webpack');

exports = environment.toWebpackConfig()
exports.plugins.push(new Dotenv())
module.exports = exports

