/*
 * Title: Router object for /customers path
 * Description: This router object will be used for all paths following /customers
 * Author: Minhajul Karim
 * Date: 4 Aug 2021
 */

// Dependencies
const express = require('express');
const db = require('../models');
const { getUsersInfo } = require('../utils');

// Router object
const userRouter = express.Router();

// Display details of all users
userRouter.get('/', (req, res) => {
  db.User.findAll()
    .then((users) => {
      const allUsers = getUsersInfo(users);
      res.render('home', { users: allUsers });
    })
    .catch((err) => {
      console.log(
        'There was an error to querying users',
        JSON.stringify(err),
      );
    });
});

// Show add new customer form
userRouter.get('/add', (req, res) => {
  res.render('add');
});

// Create new user
userRouter.post('/add', (req, res) => {
  const { name, email, phone } = req.body;
  const errorMsgs = [];
  if (!name) errorMsgs.push({ message: 'Please provie your name' });
  if (!email) errorMsgs.push({ message: 'Please provie your email' });
  if (!phone) errorMsgs.push({ message: 'Please provie your phone number' });
  // TODO: Validate and sanitize inputs
  if (name && email && phone) {
    // Save user to db
    db.User.create({ name,
      email,
      phone })
      .then(() => res.redirect('/customers'))
      .catch((err) => console.log(err));
  } else {
    // Show error messages
    res.render('add', { errorMsgs,
      name,
      email,
      phone });
  }
});

// Update existing user
userRouter.post('/:usreId/update', (req, res) => {
  res.send(200);
});

module.exports = userRouter;
