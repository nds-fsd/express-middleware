

const Category = require("../models/Category");

const getAll = async (req, res) => {
    const result = await Category.find();
    res.json(result);
  };
const create = async (req, res) => {
    const newCategory = new Category({name: req.body.name});
    await newCategory.save();
    res.status(201).json(newCategory);
  };


  
  module.exports = { create ,getAll};