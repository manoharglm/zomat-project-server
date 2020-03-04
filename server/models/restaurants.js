const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    restaurant: {
        type: Object,
        required: true,
    },
    // user_rating:Object,
    // id: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // average_cost_for_two:Number,
    // cuisines:String,
    // location:Object,
})
const Restauants = mongoose.model('restaurants', restaurantSchema)

let getTrendingRestaurants = () => {
    return Restauants.find({})
    .then(restauants =>{
        return [...restauants].sort((a,b) => Number(b.restaurant.user_rating.aggregate_rating)-Number(a.restaurant.user_rating.aggregate_rating)).slice(0,12).map(restaurant => restaurant.restaurant)
    })
    .catch(err => err.message)
}
let getRestaurantbyId=(restuarantId)=>{
    return Restauants.find({_id:restuarantId})
    .then(restauant => restauant)
    .catch(err => err.message)
}
let getRestaurantsBySearch=(searchText)=>{
    return Restauants.find(
        { 
            $or:[
                {"restaurant.cuisines":{$regex:searchText, $options:'i'}},
                {"restaurant.name":{$regex:searchText, $options:'i'}},
            ]
        }
    )
    .then(searchResults => searchResults.map(restaurant => restaurant.restaurant))
    .catch(err => err.message)
}
module.exports ={
    getTrendingRestaurants,
    getRestaurantbyId,
    getRestaurantsBySearch,
    Restauants
}