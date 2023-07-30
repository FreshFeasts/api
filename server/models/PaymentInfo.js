const { ObjectId } = require('mongodb');
const { connectDb } = require('../db/index');

let ccCollection;

const getCollection = async () => {
  if (ccCollection) {
    return;
  }
  const db = await connectDb();
  ccCollection = db.collection('paymentInfo');
};

getCollection();

const projectOptions = {
  ccId: '$_id',
  _id: 0,
  ccNum: '$ccNum',
  ccv: '$ccv',
  ccDetails: '$ccDetails',
  ccExp: '$ccExp',
};

module.exports = {
  getCardsByUserId: async (userId) => {
    const data = await ccCollection
      .find(
        { userId: new ObjectId(userId) },
        {
          projection: projectOptions,
        }
      )
      .toArray();
    return data;
  },
};
