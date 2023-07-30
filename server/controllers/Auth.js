const { Auth } = require('../models');

module.exports = {
  registerUser: async (req, res) => {
    const { user, info, paymentInfo } = req.body;
    try {
      const data = await Auth.registerUser(user, info, paymentInfo);
      res.status(201).send(data);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  },
};
