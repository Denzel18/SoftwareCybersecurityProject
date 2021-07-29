const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const flash = require('connect-flash');
const config = require('./config');
const session = require('express-session');
const fs = require('fs');
const csurf = require('csurf')
const mysql = require('mysql');

const isLoggedIn = require('./middleware/login');

const eventoRouter = require('./routes/evento');
//const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');
const loginRouter = require("./routes/login");
const usersRouter = require("./routes/users");
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('mysql://user:user@localhost:3306/cybersecurity');

// var connection = mysql.createConnection({
//   host : 'localhost',
//   user: 'user',
//   password:'user',
//   database: 'cybersecurity'
// });

// connection.connect(function(err){
//    if(err){
//       console.log(err);
//    }
//   console.log("Connected...App.js");  
//  });


sequelize.authenticate()
    .then(() => {
        console.log('Connection established.');
    })
    .catch(err => {
        console.log('Connection failed.');
    });

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'requests.log'), {flags: 'a'})


const app = express();

/*
app.use('/css', express.static(path.join(__dirname, './node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, './node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, './node_modules/jquery/dist')))
*/


// view engine setup
app.engine('ejs', require('express-ejs-extend'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser(config.secret));
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: 60 * 60000}
}));
app.use(flash());
app.use(morgan('combined', {stream: accessLogStream}));
app.use(csurf({cookie: true}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', loginRouter);
app.use('/user', usersRouter);
app.use('/evento', eventoRouter);

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.get('/', (req, res) => {
    if(req.session.user)
        return res.redirect("/user");
    else
        return res.redirect("/login");
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

/*app.get('/user', isLoggedIn, (req, res) => {
    res.render("user", {user: req.session.user, title: "Pagina Utente"});
});*/

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {title: 'Error'});
});

module.exports = app;
