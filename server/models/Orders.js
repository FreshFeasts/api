const { ObjectId } = require('mongodb');
const { connectDb } = require('../db/index');

let ordersCollection;

const getCollection = async () => {
  if (ordersCollection) {
    return;
  }
  const db = await connectDb();
  ordersCollection = db.collection('orders');
};

getCollection();

const projectOptions = {
  _id: 0,
  orderId: '$_id',
  userId: '$userId',
  meals: '$meals',
  orderDate: '$orderDate',
  deliveryDate: '$deliveryDate',
};

module.exports = {
  getOrdersByUserId: async (userId) => {
    const query = new ObjectId(userId);
    const response = await ordersCollection.find(
      { userId: query },
      {
        projection: projectOptions,
      }
    );
    const data = await response.toArray();

    return data;
  },
  getOrderById: async (orderId) => {
    const query = new ObjectId(orderId);
    const data = await ordersCollection.findOne(
      { _id: query },
      {
        projection: projectOptions,
      }
    );
    return data;
  },
};
