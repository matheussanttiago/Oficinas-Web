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

router.get("/login", function (req, res) {
  res.render("pages/login");
});

router.post(
  "/login",

  function (req, res) {
    var dadosForm = {
      email: req.body.email,
      senha: req.body.senha,
    };

    var result = conexao.query(
      "SELECT id_prop, email_prop, foto, senha, tipo_usuario, nome_proprietario FROM proprietario WHERE email_prop = ? UNION SELECT id_visit, email_visit, foto, senha, tipo_usuario, nome FROM visitante WHERE email_visit = ?",
      [dadosForm.email, dadosForm.email],
      function (error, results, fields) {
        if (error) throw error;
        var total = Object.keys(results).length;

        if (total == 1) {
          if (bcrypt.compareSync(dadosForm.senha,results[0].senha)) {
            req.session.autenticado = true;
            req.session.usu_autenticado = results[0].email_prop;
            req.session.usu_tipo = results[0].tipo_usuario;
            req.session.usu_nome = results[0].nome_proprietario;
            req.session.usu_id = results[0].id_prop;
            if(results[0].foto == undefined)
            {
              req.session.usu_foto = null
            }
            else
            {
              req.session.usu_foto = results[0].foto.toString("base64");
            }
          }
          if (req.session.autenticado == true && req.session.usu_tipo == '2') {
            autenticado = { autenticado: req.session.usu_autenticado };
            // res.render('pages/index', autenticado);
            res.redirect('/');

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
