const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const users = require("./users-model");
const posts = require("../posts/posts-model");
// The middleware functions also need to be required
const { logger, validatePost, validateUser, validateUserId } = require("../middleware/middleware");

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  users.get()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      next(error)
    })
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

//The Middleware to validate request body should come before the Middleware to verify user id as it is a less expensive operation
// Less Expensive Operation i.e. No Database Lookup
router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router
