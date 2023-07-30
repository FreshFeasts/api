const { Orders } = require('../models');

module.exports = {
  getOrdersByUserId: async (req, res) => {
    const { userId } = req.params;
    try {
      const data = await Orders.getOrdersByUserId(userId);
      res.send(data);
    } catch (err) {
      res.status(400).send({
        msg: `There was an error finding orders for userId: ${userId}`,
      });
    }
  },
  getOrderById: async (req, res) => {
    const { orderId } = req.params;
    try {
      const data = await Orders.getOrderById(orderId);
      res.send(data);
    } catch (err) {
      res.status(400).send({
        msg: `There was an error finding an order for orderId: ${orderId}`,
      });
    }
  },
};
