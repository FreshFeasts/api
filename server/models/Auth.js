const { connectDb } = require('../db/index');
const { userAlreadyExists } = require('../helperFunctions');
const { Info } = require('./');

let usersCollection;
let infoCollection;
let ccCollection;

const getCollection = async () => {
  if (usersCollection && infoCollection && ccCollection) {
    return;
  }
  const db = await connectDb();
  usersCollection = db.collection('users');
  infoCollection = db.collection('info');
  payInfoCollection = db.collection('paymentInfo');
};

getCollection();

const projectOptions = {};

module.exports = {
  registerUser: async (user, info, paymentInfo) => {
    if (await userAlreadyExists(user.email, usersCollection)) {
      throw new Error('Email has already been registered');
    }
    const userResponse = await usersCollection.insertOne({
      ...user,
      currentCart: {
        meals: [],
        deliverDate: null,
        orderedDate: null,
      },
    });

    const userId = userResponse.insertedId;

    const dateFormatedInfo = { ...info, DOB: new Date(info.DOB) };
    await infoCollection.insertOne({
      ...dateFormatedInfo,
      userId,
    });
    // TODO encrypt all the payment info then insert with userId
    await payInfoCollection.insertOne({
      ...paymentInfo,
      userId,
    });

    const userData = await usersCollection.findOne({ _id: userId });
    const infoData = await Info.getInfoByUserId(userId.toString());

    return { user: userData, info: infoData };
  },
};
