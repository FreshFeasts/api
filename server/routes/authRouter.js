const express = require('express');

const authRouter = express.Router();
const controllers = require('../controllers');

// Auth
authRouter.post('/register', controllers.Auth.registerUser);
authRouter.post('/login', controllers.Auth.loginUser);

module.exports = authRouter;
