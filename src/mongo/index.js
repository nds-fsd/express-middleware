const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.log("Missing URL couldnt connect to the DB ❌❌");
  return;
}

mongoose.connect(mongoUrl);
mongoose.set("strictQuery", false);

const mongo = mongoose.connection;
mongo.on("error", (error) => console.error(error));
mongo.once("open", () => {
  console.log("connected to database 🖲️🖲️");
});

module.exports = { mongo };
