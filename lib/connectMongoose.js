/*
Para hacer conexion mongoose-mongodb
*/
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
// on es suscripcion a los errores
mongoose.connection.on("error", (err) => {
  console.log("error de conexion", err);
});
// once es una suscripcion a la primera vez que se abre
mongoose.connection.once("open", () => {
  console.log("connectado a mongodb en", mongoose.connection.name);
});

mongoose.connect(process.env.MONGODB_CONNECTION_STR);

module.exports = mongoose.connection;
