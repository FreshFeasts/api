const { ObjectId } = require('mongodb');
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
    const session = await MongoClient.startSession();
    session.startTransaction();

    try {
      if (await userAlreadyExists(user.email, usersCollection)) {
        throw new Error('Email has already been registered');
      }

      const userResponse = await usersCollection.insertOne(
        {
          ...user,
          currentCart: {
            meals: [],
            deliverDate: null,
            orderedDate: null,
          },
        },
        { session }
      );

      const userId = userResponse.insertedId;

      const dateFormatedInfo = { ...info, DOB: new Date(info.DOB) };
      await infoCollection.insertOne(
        {
          ...dateFormatedInfo,
          userId,
        },
        { session }
      );

      // TODO encrypt all the payment info then insert with userId
      await payInfoCollection.insertOne(
        {
          ...paymentInfo,
          userId,
        },
        { session }
      );

      await session.commitTransaction();

      const user = await usersCollection.findOne({ _id: userId });
      const info = await Info.getInfoByUserId(userId.toString());

      return { user, info };
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  },
};
