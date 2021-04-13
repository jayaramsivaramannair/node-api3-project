const express = require('express');
const { logger } = require("./middleware/middleware")

const server = express();
const usersRouter = require("./users/users-router")

// remember express by default cannot parse JSON in request bodies
server.use(express.json())

// global middlewares and the user's router need to be connected here
server.use(logger)

server.get('/home', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(usersRouter)

//Error handling middleware should be declared last
server.use((err, req, res, next) => {
  console.log(err)

  res.status(500).json({
    message: "Something went wrong with the request",
  })
})

module.exports = server;
