const express = require('express')
const mongoose = require('mongoose')
let Restaurants = require('./models/restaurants')

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

app.listen(5000)