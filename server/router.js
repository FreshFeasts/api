const express = require('express');

const router = express.Router();
const controllers = require('./controllers');

// user
router.get('/users/:email', controllers.Users.getUserByEmail);

module.exports = router;
