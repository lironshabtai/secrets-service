const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config')

// define the Secret model schema
const SecretSchema = new mongoose.Schema({
  key: String,
  value: String,
})

SecretSchema.methods.encrypt = function encrypt (key, value, userToken) {
  this.key = jwt.sign({ key }, jwtSecret)
  this.value = jwt.sign({ key, value, userToken }, jwtSecret + key + userToken)

  return this.save()
}

SecretSchema.statics.findAndDecrypt = function decrypt (key, userToken) {
  return this.findOne({ key: jwt.sign({ key }, jwtSecret) })
    .lean()
    .then(secret => verify(secret.value, jwtSecret + key + userToken))
    .then(decoded => {
      if (!(decoded.key === key && decoded.userToken === userToken)) {
        return Promise.reject()
      }
      return {
        key,
        value: decoded.value
      }
    })
}

function verify (key, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(key, secret, (err, decoded) => {
      if (err || !decoded) {
        reject()
      } else {
        resolve(decoded)
      }
    })
  })
}

module.exports = mongoose.model('Secret', SecretSchema)
