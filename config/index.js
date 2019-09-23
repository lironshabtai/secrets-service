module.exports = {
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost/secrets-service',
  jwtSecret: process.env.SECRET || 'secrets-service-secret',
  internalSecret: process.env.internalSecret || 'no one can access this service without it',
}