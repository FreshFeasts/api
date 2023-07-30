const { Users } = require('../models');

module.exports = {
  getUserByEmail: async (req, res) => {
    const { email } = req.params;
    try {
      const data = await Users.getUserByEmail(email);
      res.send(data);
    } catch (err) {
      res.send(err);
    }
  },
};
