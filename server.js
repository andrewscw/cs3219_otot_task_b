const sls = require('serverless-http')
const app = require('./lib/serverless-app')

module.exports.run = sls(app)