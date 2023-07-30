const { Orders } = require('../models');
const { checkInput } = require('../helperFunctions');

module.exports = {
  getOrdersByUserId: async (req, res) => {
    const { userId } = req.params;
    let { count, page } = req.query;
    count = checkInput(count, 5);
    page = checkInput(page, 1);
    try {
      const data = await Orders.getOrdersByUserId(userId, count, page);
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
