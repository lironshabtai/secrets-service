function routes (app) {
  const internalCheck = require('../middleware/internal-call-check')

  app.use(internalCheck)

  app
    .post('/api/secrets/get', require('./get'))
    .post('/api/secrets/set', require('./set'))
}

module.exports = routes
