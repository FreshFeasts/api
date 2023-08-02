const { Users } = require('../models');
const {
  updateUserSchema,
  updateCartSchema,
  addCartToOrdersSchema,
} = require('../db/Schemas');
const Joi = require('joi');

module.exports = {
  getUserByEmail: async (req, res) => {
    const authUserEmail = req.user.email;
    const { email } = req.params;

    if (authUserEmail === email) {
      try {
        const result = await Users.getUserByEmail(email);
        res.send(result);
      } catch (err) {
        res.status(400).send(err);
      }
    } else {
      res.status(403).send({ msg: 'Not authorized to access this content' });
    }
  },
  getInitData: async (req, res) => {
    const authUserId = req.user.userId;
    const { userId } = req.params;

    console.log(authUserId, userId);

    if (authUserId === userId) {
      try {
        const result = await Users.getInitData(userId);
        res.send(result);
      } catch (err) {
        res.status(400).send(err);
      }
    } else {
      res.status(403).send({ msg: 'Not authorized to access this content' });
    }
  },

  updateCart: async (req, res) => {
    const authUserId = req.user.userId;
    const { userId, meals, currentCart } = req.body;

    const { error } = updateCartSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .send({ msg: 'Invalid request data', error: error.details[0].message });
      return;
    }

    if (authUserId === userId) {
      try {
        const result = await Users.updateCart(userId, currentCart);
        res.status(result.code).send(result.data);
      } catch (err) {
        res.status(result.code).send(result.data);
      }
    } else {
      res.status(403).send({ msg: 'Not authorized to access this content' });
    }
  },

  addCartToOrders: async (req, res) => {
    const authUserId = req.user.userId;
    const { userId, currentCart } = req.body;

    const { error } = addCartToOrdersSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .send({ msg: 'Invalid request data', error: error.details[0].message });
      return;
    }

    if (authUserId === userId) {
      console.log('authorized');
      try {
        const result = await Users.addCartToOrders(userId, currentCart);
        res.status(result.code).send(result.data);
      } catch (err) {}
    } else {
      res.status(403).send({ msg: 'Not authorized to access this content' });
    }
  },

  updateUser: async (req, res) => {
    const authUserId = req.user.userId;
    const { userId, user, info } = req.body;

    console.log(authUserId, userId);

    const { error } = updateUserSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .send({ msg: 'Invalid request data', error: error.details[0].message });
      return;
    }

    if (authUserId === userId) {
      console.log('authorized');
      try {
        const result = await Users.updateUser(userId, user, info);
        res.status(result.code).send(result.data);
      } catch (err) {}
    } else {
      res.status(403).send({ msg: 'Not authorized to access this content' });
    }
  },
};
