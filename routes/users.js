const express = require('express')
const db = require('../models')

const userRouter = express.Router()

// Display details of all users
userRouter.get('/', (req, res) => {
  db.User.findAll()
    .then((users) => {
      const allUsers = users.map(userObj => {
        const { id, name, phone, email } = userObj
        return {
          id,
          name,
          phone,
          email
        }
      })
      res.render('home', {
        users: allUsers
      })
    })
    .catch(err => {
      console.log('There was an error to querying users', JSON.stringify(err))
    })
})

userRouter.get('/add', (req, res) => {
  res.render('add')
})

// Create new user
userRouter.post('/add', (req, res) => {
  const { name, email, phone } = req.body
  const errorMsgs = []
  if (!name) errorMsgs.push({ message: 'Please provie your name' })
  if (!email) errorMsgs.push({ message: 'Please provie your email' })
  if (!phone) errorMsgs.push({ message: 'Please provie your phone number' })
  if (name && email && phone) {
    // Save user to db
    db.User.create({
      name,
      email,
      phone
    })
      .then(() => res.redirect('/customers'))
      .catch(err => console.log(err))
  } else {
    // Show error messages
    res.render('add', {
      errorMsgs,
      name,
      email,
      phone
    })
  }
})

module.exports = userRouter