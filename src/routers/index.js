const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const restaurantsRouter = require("./restaurants");
const categoriesRouter = require("./category");
const todoRoutes = require('./todo');

router.use("/todo", todoRoutes);
router.use("/users", userRoutes);
router.use("/restaurants", restaurantsRouter);
router.use("/categories", categoriesRouter);

module.exports = router;
