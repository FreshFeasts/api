const { ObjectId } = require('mongodb');
const { connectDb } = require('../db/index');

let infoCollection;

const getCollection = async () => {
  if (infoCollection) {
    return;
  }
  const db = await connectDb();
  infoCollection = db.collection('info');
};

getCollection();

module.exports = {
  getInfoByUserId: async (userId) => {
    const data = await infoCollection.findOne(
      { userId: new ObjectId(userId) },
      {
        projection: {
          infoId: '$_id',
          _id: 0,
          userId: '$userId',
          deliveryAddress: '$deliveryAddress',
          DOB: '$DOB',
          phone: '$phone',
        },
      }
    );
    return data;
  },
};
