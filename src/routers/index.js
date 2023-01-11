const express = require("express");
const generalRouter = express.Router();
const todoRoutes = require("./todo");
const { jwtMiddleware, authRouter } = require("../security/jwt");

generalRouter.use("/", authRouter);
generalRouter.use("/todo", jwtMiddleware, todoRoutes);

module.exports = generalRouter;
