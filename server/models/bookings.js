const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    restaurantData:Object,
    user:String,
    numberOfPeople: Number,
    date:String,
    time:String,
})
const Bookings = module.exports = mongoose.model('bookings', bookingSchema)

let saveBookingData=(bookingData,userName)=>{
    bookingData.user = userName
    return Bookings.insertMany(bookingData)
    .then(data => data)
    .catch(err => err)
}
let getBookingData=(userName) =>{
    return Bookings.find({user:userName})
    .then(data => data)
    .catch(err => err)
}
module.exports ={
    saveBookingData,
    getBookingData
}