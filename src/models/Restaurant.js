const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);


module.exports = Restaurant;