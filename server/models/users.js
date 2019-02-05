const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name:String,
    email: String,
    date:String,
    phone:Number,
    photoURL:String
})
const Users = module.exports = mongoose.model('users', usersSchema)

let createUser =(userDetails) =>{
    return Users.findOne({email:userDetails.email})
    .then(data => {
        if(data === null) return true
        else return false
    })
    .then(bool =>{
        if(bool){
            return Users.insertMany(userDetails)
            .then(data => data)
            .catch(err => err)
        }
    })
}
let updateUserDetails = (userUpdates,userEmail) =>{
    return Users.findOneAndUpdate({email:userEmail},{phone:userUpdates.phone,name:userUpdates.name}).then(data => data)
}
let getUserDetails=(userEmail) =>{
    return Users.findOne({email:userEmail})
    .then(data => data)
    .catch(err => err)
}
module.exports ={
    createUser,
    getUserDetails,
    updateUserDetails
}