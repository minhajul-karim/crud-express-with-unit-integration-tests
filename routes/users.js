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

module.exports = userRouter