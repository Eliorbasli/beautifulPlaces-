const express = require('express')
const app = express()
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/db8')
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to DataBase'))

app.use(express.json())


const placesRouter = require('./routes/places')
app.use('/places', placesRouter)

app.listen(3000, () => console.log('Server Started'))