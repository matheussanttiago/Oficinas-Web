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

var SearchDAO = require("../models/searchDAO");
searchDAO = new SearchDAO(conexao);


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

    oficinaProp = null;
    allProdutos = await produtosDAO.getProdutos();
    allServicos = await produtosDAO.getServicos();
    allOficinas = await oficinasDAO.getOficinas();

    // console.log(req.session);

    autenticado = req.session.autenticado;
    email = req.session.usu_autenticado;
    nome = req.session.usu_nome;
    tipo_usuario = req.session.usu_tipo;
    id_usu = req.session.usu_id
    id_prop = req.session.id_prop

    if (tipo_usuario == 2) {
      if(id_prop){
        oficinaProp = await oficinasDAO.getOficinaProp(id_prop);
      } else {
        oficinaProp = await oficinasDAO.getOficinaProp(id_usu);
      }
      console.log(oficinaProp)
    }

    buff = req.session.usu_foto

    // console.log(tipo_usuario)
    console.log(req.session)

    // console.log(buff)
    // if(buff != undefined){
    //   buff = req.session.usu_foto.data.toString();
    //   // buff = Buffer.from(buff).toString("base64")
    //   // var foto = buff.buffer.toString('base64');
    //   console.log(buff)
    // }

    let Correios = require('node-correios');
    let correios = new Correios();
    let bairro
    let cidade
    // for(let i = 0; i < allOficinas.length; i++){
    // correios.consultaCEP({ cep: allOficinas[i].cep })
    // .then(result => {
    //   console.log(result.bairro);
    //   bairro = result.bairro
    //   cidade = result.localidade
    // })
    // .catch(error => {
    //   console.log(error)
    // });
    // }
    console.log(oficinaProp)
    res.render('pages/index', { oficinas: allOficinas, produtos: allProdutos, servicos: allServicos, autenticado, email, nome, buff, tipo_usuario, bairro, cidade, oficinaProp });

    // console.log(bairro)


  } catch (e) {
    console.log(e);
    res.status(500).send('Something broke!');
  }
});

router.get('/avaliacao', function (req, res) {
  res.render('pages/avaliacao');
});
router.get('/planos', function (req, res) {
  console.log(req.session)
  res.render('pages/planos', {cadastrado: false});
});
router.get('/pagamento', function (req, res) {
  nomeTela = req.session.nomeTela
  res.render('pages/forma_pagamento', {nomeTela});
});

router.post('/search', async function(req, res){
  valor = req.body.search;
  console.log(valor);
  resultsProd = await searchDAO.searchProduto(valor);
  resultsOfc = await searchDAO.searchOficina(valor);
  // console.log(resultsProd);
  // console.log(resultsOfc);

  res.render('pages/resultado_busca', {valor, resultsProd, resultsOfc});
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
    email = req.session.usu_autenticado;
    nome = req.session.usu_nome;
    tipo_usuario = req.session.tipo_usuario
    res.render("pages/adm", autenticado, tipo_usuario, nome, email);
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
    fileContent = req.file.buffer;
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
    fileContent = req.file.buffer;
  }

  let telefone_proprietario = req.body.telefone_proprietario
  let phone = telefone_proprietario.replace('(', '').replace(')', '').replace('-', '')
  console.log(phone)

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
    req.session.usu_autenticado = req.body.email_prop;
    req.session.usu_nome = req.body.nome_proprietario;
    req.session.usu_tipo = 2;

    // SALVANDO ID NA SESSÃO
    dadosProp = cpfBD;
    id = await cadastroDAO.GetId(dadosProp);
    req.session.id_prop = id[0].id_prop;

    req.session.usu_foto = fileContent.toString("base64")
    console.log(req.session)
    res.render('pages/criar_oficinas', { cadastrado: true })
  } catch (e) {

    console.log(e);
    res.status(500).send('Something broke!')

  }

  // console.log(req.body.nome2)
});


module.exports = router;