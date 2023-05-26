// Poner en Mayusculas el nombre del archivo de la carpeta models
const mongoose = require("mongoose");

const anuncioSchema = mongoose.Schema({
  nombre: String,
  venta: Boolean,
  precio: Number,
  foto: String,
  tags: [String],
});

// montar query por partes, hay que meter como argumentos lso diferentes parametros de filtrado y paginacion
// find -> Buscar
anuncioSchema.statics.lista = function (filtro, skip) {
  const query = Anuncio.find(filtro);
  query.skip(skip); // skip -> Saltar (esto sirve para luego paginar número de anuncios)
  return query.exec(); // exec -> ejecucion de la query
};

const Anuncio = mongoose.model("Anuncio", anuncioSchema);

// exportat el modelo
module.exports = Anuncio;
