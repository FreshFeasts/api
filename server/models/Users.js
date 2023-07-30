const { connectDb } = require('../db/index');

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
};
