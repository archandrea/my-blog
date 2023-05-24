const jwt = require('jsonwebtoken')
const { getPublicKey, getPrivateKey } = require('./key-handler.js')

module.exports = { getToken }

async function getToken(user) {
  let { _id, username, password } = user
  return token = jwt.sign(
    {
      user_id: _id,
      user_name: username,
      exp: parseInt(Date.now() / 1000 + 3600 * 24 * 1)
    },
    await getPrivateKey(),
    {
      algorithm: 'RS256',
      allowInsecureKeySizes: true
    }
  )
}
