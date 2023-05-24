const createError = require('http-errors')
const { classify } = require('inflection')

module.exports = () => {
  return async (req, res, next) => {
    const modelName = classify(req.params.resource)
    try {
      req.model = require(`../dbmodels/${modelName}`)
      next()
    } catch (err) {
      next(createError(404))
    }
  }
}