const { ObjectId } = require('mongodb');
const { connectDb } = require('../db/index');

let cardCollection;

const getCollection = async () => {
  if (cardCollection) {
    return;
  }
  const db = await connectDb();
  cardCollection = db.collection('creditCard');
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
    const data = await cardCollection
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
