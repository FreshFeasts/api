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
  getOrdersByUserId: async (userId, count, page) => {
    const query = new ObjectId(userId);
    const skipTo = (page - 1) * count;
    const cursor = await ordersCollection.aggregate([
      {
        $match: {
          userId: query,
        },
      },
      {
        $skip: skipTo,
      },
      {
        $limit: count,
      },
      {
        $addFields: {
          orderId: '$_id',
        },
      },
      {
        $project: {
          _id: 0,
          orderId: 1,
          userId: 1,
          meals: 1,
          orderDate: 1,
          deliveryDate: 1,
        },
      },
    ]);
    const data = await cursor.toArray();
    console.log(data);
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
