const users = require("../users/users-model")
const posts = require("../posts/posts-model")

function logger() {
  // DO YOUR MAGIC
  return (req, res, next) => {
    const time = new Date().toISOString()
    console.log(`${req.method} request is made to ${req.url} at ${time}`)
    next()
  }
}

function validateUserId() {
  // DO YOUR MAGIC
  return (req, res, next) => {
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
}

function validateUser() {
  // DO YOUR MAGIC
  return (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({
        message: "missing required name field",
      })
    }

    next()
  }
}

function validatePost() {
  // DO YOUR MAGIC
  return (req, res, next) => {
    if (!req.body.text) {
      return res.status(400).json({
        message: "missing required text field",
      })
    }

    next()
  }
}


// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
