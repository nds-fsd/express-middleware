// importamos express y luego lo usamos para crear una app
const app = require("./app");
// importamos dotenv para poder gestionar variables de entorno y configuramos
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`Server is up and running in port ${port} ⚡`);
});
