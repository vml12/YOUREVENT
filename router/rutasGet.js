const express = require('express');
const sessions = require('express-session');
const conect = require('../database/db');

// Rutas ->
exports.inicio = (req, res) => {
    conect.query("SELECT * FROM eventos", (error, rows) => {
        if (!error) {
            return res.render('0-index', ('index', { rows : rows }))
        } else {

        }   
    })
}

exports.startYourEvent = (req, res) => {
    session = req.session;
    if (sessions.idUser) {
        conect.query("SELECT * FROM eventos", (error, rows) => {
            if (!error) {
                return res.render('index', ('index', { correo: sessions.idUser, usuario: sessions.usuario, rows : rows }))
            } else {

            }   
        })
    }
}

exports.createEvents = (req, res) => {
    session = req.session;
    if (sessions.idUser) {
        conect.query("SELECT * FROM eventos", (error, rows) => {
            if (!error) {
                return res.render('3-crearEvento', { correo: sessions.idUser, usuario: sessions.usuario, rows: rows });
            } else {
                console.log(error);
            }
        })
    } else {
        return res.send('Inicia sesión');
    }
}

exports.myEvents = (req, res) => {
    session = req.session;
    if (sessions.idUser) {
        conect.query(`SELECT id, id_evento, usuario, nombre_evento, lugar_evento, idUsuario, fecha_evento, hora_evento FROM users INNER JOIN eventos ON users.id = eventos.idUsuario WHERE id = ${sessions.idUser} `, (error, rows) => {
            if (!error) {
                return res.render('4-misEventos', { correo: sessions.idUser, usuario: sessions.usuario, rows: rows });
            } else {
                console.log(error);
            }
        })
    } else {
        return res.send('Inicia sesión');
    }
}

exports.updateEvents = (req, res) => {
    let id_evento = req.params.id_evento;
    if (sessions.idUser) {
        conect.query("SELECT * FROM eventos WHERE id_evento = ?", [id_evento], (error, rows) => {
            if (!error) {
                res.render('6-editEvents', { userEdit: rows[0], correo: sessions.idUser, usuario: sessions.usuario, });
            } else {
                res.send('Inicia sesión');
            }
        })
    } else {

    }
}


exports.perfilUsuario = (req, res) => {
    session = req.session;
    if (sessions.idUser) {
        return res.render('7-perfilUsuario', { correo: sessions.idUser, usuario: sessions.usuario });
    } else {
        return res.send('Inicia sesión');
    }
}


