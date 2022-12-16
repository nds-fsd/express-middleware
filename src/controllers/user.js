const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

const getAll = async (req, res) => {
  const result = await User.find();
  res.json(result);
};

const create = async (req, res) => {


  const newUser = new User( req.body);
  await newUser.save();

  // Crea un Restaurante de ejemplo por cada nuevo usuario
  const newRestaurant = new Restaurant({
    name: "Example Restaurant from " + newUser.name,
    owner: newUser._id,
  });
  await newRestaurant.save();

  res.json(newUser);
};

module.exports = { getAll, create };
