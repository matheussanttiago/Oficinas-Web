const express = require('express');
const router = express.Router();
const DbConnection = require('../../config/DbConnection');
const bcrypt = require('bcryptjs');

var conexao = DbConnection();

// const passport = require('passport');

// router.get('/', function(req, res, next) {
//   if(req.query.fail) {
//     res.render('pages/login', {message: 'Usuario e/ou senha inválidos!'});
//   } else {
//     res.render('pages/login', {message: null})
//   }
// });

// router.post('/', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login?fail=true'
// }));

router.get("/", function (req, res) {
  res.render("pages/login");
});

router.post(
  "/",

  function (req, res) {
    var dadosForm = {
      email: req.body.email,
      senha: req.body.senha,
    };

    var result = conexao.query(
      "SELECT email_prop, senha, tipo_usuario FROM proprietario WHERE email_prop = ? UNION SELECT email_visit, senha, tipo_usuario FROM visitante WHERE email_visit = ?",
      [dadosForm.email, dadosForm.email],
      function (error, results, fields) {
        if (error) throw error;
        var total = Object.keys(results).length;
        
        if (total == 1) {
          if (bcrypt.compareSync(dadosForm.senha,results[0].senha)) {
            req.session.autenticado = true;
            req.session.usu_autenticado = results[0].email;
            req.session.usu_tipo = results[0].tipo_usuario;
          }
          if (req.session.autenticado == true && req.session.usu_tipo == '2') {
            autenticado = { autenticado: req.session.usu_autenticado };
            res.render('pages/dashboard', autenticado);
          } else {
            res.redirect('/');
            console.log(results)
          }
        } else {
          res.redirect('/login')
        }
      }
    );
  }
);

router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});


module.exports = router;


// const express = require('express');
// const router = express.Router();

// const passport = require('passport')

// /* GET Login page. */
// router.get('/', (req, res, next) => {
  
//   if(req.query.fail) {
//     res.render('login', {message: 'Usuario e/ou senha inválidos!'});
//   } else {
//     res.render('login', {message: null})
//   }
  
// });


// /* POST Login page. */
// router.post('/', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login?fail=true'
// }));


// module.exports = router;
