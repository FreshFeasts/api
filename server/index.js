require('dotenv').config();
const express = require('express');

const app = express();

// Packages
const morgan = require('morgan');

// Variables
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {});
