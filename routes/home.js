var express = require("express");
var router = express.Router();
var api = require("./api/anuncios");
const Anuncio = require("../models/Anuncio");

/* GET home page */
router.get("/", async function (req, res, next) {
  try {
    // filtros
    const filterByNombre = req.query.nombre;
    const filterByVenta = req.query.venta;
    const filterByPrecio = req.query.precio;
    const filterByTags = req.query.tags;

    // paginazion
    const skip = req.query.skip;

    // estamos construyendo un filtro and, si quisieramos u filtro OR, miraremos la docu de mongoDB ($age)
    const filtro = {};

    if (filterByNombre) {
      filtro.nombre = new RegExp("^" + filterByNombre, "i");
    }

    if (filterByVenta) {
      filtro.venta = filterByVenta;
    }

    if (filterByPrecio) {
      filtro.precio = filterByPrecio;
    }

    if (filterByTags) {
      filtro.tags = new RegExp("^" + filterByTags, "i");
    }

    let anuncios = await Anuncio.lista(filtro, skip);

    anuncios.forEach((anuncio) => {
      if (anuncio.venta === false) {
        anuncio.venta_string = "Compra";
      } else {
        anuncio.venta_string = "Venta";
      }

      anuncio.rutaFoto = "http://localhost:3001/images/" + anuncio.foto;
    });
    res.locals.anuncios = anuncios;
    console.log(anuncios);

    res.render("index");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
