"use strict";

require("dotenv").config();

const Anuncio = require("../models/Anuncio");
const connection = require("../lib/connectMongoose");

// ponemos el .catch para poder controlar el posible error que salga de la promesa y lo pinte por la consola
main().catch((err) => console.log("Hubo un error", err));

// al poner async deveulve una promesa, que es una ufncion asincrona
async function main() {
  // inicializacion coleccion anuncios
  await initAnuncios();

  // Cerramos conexion con base de datos
  connection.close();
}

async function initAnuncios() {
  //borrar todos los documentos de la coleccion de anuncios
  const deleted = await Anuncio.deleteMany();
  console.log(`Eliminados, ${deleted.deletedCount} anuncios.`);

  //crear anuncios iniciales
  const inserted = await Anuncio.insertMany(anuncios);

  console.log(`Creados ${inserted} anuncios`);
}

const anuncios = [
  {
    nombre: "Bicicleta",
    venta: true,
    precio: 230.15,
    foto: "bici.jpg",
    tags: ["lifestyle", "motor"],
  },
  {
    nombre: "iPhone 3GS",
    venta: false,
    precio: 50.0,
    foto: "iphone.jpg",
    tags: ["lifestyle", "mobile"],
  },
  {
    nombre: "Kettlebell 12kg",
    venta: false,
    precio: 40.0,
    foto: "kettlebell.jpg",
    tags: ["lifestyle", "work"],
  },
  {
    nombre: "Lampara",
    venta: false,
    precio: 35.0,
    foto: "lampara.jpg",
    tags: ["lifestyle", "work"],
  },
  {
    nombre: "Silla Escritorio",
    venta: true,
    precio: 110.0,
    foto: "silla.jpg",
    tags: ["work", "lifestyle"],
  },
  {
    nombre: "Samsung tablet s7",
    venta: false,
    precio: 185.0,
    foto: "tablet.jpg",
    tags: ["lifestyle", "mobile"],
  },
];

async function initUsuarios() {
  // borrar todos los documentos de usuarios
  const deleted = await Usuario.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios.`);

  // crear usuarios iniciales
  const inserted = await Usuario.insertMany([
    {
      email: "admin@example.com",
      password: await Usuario.hashPassword("1234"),
    },
    {
      email: "usuario@example.com",
      password: await Usuario.hashPassword("1234"),
    },
  ]);
  console.log(`Creados ${inserted.length} usuarios.`);
}
