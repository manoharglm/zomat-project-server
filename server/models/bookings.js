const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    restaurantData:Object,
    email:String,
    numberOfPeople: Number,
    date:String,
    time:String,
})
const Bookings = module.exports = mongoose.model('bookings', bookingSchema)

let saveBookingData=(bookingData,userEmail)=>{
    bookingData.email = userEmail
    return Bookings.insertMany(bookingData)
    .then(data => data)
    .catch(err => err)
}
let getBookingData=(userEmail) =>{
    return Bookings.find({email:userEmail})
    .then(data => data)
    .catch(err => err)
}
module.exports ={
    saveBookingData,
    getBookingData
}