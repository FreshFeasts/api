const { ObjectId } = require('mongodb');

const { connectDb } = require('../db/index');
const Info = require('./Info');

let usersCollection;

const getCollection = async () => {
  if (usersCollection) {
    return;
  }
  const db = await connectDb();
  usersCollection = db.collection('users');
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
  updateCartMeals: async (userId, meals, cart) => {
    const query = new ObjectId(userId);

    try {
      // const { currentCart } = await usersCollection.findOne({ _id: query });
      // const updatedCart = { ...currentCart, meals };

      await usersCollection.findOneAndUpdate(
        { _id: query },
        { $set: { currentCart: cart } }
      );

      return { code: 204, data: `Successfully updated cart` };
    } catch (err) {
      return { code: 400, data: err };
    }
  },
};
