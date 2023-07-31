const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { Auth } = require('../models');

const { registerSchema } = require('../db/Schemas');

module.exports = {
  registerUser: async (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { user, info, paymentInfo } = req.body;
    try {
      const data = await Auth.registerUser(user, info, paymentInfo);
      res.status(201).send(data);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    const response = await Auth.loginUser(email, password);
    console.log(response);
    res.status(response.status).send(response.json);
  },

  isAuth: async (req, res, next) => {
    const authHeader = req.get('Authorization');
    console.log(authHeader);
    if (!authHeader) {
      return res.status(401).json({ msg: 'Not authenticated' });
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res
        .status(500)
        .json({ message: err.message || 'Token could not be decoded' });
    }
    if (!decodedToken) {
      res.status(401).json({ msg: 'Unauthorized' });
    } else {
      next();
    }
  },
};
