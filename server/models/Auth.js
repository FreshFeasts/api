require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connectDb } = require('../db/index');
const { userAlreadyExists } = require('../helperFunctions');
const { Info } = require('./');
const Users = require('./Users');

let usersCollection;
let infoCollection;
let payInfoCollection;

const getCollection = async () => {
  if (usersCollection && infoCollection && payInfoCollection) {
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
    const hashedPass = await bcrypt.hash(user.password, 10);
    const userResponse = await usersCollection.insertOne({
      ...user,
      password: hashedPass,
      currentCart: {
        meals: [],
        deliveryDate: null,
      },
      mealsRated: [],
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

    const token = jwt.sign(
      { userId: userId, email: user.email },
      process.env.JWT_SECRET
    );

    const userData = await usersCollection.findOne({ _id: userId });
    const infoData = await Info.getInfoByUserId(userId.toString());

    return { user: userData, info: infoData, token: token };
  },

  loginUser: async (email, password) => {
    const userData = await Users.getUserByEmail(email);
    if (!userData) {
      return {
        status: 401,
        json: { msg: 'A user does not exist with that email' },
      };
    }
    const match = await bcrypt.compare(password, userData.password);
    if (match) {
      const token = jwt.sign(
        { userId: userData._id, email: email },
        process.env.JWT_SECRET
      );
      return {
        status: 200,
        json: {
          msg: 'user logged in',
          userId: userData._id,
          email: email,
          token: token,
        },
      };
    } else {
      return { status: 401, json: { msg: 'Invalid credentials' } };
    }
  },

  isAuth: async (authHeader) => {},
};
