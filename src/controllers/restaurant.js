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
    await newRestaurant.save();
    res.send(newRestaurant);

};

const edit = async (req, res) => {
  const { id } = req.params;
  const result = await Restaurant.findByIdAndUpdate(id, req.body);
  res.json(result);
};

module.exports = { getAll, create, getById, edit };