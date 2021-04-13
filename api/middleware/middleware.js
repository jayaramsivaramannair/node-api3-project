function logger(req, res, next) {
  // DO YOUR MAGIC
  const time = new Date().toISOString()
  console.log(`${req.method} request is made to ${req.url} at ${time}`)
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
