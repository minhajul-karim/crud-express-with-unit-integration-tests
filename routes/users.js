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

// TODO: ASYNC ERROR HANDLE

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
userRouter.post('/add', async (req, res) => {
  const { id, name, email, phone } = req.body;
  const errorMsgs = [];
  if (!name) errorMsgs.push({ message: 'Please provie your name' });
  if (!email) errorMsgs.push({ message: 'Please provie your email' });
  if (!phone) errorMsgs.push({ message: 'Please provie your phone number' });
  // TODO: Validate and sanitize inputs
  if (name && email && phone) {
    // Update information if user already exists
    if (id) {
      const user = await db.User.findByPk(id);
      user.name = name;
      user.email = email;
      user.phone = phone;
      await user.save();
      res.redirect('/customers');
    } else {
      // Save new user to db
      try {
        await db.User.create({
          name,
          email,
          phone,
        });
        res.redirect('/customers');
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    // Show error messages above form
    res.render('add', {
      errorMsgs,
      name,
      email,
      phone,
    });
  }
});

// Update existing user
userRouter.get('/:userId/update', async (req, res) => {
  // Retrieve userId from URL
  const { userId } = req.params;
  // Find the user with userId
  const user = await db.User.findByPk(userId);
  const { id, name, email, phone } = user;
  // Render the add user form and pre-populate it with current name, email, and phone
  res.render('add', {
    id,
    name,
    email,
    phone,
  });
});

module.exports = userRouter;
