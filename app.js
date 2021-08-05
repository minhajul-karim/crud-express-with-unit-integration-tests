const express = require('express')
const exphbs = require('express-handlebars')
const userRouter = require('./routes/users')

const app = express()

// Handlebars settings
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// Index route
app.get('/', (req, res) => {
  res.sendStatus(200)
})

// Router for '/users' path
app.use('/customers', userRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
})