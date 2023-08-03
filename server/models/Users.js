const { ObjectId } = require('mongodb');

const { connectDb } = require('../db/index');
const Info = require('./Info');

let usersCollection;
let ordersCollection;
let infoCollection;

const getCollection = async () => {
  if (usersCollection) {
    return;
  }
  const db = await connectDb();
  usersCollection = db.collection('users');
  ordersCollection = db.collection('orders');
  infoCollection = db.collection('info');
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
  updateCart: async (userId, currentCart) => {
    const query = new ObjectId(userId);
    const deliverDateFormated = new Date(currentCart.deliveryDate);
    const updatedCart = {
      ...currentCart,
      deliveryDate: deliverDateFormated,
    };
    try {
      await usersCollection.findOneAndUpdate(
        { _id: query },
        { $set: { currentCart: updatedCart } }
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

  updateUser: async (userId, user, info) => {
    const query = new ObjectId(userId);
    try {
      const userData = await usersCollection.findOne({ _id: query });
      const infoData = await infoCollection.findOne({ userId: query });

      const updatedUserData = { ...userData, ...user };
      const updatedInfoData = { ...infoData, ...info };

      await usersCollection.findOneAndUpdate(
        { _id: query },
        { $set: updatedUserData }
      );

      await infoCollection.findOneAndUpdate(
        { userId: query },
        { $set: updatedInfoData }
      );

      return { code: 204 };
    } catch (error) {}
  },
};
