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
};
