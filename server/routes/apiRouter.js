const express = require('express');

const apiRouter = express.Router();
const controllers = require('../controllers');

// Users
apiRouter.get('/users/:email', controllers.Users.getUserByEmail);
apiRouter.put('/users/cart', controllers.Users.updateCartMeals);

// Info
apiRouter.get('/info/:userId', controllers.Info.getInfoByUserId);

// Orders
apiRouter.get('/orders/:orderId', controllers.Orders.getOrderById);
apiRouter.get('/orders/user/:userId', controllers.Orders.getOrdersByUserId);
apiRouter.put('/orders/update-delivery', controllers.Orders.updateDeliveryDate);

//CC
apiRouter.get('/cc/user/:userId', controllers.PaymentInfo.getCardsByUserId);

// Meals
apiRouter.get('/meals', controllers.Meals.getMeals);

// Login
apiRouter.get('/initdata/:userId', controllers.Users.getInitData);

apiRouter.all('*', async (req, res) => {
  try {
    res.status(404).send({
      timestamp: Date.now,
      msg: 'No route matches your request',
    });
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = apiRouter;
