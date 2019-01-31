const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user_rating:Object,
    id: {
        type: String,
        required: true,
        unique: true
    },
    average_cost_for_two:Number,
    cuisines:String,
    location:Object,
})
restaurantSchema.index({
    name: 'text'
}, {
    background: false
});
const Restauants = module.exports = mongoose.model('restaurants', restaurantSchema)
module.exports.getTrendingRestaurants = () => {
    return Restauants.find({})
    .then(restauants =>{
        return [...restauants].sort((a,b) => Number(b.user_rating.aggregate_rating)-Number(a.user_rating.aggregate_rating)).slice(0,10)
    })
    .catch(err => err.message)
}
module.exports.getRestaurantbyId=(restuarantId)=>{
    return Restauants.find({_id:restuarantId})
    .then(restauant => restauant)
    .catch(err => err.message)
}
module.exports.getRestaurantsBySearch=(searchText)=>{
    return Restauants.find(
        { 
            $or:[
                {cuisines:{$regex:searchText, $options:'i'}},
                {name:{$regex:searchText, $options:'i'}},
                // {location:{city:{$regex:searchText, $options:'i'}}}
            ]
        }
    )
    .then(searchResults => searchResults)
    .catch(err => err.message)
}