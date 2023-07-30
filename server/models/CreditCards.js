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

module.exports = {
  getCardsByUserId: async (userId) => {
    const data = await cardCollection
      .find({ userId: new ObjectId(userId) })
      .toArray();
    return data;
  },
};
