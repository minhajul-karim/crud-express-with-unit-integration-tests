const express = require('express')

const userRouter = express.Router()

userRouter.get('/', (req, res) => {
  res.render('home')
})

userRouter.get('/add', (req, res) => {
  res.render('add')
})

module.exports = userRouter