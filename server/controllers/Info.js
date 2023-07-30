const { Info } = require('../models');

module.exports = {
  getInfoByUserId: async (req, res) => {
    const { userId } = req.params;
    try {
      const data = await Info.getInfoByUserId(userId);
      res.send(data);
    } catch (err) {
      res
        .status(400)
        .send({ msg: `There was an error finding info on userId: ${userId}` });
    }
  },
};
