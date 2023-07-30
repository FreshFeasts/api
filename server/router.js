const express = require('express');

const router = express.Router();
const controllers = require('./controllers');

// Users
router.get('/users/:email', controllers.Users.getUserByEmail);

// Info
router.get('/info/:userId', controllers.Info.getInfoByUserId);

// Orders
router.get('/orders/:orderId', controllers.Orders.getOrderById);
router.get('/orders/user/:userId', controllers.Orders.getOrdersByUserId);

module.exports = router;
