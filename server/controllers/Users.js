const { Users } = require('../models');

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

  updateCartMeals: async (req, res) => {
    const authUserId = req.user.userId;
    const { userId, meals, cart } = req.body;

    console.log(authUserId, userId);

    if (authUserId === userId) {
      try {
        const result = await Users.updateCartMeals(userId, meals, cart);
        res.status(result.code).send(result.data);
      } catch (err) {}
    } else {
      res.status(403).send({ msg: 'Not authorized to access this content' });
    }
  },

  // orderCart: async(req, res) => {
  //   const authUserId =
  // }
};
