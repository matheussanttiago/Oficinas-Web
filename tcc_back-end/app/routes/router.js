const express = require('express');
const router = express.Router();
var async = require('async');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const expressValidator = require('express-validator')


// const querystring = require("querystring");
// const { Curl } = require("node-libcurl");
// const curl = new Curl();

// const terminate = curl.close.bind(curl);
// router.use(expressValidator())

var upload = require('../models/upload')

const DbConnection = require('../../config/DbConnection');
var conexao = DbConnection();

var CadastroDAO = require("../models/cadastroDAO");
cadastroDAO = new CadastroDAO(conexao);

var ProdutosDAO = require("../models/produtosDAO");
produtosDAO = new ProdutosDAO(conexao);

var OficinasDAO = require("../models/oficinasDAO");
oficinasDAO = new OficinasDAO(conexao);


// router.get('/', function(req, res) {
//   // DbConnection.connection().query(
//   //   "SELECT * FROM Oficina",
//   //   function (error, results, fields) {
//   //     if (error) throw error;
//   //     res.render('pages/index', {dados_oficina: results});
//   //     console.log(results)
//   //   },
//   // );
//   async.parallel([
//     function(callback) {
//         var queryData = '' +
//         'SELECT * FROM oficina';
//         // DbConnection.connection().query(queryData, function (err, rows1) {
//         conexao.query(queryData, function (err, rows1) {

//             if (err) {
//                 return callback(err);
//             }
//             return callback(null, rows1);
//         });
//     },
//     function(callback) {
//       // DbConnection.connection().query('SELECT * FROM produto', function (err, rows2) {
//       conexao.query('SELECT * FROM produto', function (err, rows2) {
//             if (err) {
//                 return callback(err);
//             }
//             return callback(null, rows2);
//         });
//     }
// ], function(error, callbackResults) {
//     if (error) {
//         //handle error
//         console.log(error);
//     } else {
//         console.log(callbackResults[0]); // rows1
//         console.log(callbackResults[1]); // rows2
//         // use this data to send back to client etc.
//         res.render('pages/index', {dados_oficina: callbackResults[0], dados_produto: callbackResults[1]});
//     }
// });

// });

router.get('/', async function (req, res) {
  try {
    allProdutos = await produtosDAO.getProdutos();
    allServicos = await produtosDAO.getServicos();
    allOficinas = await oficinasDAO.getOficinas();

    console.log(req.session);

    autenticado = req.session.autenticado;
    email = req.session.usu_autenticado;
    nome = req.session.usu_nome;

    let buff = req.session.usu_foto
    // console.log(buff)
    if(buff != undefined){
      buff = req.session.usu_foto.data.toString();
      // buff = Buffer.from(buff).toString("base64")
      // var foto = buff.buffer.toString('base64');
      console.log(buff)
    }

    res.render('pages/index', { oficinas: allOficinas, produtos: allProdutos, servicos: allServicos, autenticado, email, nome, buff });

} catch (e) {
  console.log(e);
  res.status(500).send('Something broke!');
}
});

router.get('/avaliacao', function (req, res) {
  res.render('pages/avaliacao');
});
router.get('/planos', function (req, res) {
  res.render('pages/planos');
});
router.get('/pagamento', function (req, res) {
  res.render('pages/forma_pagamento');
});

router.get('/oficina/:cnpj_oficina', async function (req, res) {
  var cnpjBD = req.params;
  console.log(cnpjBD)
  var dadosOficina = await oficinasDAO.getOneOficina(cnpjBD.cnpj_oficina);
  console.log(dadosOficina)
  res.render('pages/oficina', {oficina: dadosOficina});
})
router.get('/cadastro', function (req, res) {
  res.render('pages/cad_visitante');
});
router.get('/seus-servicos', function (req, res) {
  res.render('pages/servicos');
});
// router.get('/seus-produtos', function(req, res) {
//   res.render('pages/produtos');
// });
router.get('/add-produto', function (req, res) {
  res.render('pages/add_produto');
});
router.get('/dashboard', function (req, res) {
  if (req.session.autenticado == true && req.session.usu_tipo == 2) {
    autenticado = { autenticado: req.session.usu_autenticado };
    res.render("pages/adm", autenticado);
  } else {
    res.send('Área restrita')
  }
});



// router.post('/cad_visitante', async (req, res) => {
//   const DbConnection = require('../../config/DbConnection');
//   const bcrypt = require('bcryptjs');

//   try {
//       const hashedPassword = await bcrypt.hash(req.body.senha, 10)
//       DbConnection.connection().query(`insert into visitante(nome, e_mail_vist, telefone_visitante, senha, foto, tipo_usuario) 
//       values ('${req.body.nome_visitante}', 
//         '${req.body.email}', '${req.body.celular_visitante}', '${hashedPassword}',  null, '1')`)
//       res.redirect('/login')

//   } catch(e) {

//       console.log(e);
//       res.status(500).send('Something broke!')

//   }
// })

router.post('/cad_visitante', upload.single('add-img-v'), async (req, res) => {

  let fileContent;

  if (!req.file) {
    fileContent = null;
  } else {
    fileContent = req.file.buffer.toString('base64');
  }

  let celular_visitante = req.body.celular_visitante
  let phone = celular_visitante.replace('(', '').replace(')', '').replace('-', '')
  // console.log(phone)

  var dadosForm = {
    nome: req.body.nome_visitante,
    email_visit: req.body.email_visitante,
    telefone_visitante: phone,
    senha: await bcrypt.hash(req.body.senha_visitante, 10),
    foto: fileContent,
    tipo_usuario: '1'
  };

  try {
    results = await cadastroDAO.CadVisitante(dadosForm);
    res.redirect('/login')
  } catch (e) {

    console.log(e);
    res.status(500).send('Something broke!')

  }
});



router.post('/cad_juridica', upload.single('add-img-j'), async (req, res) => {

  let fileContent;

  if (!req.file) {
    fileContent = null;
  } else {
    fileContent = req.file.buffer.toString('base64');
  }

  let telefone_proprietario = req.body.telefone_proprietario
  let phone = telefone_proprietario.replace('(', '').replace(')', '').replace('-', '')
  // console.log(phone)

  let cpf = req.body.cpf
  let cpfBD = cpf.replace('.', '').replace('.', '').replace('-', '')
  console.log(cpfBD)

  var dadosForm = {
    nome_proprietario: req.body.nome_proprietario,
    email_prop: req.body.email_prop,
    cpf: cpfBD,
    telefone: phone,
    senha: await bcrypt.hash(req.body.senha_prop, 10),
    foto: fileContent,
    tipo_usuario: '2'
  };

  try {
    results = await cadastroDAO.CadProprietario(dadosForm);

    req.session.autenticado = true;
    dadosProp = cpfBD;
    id = await cadastroDAO.GetId(dadosProp);
    req.session.id_prop = id[0].id_prop;
    console.log(req.session)
    // res.redirect('/add-oficina')
  } catch (e) {

    console.log(e);
    res.status(500).send('Something broke!')

  }
});


module.exports = router;