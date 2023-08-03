const express = require('express');

const apiRouter = express.Router();
const controllers = require('../controllers');

// Users
apiRouter.get('/users/:email', controllers.Users.getUserByEmail);
apiRouter.put('/users/cart', controllers.Users.updateCart);
apiRouter.post('/users/cart', controllers.Users.addCartToOrders);
apiRouter.put('/users/update', controllers.Users.updateUser);

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
apiRouter.post('/meals/add-review', controllers.Meals.addUserReview);
apiRouter.post('/meals/add-rating', controllers.Meals.addUserRating);

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
