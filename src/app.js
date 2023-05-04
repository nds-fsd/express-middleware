// importamos express y luego lo usamos para crear una app
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


require("./mongo");

cors = require("cors");

//Le decimos a nuestra app, que vamos recibir peticiones donde el Body contiene texto en formato JSON.
app.use(express.json());

const generalRouter = require("./routers");

app.use(cors());

//Le decimos a nuestra app, que "utilize" el router GENERAL. Esto es equivalente a haber definido todos nuestros endpoints directamente sobre el objeto app como vimos en clase.
app.use(generalRouter);

module.exports = app;