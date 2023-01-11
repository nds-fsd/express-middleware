const express = require("express");
const router = express.Router();
const todoRoutes = require("./todo");
const { jwtMiddleware, authRouter } = require("../security/jwt");

router.use("/", authRouter);
router.use("/todo", jwtMiddleware, todoRoutes);

module.exports = router;
