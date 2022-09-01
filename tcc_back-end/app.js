const express = require('express');

const app = express();
const cookieParser = require('cookie-parser')
const port = 3000;

const passport = require('passport');
const session = require('express-session');
// require('./auth')(passport);


// function authenticationMiddleware(req, res, next){
  
//   if(req.isAuthenticated()) return next();
//   res.redirect('/login');

// };

const home = require('./app/routes/router');
const login = require('./app/routes/loginRoutes');
const produtos = require('./app/routes/routerProdutos');
// const cadastro = require('./app/routes/router');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./app/public'));

app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(cookieParser());

// authentication inicio

app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 2 * 60 * 1000} // 2min
  }));

  // app.use(passport.initialize())
  // app.use(passport.session())

// fim


app.use('/login', login);
app.use('/seus-produtos', produtos);
app.use('/', home);


app.listen(port, () => {
    console.log(`Servidor ouvindo na porta: ${port}`)
});


module.exports = app;