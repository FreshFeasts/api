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
        const data = await Users.getInitData(userId);
        res.send(data);
      } catch (err) {
        res.status(400).send(err);
      }
    } else {
      res.status(403).send({ msg: 'Not authorized to access this content' });
    }
  },
};
