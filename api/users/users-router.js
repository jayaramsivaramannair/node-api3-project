const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const users = require("./users-model");
const posts = require("../posts/posts-model");

// The middleware functions also need to be required
const { validatePost, validateUser, validateUserId } = require("../middleware/middleware");

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  users.get()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      next(error)
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  res.json(req.user)
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/', validateUser(), (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  users.insert(req.body)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((error) => {
      next(error)
    })
});

router.put('/:id', validateUser(), validateUserId(), (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  users.update(req.params.id, req.body)
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((error) => {
      next(error)
    })

});

router.delete('/:id', validateUserId(), (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  users.remove(req.params.id)
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((error) => {
      next(error)
    })
});


router.get('/:id/posts', validateUserId(), (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      next(error)
    })
});

//The Middleware to validate request body should come before the Middleware to verify user id as it is a less expensive operation
// Less Expensive Operation i.e. No Database Lookup
router.post('/:id/posts', validatePost(), validateUserId(), (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  posts.insert({ ...req.body, user_id: req.params.id })
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((error) => {
      next(error)
    })
});

// do not forget to export the router
module.exports = router
