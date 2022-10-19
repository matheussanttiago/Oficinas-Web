const express = require('express');

const app = express();
const cookieParser = require('cookie-parser')
const port = 3000;

const passport = require('passport');
const session = require('express-session');
const store = new session.MemoryStore();
// require('./auth')(passport);


// function authenticationMiddleware(req, res, next){
  
//   if(req.isAuthenticated()) return next();
//   res.redirect('/login');

// };


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
    saveUninitialized: true,
    cookie: {maxAge: 60 * 60 * 1000}, // 30min
    store
  }));

  // app.use(passport.initialize())
  // app.use(passport.session())

// fim

const home = require('./app/routes/router');
const login = require('./app/routes/loginRoutes');
const produtos = require('./app/routes/routerProdutos');
const anuncios = require('./app/routes/proprietario/routerAnuncios');
const oficinasProp = require('./app/routes/proprietario/routerOficina');

const oficinas = require('./app/routes/routerOficinas');

app.use(login);
app.use(produtos);
app.use(anuncios);
app.use(oficinasProp);
app.use(oficinas);
app.use('/', home);


app.listen(port, () => {
    console.log(`Servidor ouvindo na porta: ${port}`)
});


module.exports = app;