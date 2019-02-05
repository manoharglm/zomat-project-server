const express = require('express')
const mongoose = require('mongoose')
let Restaurants = require('./models/restaurants')
let Bookings = require('./models/bookings')
let Users = require('./models/users')

const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())


mongoose.connect('mongodb://localhost/zomato', {
    useNewUrlParser: true
})

app.get('/api/restaurants/trending', (req, res) => {
    Restaurants.getTrendingRestaurants().then(rating=>{
        res.status(200).send(rating)
    })
    .catch(err =>{
        res.status(400).send(err)
    })  
})
app.get('/api/restaurants/:id', (req, res) => {
    Restaurants.getRestaurantbyId(req.params.id).then(data => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(400).send(err.message)
    })
})
app.get('/api/restaurants/search/:search', (req, res) => {
    Restaurants.getRestaurantsBySearch(req.params.search).then(data => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(400).send(err.message)
    })
})

app.post('/api/bookings',(req, res) => {    
    Bookings.saveBookingData(req.body,req.get('Referrer')).then(data =>{
        res.status(200).send('Booking Done')
    }).catch((err) => {
        res.status(400).send(err.message)
    })
})
app.get('/api/bookings',(req, res) => {
    Bookings.getBookingData(req.get('Referrer')).then(data =>{
        res.status(200).send(data)
    }).catch((err) => {
        res.status(400).send(err.message)
    })
})

app.post('/api/user',(req, res) => {
    Users.createUser(req.body).then(data =>{
        res.status(200).send('Account created')
    }).catch((err) => {
        res.status(400).send(err.message)
    })
})

app.get('/api/user',(req, res) => {
    Users.getUserDetails(req.get('Referrer')).then(data =>{
        res.status(200).send(data)
    }).catch((err) => {
        res.status(400).send(err.message)
    })
})
app.put('/api/user',(req, res) => {
    Users.updateUserDetails(req.body,req.get('Referrer')).then(data =>{
        res.status(200).send(data)
    }).catch((err) => {
        res.status(400).send(err.message)
    })
})

app.listen(5000)