var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const i18n = require("./lib/i18nConfigure");
const LoginController = require("./controllers/LonginController.js");
const session = require("express-session");
const sessionAuth = require("./lib/sessionAuthMiddleware");
const MongoStore = require("connect-mongo");
const jwtAuthMiddleware = require("./lib/jwtAuthMiddleware");

require("./lib/connectMongoose"); // Para establecer conexion a mongoose

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("x-powered-by", false);

app.locals.title = "nodepop";
app.locals.jwt = process.env.JWT_SECRET;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const loginController = new LoginController();

//  Rutas del API
app.use("/api/anuncios", jwtAuthMiddleware, require("./routes/api/anuncios"));
app.post("/api/authenticate", loginController.postAPI);

// Rutas del Web side
app.use(i18n.init);
app.use(
  session({
    name: "nodeapp-session",
    secret: "as78dbas8d7bva6sd6vas",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2, // expira a los 2 días de inactividad
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_CONNECTION_STR,
    }),
  })
);

// hacemos que el objeto de sesión esté disponible al renderizar vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
app.use("/", require("./routes/home"));
app.use("/users", require("./routes/users"));
app.use("/features", require("./routes/features"));
app.use("/change-locale", require("./routes/change-locale"));
app.get("/login", loginController.index);
app.post("/login", loginController.post);
app.get("/logout", loginController.logout);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // comprobar si es un error de validacion
  if (err.array) {
    //const errorInfo = err.array({ onlyFirstError: true })[0]
    const errorInfo = err.errors[0];
    err.message = `Error en ${errorInfo.location}, parametro: ${errorInfo.param}, ${errorInfo.msg}`;
    err.status = 422;
  }
  res.status(err.status || 500);

  // si lo que ha fallado es una peticion al API
  // devuelvo el error en formato JSON
  if (req.originalUrl.startsWith("/api/")) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page

  res.render("error");
});

module.exports = app;
