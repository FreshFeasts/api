const { ObjectId } = require('mongodb');

const { connectDb } = require('../db/index');
const Info = require('./Info');

let usersCollection;
let ordersCollection;

const getCollection = async () => {
  if (usersCollection) {
    return;
  }
  const db = await connectDb();
  usersCollection = db.collection('users');
  ordersCollection = db.collection('orders');
};

getCollection();

module.exports = {
  getUserByEmail: async (email) => {
    const data = await usersCollection.findOne({ email });
    return data;
  },

  getInitData: async (userId) => {
    const query = new ObjectId(userId);
    console.log(query);
    try {
      const userData = await usersCollection.findOne({
        _id: query,
      });
      const infoData = await Info.getInfoByUserId(userId);
      return { user: userData, info: infoData };
    } catch (err) {
      throw err;
    }
  },
  updateCartMeals: async (userId, currentCart) => {
    const query = new ObjectId(userId);

    try {
      await usersCollection.findOneAndUpdate(
        { _id: query },
        { $set: { currentCart: currentCart } }
      );

      return { code: 204, data: `Successfully updated cart` };
    } catch (err) {
      return { code: 400, data: err };
    }
  },

  addCartToOrders: async (userId, currentCart) => {
    const query = new ObjectId(userId);
    const initCart = {
      meals: [],
      deliveryDate: null,
    };
    const convDeliveryDate = new Date(currentCart.deliveryDate);
    const convOrderDate = new Date(currentCart.orderDate);
    const completedOrder = {
      userId: query,
      meals: currentCart.meals,
      orderDate: convOrderDate,
      deliveryDate: convDeliveryDate,
    };

    try {
      // add new fresh cart to user
      await usersCollection.findOneAndUpdate(
        { _id: query },
        { $set: { currentCart: initCart } }
      );
      // add completed order to orders collection
      await ordersCollection.insertOne(completedOrder);
      return { code: 201, data: completedOrder };
    } catch (err) {
      console.log(err);
      return { code: 400, data: err };
    }
  },
};
