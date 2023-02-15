const express = require("express");
const RestaurantController = require("../controllers/restaurant");
const { adminPermissionMiddleware, ownPermissionMiddleware } = require("../security/permisions");

const router = express.Router();

router.get("/", RestaurantController.getAll);
router.get("/:id", RestaurantController.getById);
router.post("/", adminPermissionMiddleware, RestaurantController.create);
router.patch("/:id", ownPermissionMiddleware, RestaurantController.edit);

module.exports = router;