const { Users } = require('../models');

module.exports = {
  getUserByEmail: async (req, res) => {
    const authUserEmail = req.user.email;
    const { email } = req.params;

    if (authUserEmail === email) {
      try {
        const data = await Users.getUserByEmail(email);
        res.send(data);
      } catch (err) {
        res.send(err);
      }
    } else {
      res.status(403).send({ msg: 'Not authorized to access this content' });
    }
  },
};
