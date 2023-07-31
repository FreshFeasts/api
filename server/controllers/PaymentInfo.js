const { PaymentInfo } = require('../models');

module.exports = {
  getCardsByUserId: async (req, res) => {
    const authUserId = req.user.userId;
    const { userId } = req.params;

    if (authUserId === userId) {
      try {
        const data = await PaymentInfo.getCardsByUserId(userId);
        res.send(data);
      } catch (err) {
        res.status(400).send({
          msg: `There was an error finding cards related to userId: ${userId}`,
        });
      }
    } else {
      res.status(403).send({ msg: 'Not authorized to access this content' });
    }
  },
};
