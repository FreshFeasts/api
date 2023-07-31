require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const isAuth = require('./middleware/isAuth');
// const compression = require('compression');

const { connectDb } = require('./db');

const router = require('./router');

const app = express();
// Server variables
const PORT = process.env.EX_PORT || 3000;

var corsOptions = {
  origin: 'http://localhost:8080',
};

// Create an async function in order to connect to DB before starting server
const startServer = async () => {
  try {
    const db = await connectDb();

    //middleware
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
    // app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/hello1', (req, res) => {
      res.send('Hello');
    });
    app.use(isAuth);
    app.use('/api', router);

    app.get('/hello', (req, res) => {
      res.send('Hello');
    });

    app.listen(PORT, () => {
      console.log(`Connected to ${db.databaseName}, Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};
startServer();
