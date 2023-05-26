const { Usuario } = require("../models");
const jwt = require("jsonwebtoken");

class LoginController {
  index(req, res, next) {
    res.locals.error = "";
    res.locals.email = "";
    res.render("login");
  }

  // login post desde el website
  async post(req, res, next) {
    try {
      const { email, password } = req.body;

      // buscar el usuario en la BD
      const usuario = await Usuario.findOne({ email: email });

      // si no lo encuentro o no coincide la contraseña --> error
      if (!usuario || !(await usuario.comparePassword(password))) {
        res.locals.error = req.__("Invalid credentials");
        res.locals.email = email;
        res.render("login");
        return;
      }

      // si existe y la contrseña coincide
      // apuntar en la sesión del usuario, que está autenticado
      req.session.usuarioLogado = usuario._id;

      // enviar un email al usuario
      //const result = await usuario.enviarEmailConMicroServicio('Bienvenido', 'Bienvenido a NodeApp');
      //console.log(result);

      // --> redirigir a la zona privada
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  }

  logout(req, res, next) {
    req.session.regenerate((err) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect("/");
    });
  }

  // login post desde el API
  async postAPI(req, res, next) {
    try {
      const { email, password } = req.body;

      // buscar el usuario en la BD
      const usuario = await Usuario.findOne({ email: email });

      // si no lo encuentro o no coincide la contraseña --> error
      if (!usuario || !(await usuario.comparePassword(password))) {
        res.json({ error: "invalid credentials" });
        return;
      }

      // si existe y la contrseña coincide
      // crear un token JWT con el _id del usuario dentro
      const token = await jwt.sign(
        { _id: usuario._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        }
      );

      // --> redirigir a la zona privada
      res.json(token);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LoginController;
