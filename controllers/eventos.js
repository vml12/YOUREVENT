const conect = require("../database/db");
const sessions = require("express-session");
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');


// Registrar evento ->
exports.onEvent = async (req, res) => {
  upload.single('image')
  let evento = req.body.nombre_evento;
  let lugar = req.body.lugar_evento;
  let fecha = req.body.fecha_evento;
  let hora = req.body.hora_evento;
  const result = await cloudinary.uploader.upload(req.file.path);
  if (sessions.idUser) {
    conect.query(
      "INSERT INTO eventos (nombre_evento, lugar_evento, fecha_evento, hora_evento, idUsuario, imagenUser) Values (?, ?, ?, ?, ?, ?) ", [evento, lugar, fecha, hora, sessions.idUser, result.url],
      (error, rows) => {
        if (!error) {
          return res.redirect('/yourevent');
        } else {
          console.log(error);
          return res.send("No fue registrado el evento");
        }
      }
    );
  } else {
    res.send("Iniciar sesión");
  }
};

// Actualizar evento ->
exports.updateEvents = async (req, res) => {
  let { id_evento, nombre_evento, lugar_evento, fecha_evento, hora_evento, imagenUser } = req.body;
  session = req.session;
  if (sessions.idUser) {
    conect.query("UPDATE eventos SET ? WHERE id_evento = ?", [{ nombre_evento, lugar_evento, fecha_evento, hora_evento, }, id_evento], (error) => {
      if (!error) {
        return res.redirect('/yourevent/myEvents');
      } else {
        console.log(error);
      }
    })
  } else {
    res.send("Iniciar sesion")
  }
}


// Eliminar evento ->
exports.delete = async (req, res) => {
  let id_evento = req.params.id_evento;
  try {
    if (sessions.idUser) {
      conect.query("DELETE FROM eventos WHERE id_evento = ?", [id_evento],
        (error, results) => {
          if (!error) {
            return res.redirect('/yourevent/myEvents');
          } else {
            console.log(error);
          }
        })
    } else {
      res.send('Inicia sesion')
    }
  } catch (error) {
    console.log(error);
  }
}







