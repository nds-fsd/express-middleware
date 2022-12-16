const Restaurant = require("../models/Restaurant");

const getAll = async (req, res) => {
  const result = await Restaurant.find(req.query);
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Restaurant.findById(id);
  res.json(result);
};

const create = async (req, res) => {
  const newRestaurant = new Restaurant(req.body);
//   try {
    await newRestaurant.save();
    res.send(restaurant);
//   } catch (error) {
//     res
//       .status(400)
//       .send({ message: "A restaurant with this owner already exists" });
//   }
};

const addCategory = async (req, res) => {
  const { categoryId, restaurantId } = req.body;

  // const body = { $push: { arrayField: elementToPush } };
  const body = { $push: { categories: categoryId } };

  const updatedRestaurant = await Restaurant.findByIdAndUpdate(
    restaurantId,
    body
  );

  res.status(201).json(updatedRestaurant);
};

module.exports = { getAll, create, getById, addCategory };
//.populate(["owner",'categories']);
