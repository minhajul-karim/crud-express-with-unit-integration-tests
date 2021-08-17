/*
 * Title: Router object for /customers path
 * Description: This router object will be used for all paths following /customers
 * Author: Minhajul Karim
 * Date: 4 Aug 2021
 */

// Dependencies
const express = require('express');
const { Op } = require('sequelize');
const db = require('../models');
const { getUsersInfo } = require('../utils/utils');

// TODO: ASYNC ERROR HANDLE

// Router object
const router = express.Router();

// Display details of all users
router.get('/', async (req, res) => {
  let users;
  try {
    users = await db.User.findAll();
  } catch (error) {
    console.log(
      'There was an error to querying users',
      JSON.stringify(err),
    );
  }
  const allUsers = getUsersInfo(users);
  res.render('home', { users: allUsers });
});

// Show add new customer form
router.get('/add', (req, res) => {
  res.render('add');
});

// Create new user
router.post('/add', async (req, res) => {
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
router.get('/:userId/update', async (req, res) => {
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

// Remvoe users
router.get('/:userId/remove', async (req, res) => {
  // Retrieve userId from URL
  const { userId } = req.params;
  // Delete user
  await db.User.destroy({ where: { id: userId } });
  res.render('deleted');
});

// Search information
router.get('/search/', async (req, res) => {
  const { q } = req.query;
  let users;
  try {
    users = await db.User.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${q}%` } },
          { email: { [Op.like]: `%${q}%` } },
          { phone: { [Op.like]: `%${q}%` } },
        ],
      },
    });
  } catch (error) {
    console.log(error);
  }
  const allUsers = getUsersInfo(users);
  res.render('home', { users: allUsers });
});

module.exports = router;
