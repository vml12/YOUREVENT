const express = require('express');
const sessions = require('express-session');
const cookies = require('cookie-parser');
const bodyParser = require('body-parser');
const timeExp = 1000 * 60 * 60 * 24;
const dotenv = require('dotenv');
const port = process.env.PORT || 3000;
const app = express();

dotenv.config();


// Settings 
app.set('view engine', 'ejs');

// Middlewares  
app.use(express.urlencoded({ extended: true }));
app.use('/', require('./router/router'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookies());
app.use(sessions({
    secret: 'qaqswdefrgthyukilo',
    saveUninitialized: true,
    cookie: { maxAge: timeExp },
    resave: false
}))

app.listen(port, () => {
    console.log(`Server running uvub -> ${port}`)
})


