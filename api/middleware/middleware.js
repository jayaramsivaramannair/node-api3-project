const users = require("../users/users-model")
const posts = require("../posts/posts-model")

function logger(req, res, next) {
  // DO YOUR MAGIC
  const time = new Date().toISOString()
  console.log(`${req.method} request is made to ${req.url} at ${time}`)
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  users.getById(req.params.id)
    .then((user) => {
      if (user) {
        req.user = user
        next()
      } else {
        res.status(404).json({
          message: "user not found",
        })
      }
    })
    .catch((error) => {
      next(error)
    })
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
