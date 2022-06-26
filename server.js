if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

//import router to our server
const indexRouter = require('./routes/index')


//setting our view engine to ejs
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

//before this line install mongoose (npm i mongoose)
const mongoose = require('mongoose')
//set up connectionfor our data base
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error',error => console.error(error))
db.once('open', () => console.log('connected to mongoose'))
    
//thisline below after importing router
app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)