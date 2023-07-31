require('dotenv').config();
const { MongoClient } = require('mongodb');

const USERNAME = encodeURIComponent(process.env.DB_USER);
const PASSWORD = encodeURIComponent(process.env.DB_PASS);
const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || '27017';
const DB_NAME = process.env.DB_NAME || 'freshfeast';
const DB_AUTHCOLL = process.env.DB_AUTHCOLL || 'admin';
const URI = `mongodb://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/?authMechanism=DEFAULT&authSource=${DB_AUTHCOLL}`;
// const URI = 'mongodb://127.0.0.1:27017';
let db;

const connectDb = async () => {
  if (db) {
    return db;
  }

  const client = await MongoClient.connect(URI, { useUnifiedTopology: true });
  db = client.db(DB_NAME);

  return db;
};

exports.connectDb = connectDb;
