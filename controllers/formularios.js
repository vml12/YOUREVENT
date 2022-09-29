const conect = require("../database/db");
const sessions = require("express-session");

// LOGICA DE FORMULARIOS ----------->
exports.registro = async (req, res) => {
  const { usuario, correo, password } = req.body;
  conect.query("SELECT * FROM users", (error, rows) => {
    if (!error) {
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].correo == correo || rows[i].usuario == usuario) {
          return res.redirect('/');
        }
      }
      
      conect.query(
        "INSERT INTO users SET ?",
        { usuario: usuario, correo: correo, password: password },
        (error, results) => {
          if (!error) {
            return res.redirect("/");
          } else {
            console.log(error);
          }
        }
      );
    }
  });
};


exports.login = (req, res) => {
  let { correo, password } = req.body;

  conect.query("SELECT * FROM users WHERE correo = ? AND password = ?", [correo, password], (error, rows) => {

    if (rows.length > 0) {
      session = req.session;
      sessions.idUser = rows[0].id;
      sessions.usuario = rows[0].usuario;
      return res.redirect('/yourevent')

    } else {
      return res.send('error');
    }
  })
}

exports.logout = (req, res) => {
  cookie = req.cookies;
  for (var prop in cookie) {
    if (!cookie.hasOwnProperty(prop)) {
      continue;
    }
    return res.cookie(prop, '', { expires: new Date(0) });
  }
  res.redirect('/');
}







