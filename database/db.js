const mysql = require('mysql');

const conect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'yourevent',
    port: 3306
})

conect.connect((error) => {
    if (error) {
        console.log(error);
    }
    console.log('Conectado 737');
})

module.exports = conect;