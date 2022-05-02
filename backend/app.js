var createError = require('http-errors')
const dotenv = require('dotenv').config()
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const colors = require('colors')
const cors = require('cors')

// db
const connectDB = require('./config/db')
connectDB()

// then, you will see the message in console
// connected to MongoDB

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var codesRouter = require('./routes/codes')

var app = express()

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))

// CORS setting
app.use(cors({ origin: true, credentials: true }))

// Routes
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/codes', codesRouter)

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  console.log('this is production')
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  // FIX: below code fixes app crashing on refresh in deployment
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Party-Invitation API' })
  })
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
