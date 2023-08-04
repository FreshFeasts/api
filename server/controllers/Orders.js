const { Orders } = require('../models');
const { checkInput } = require('../helperFunctions');
const { updateDeliverySchema } = require('../db/Schemas');
module.exports = {
  getOrdersByUserId: async (req, res) => {
    const authUserId = req.user.userId;
    const { userId } = req.params;
    let { count, page } = req.query;
    count = checkInput(count, 5);
    page = checkInput(page, 1);

    if (authUserId === userId) {
      try {
        const data = await Orders.getOrdersByUserId(userId, count, page);
        res.send(data);
      } catch (err) {
        res.status(400).send({
          msg: `There was an error finding orders for userId: ${userId}`,
        });
      }
    } else {
      f;
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
  updateDeliveryDate: async (req, res) => {
    const { orderId, userId, orderDate, deliveryDate } = req.body;
    const authUserId = req.user.userId;
    if (authUserId === userId) {
      try {
        const status = await Orders.updateDeliveryDate(
          orderId,
          orderDate,
          deliveryDate
        );
        res.status(status.code).send(status.data);
      } catch (error) {}
    } else {
      res.status(403).send({ msg: 'Not authorized to access this content' });
    }
  },
};
