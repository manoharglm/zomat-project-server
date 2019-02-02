const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    username:String,
    email: String,
    date:String,
    phone:Number,
    photoURL:String
})
const Users = module.exports = mongoose.model('users', usersSchema)

let createUser =(userDetails) =>{
    return Users.insertMany(userDetails)
    .then(data => data)
    .catch(err => err)
}
let getUserDetails=(userName) =>{
    console.log(userName)
    return Users.findOne({username:userName})
    .then(data => data)
    .catch(err => err)
}
module.exports ={
    createUser,
    getUserDetails
}