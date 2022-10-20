const express = require('express');
const router = express.Router();
var async = require('async');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
// var fetch = require("node-fetch");
const Correios = require('node-correios');
const correios = new Correios();


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

    // PRODUTOS DE MOTO
    var cnpjMoto = await oficinasDAO.getOficinasMoto();
    var arrMotos = []
    for (let i = 0; i < cnpjMoto.length; i++) {
      var oficina = await oficinasDAO.getOneOficinaCnpj(cnpjMoto[i].cnpj_oficina);
      arrMotos.push(oficina[0])
    }
    // console.log(arrMotos)

    // PRODUTOS DE CARRO
    var cnpjCarro = await oficinasDAO.getOficinasCarro();
    var arrCarros = []
    for (let i = 0; i < cnpjCarro.length; i++) {
      var oficina = await oficinasDAO.getOneOficinaCnpj(cnpjCarro[i].cnpj_oficina);
      arrCarros.push(oficina[0])
    }
    // console.log(arrCarros)

    // PRODUTOS DE VAN
    var cnpjVan = await oficinasDAO.getOficinasVan();
    var arrVans = []
    for (let i = 0; i < cnpjVan.length; i++) {
      var oficina = await oficinasDAO.getOneOficinaCnpj(cnpjVan[i].cnpj_oficina);
      arrVans.push(oficina[0])
    }
    // console.log(arrVans)

    // PRODUTOS DE CAMINHÃO
    var cnpjCaminhao = await oficinasDAO.getOficinasCaminhao();
    var arrCaminhoes = []
    for (let i = 0; i < cnpjCaminhao.length; i++) {
      var oficina = await oficinasDAO.getOneOficinaCnpj(cnpjCaminhao[i].cnpj_oficina);
      arrCaminhoes.push(oficina[0])
    }
    // console.log(arrCaminhoes)

    // PRODUTOS DE BICICLETA
    var cnpjBicicleta = await oficinasDAO.getOficinasBicicleta();
    var arrBicicletas = []
    for (let i = 0; i < cnpjBicicleta.length; i++) {
      var oficina = await oficinasDAO.getOneOficinaCnpj(cnpjBicicleta[i].cnpj_oficina);
      arrBicicletas.push(oficina[0])
    }
    // console.log(arrBicicletas)

    // console.log(req.session);

    autenticado = req.session.autenticado;
    email = req.session.usu_autenticado;
    nome = req.session.usu_nome;
    tipo_usuario = req.session.usu_tipo;
    id_usu = req.session.usu_id
    id_prop = req.session.id_prop

    if (tipo_usuario == 2) {
      if (id_prop) {
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

    for (let i = 0; i < allOficinas.length; i++) {

      correios.consultaCEP({ cep: allOficinas[i].cep })
        .then(async result => {
          allOficinas[i].bairro = result.bairro
          allOficinas[i].cidade = result.localidade
        })
        .catch(error => {
          console.log(error)
        });
    }

    // AVALIAÇÕES DE OFICINA
    for(let j = 0; j < allOficinas.length; j++){
      console.log(allOficinas[j].cnpj_oficina)
      produtosOfc = await produtosDAO.getProdutosOfc(allOficinas[j].cnpj_oficina);
      // console.log(produtosOfc)
      let media_geral = []
      for(let k = 0; k < produtosOfc.length ; k++){
        // console.log(produtosOfc)
        // if(produtosOfc == ''){
        //   produtosOfc
        // }
        avaliacaoProd = await produtosDAO.getAvaliacaoProd(produtosOfc[k].id_produto);
        if(avaliacaoProd == undefined || avaliacaoProd.media_avaliacao == null){
          if(avaliacaoProd[0].media_avaliacao == null){
            media_geral.push(5)
          } else {
            media_geral.push(avaliacaoProd[0].media_avaliacao)
          }
          // console.log(avaliacaoProd)

          // console.log(media_geral)

        } else {
          console.log('teste')
          media_geral.push(avaliacaoProd.media_avaliacao);
          // console.log(avaliacaoProd[k].media_avaliacao)

          // console.log(media_geral)
        }
      }
      // console.log(media_geral)
      let soma = 0
      for(let c = 0; c < media_geral.length; c++){
        soma += media_geral[c]
      }
      let avg_media_geral = soma / media_geral.length;
      if(isNaN(avg_media_geral)){
        avg_media_geral = 5;
      }
      // console.log(avg_media_geral);
      allOficinas[j].avg_media_geral = avg_media_geral
    }

    // AVALIAÇÕES DE PRODUTOS
    for(let i = 0; i < allProdutos.length; i++){
      avaliacao_produto =  await produtosDAO.getAvgAvalia(allProdutos[i].id_produto);
      // console.log(avaliacao_produto[0])
      if(avaliacao_produto[0].media_avaliacao == null){
        allProdutos[i].avaliacao = 5
      } else {
        allProdutos[i].avaliacao = avaliacao_produto[0].media_avaliacao
      }
    }


    // console.log(allOficinas);
    console.log(allProdutos);
    setTimeout(function () {
      // console.log(allOficinas);
      res.render('pages/index', { oficinas: allOficinas, produtos: allProdutos, servicos: allServicos, autenticado, email, nome, buff, tipo_usuario, oficinaProp, arrMotos, arrCarros, arrVans, arrCaminhoes, arrBicicletas });
    }, 500)

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
  res.render('pages/planos', { cadastrado: false });
});
router.get('/pagamento', function (req, res) {
  nomeTela = req.session.nomeTela
  res.render('pages/forma_pagamento', { nomeTela, oficinaProp });
});

router.post('/search', async function (req, res) {
  valor = req.body.search;
  console.log(valor);
  
  resultsProd = await searchDAO.searchProduto(valor);
  for(let i = 0; i < resultsProd.length; i++){
    avg_avalia = await produtosDAO.getAvgAvalia(resultsProd[i].id_produto);
    if (avg_avalia[0].media_avaliacao == null) {
      avg_avalia[0].media_avaliacao = 5
    }
    media_avaliacao = avg_avalia[0].media_avaliacao.toFixed(1);
  
    numBD = await produtosDAO.getNumAvaliacoes(resultsProd[i].id_produto);
    num_avaliacoes = numBD[0].num_avaliacoes;

    resultsProd[i].num_avaliacoes = num_avaliacoes
    resultsProd[i].media_avaliacao = media_avaliacao
  }


  resultsServ = await searchDAO.searchServico(valor);
  for(let i = 0; i < resultsServ.length; i++){
    avg_avalia = await produtosDAO.getAvgAvalia(resultsServ[i].id_produto);
    if (avg_avalia[0].media_avaliacao == null) {
      avg_avalia[0].media_avaliacao = 5
    }
    media_avaliacao = avg_avalia[0].media_avaliacao.toFixed(1);
  
    numBD = await produtosDAO.getNumAvaliacoes(resultsServ[i].id_produto);
    num_avaliacoes = numBD[0].num_avaliacoes;

    resultsServ[i].num_avaliacoes = num_avaliacoes
    resultsServ[i].media_avaliacao = media_avaliacao
  }


  resultsOfc = await searchDAO.searchOficina(valor);
  for (let j = 0; j < resultsOfc.length; j++) {
    console.log(resultsOfc[j].cnpj_oficina)
    produtosOfc = await produtosDAO.getProdutosOfc(resultsOfc[j].cnpj_oficina);
    // console.log(produtosOfc)
    let media_geral = []
    let num_todos_produtos = []

    // ADICIONANDO AVALIAÇÕES
    for (let k = 0; k < produtosOfc.length; k++) {
      avaliacaoProd = await produtosDAO.getAvaliacaoProd(produtosOfc[k].id_produto);
      num_avaliacao_prod = await produtosDAO.getNumAvaliacoes(produtosOfc[k].id_produto);
      if (avaliacaoProd == undefined || avaliacaoProd.media_avaliacao == null) {
        if (avaliacaoProd[0].media_avaliacao == null) {
          media_geral.push(5)
        } else {
          media_geral.push(avaliacaoProd[0].media_avaliacao)
        }
      } else {
        media_geral.push(avaliacaoProd.media_avaliacao);
      }
    
      // ADICIONANDO NUMERO DE AVALIAÇÕES
      if (num_avaliacao_prod == undefined || num_avaliacao_prod.num_avaliacoes == 0) {
          num_todos_produtos.push(0)
      } else {
        num_todos_produtos.push(num_avaliacao_prod[0].num_avaliacoes);
      }

    }

    // CALCULANDO MÉDIA DE AVALIAÇÕES
    let soma_media_avaliacao = 0
    for (let c = 0; c < media_geral.length; c++) {
      soma_media_avaliacao += media_geral[c]
    }
    let avg_media_geral = soma_media_avaliacao / media_geral.length;
    if (isNaN(avg_media_geral)) {
      avg_media_geral = 5;
    }

    // CALCULANDO NÚMERO TOTAL DE AVALIAÇÕES
    let soma_num_avaliacoes = 0
    for (let c = 0; c < num_todos_produtos.length; c++) {
      soma_num_avaliacoes += num_todos_produtos[c]
    }

    resultsOfc[j].avg_media_geral = avg_media_geral.toFixed(1);
    resultsOfc[j].num_avaliacoes = soma_num_avaliacoes;
  }

  console.log(resultsProd);
  console.log(resultsServ);
  console.log(resultsOfc);

  autenticado = req.session.autenticado
  res.render('pages/resultado_busca', { valor, resultsProd, resultsServ, resultsOfc, autenticado });
})

router.post('/avaliacao/:id_produto', upload.single('add-img'), async function(req, res){

  let fileContent;

  if (!req.file) {
    fileContent = null;
  } else {
    fileContent = req.file.buffer.toString('base64');
  }
  
  var idProd = req.params;
  // console.log(idProd.id_produto)

  var num_estrela = req.body.num_estrela
  if(num_estrela == ''){
    num_estrela = 1
  }

  var dadosAvaliacao = {
    avalia: num_estrela,
    foto1: fileContent,
    descricao_avalia: req.body.comentario,
    id_produto: idProd.id_produto,
    id_visit: req.session.usu_id
  }

  result = await produtosDAO.avaliar(dadosAvaliacao)
  console.log(num_estrela)
  res.redirect('/')
})

router.get('/historico', async function(req, res) {
  resultsProd = await produtosDAO.getHistoricoProd(req.session.usu_id);

  for(let i = 0; i < resultsProd.length; i++){
    tipo_produto = await produtosDAO.getTipoProduto(resultsProd[i].id_produto);
    produto = await produtosDAO.getAllProdutos(resultsProd[i].id_produto);
    // console.log(produto)
    resultsProd[i].tipo_produto = tipo_produto[0].tipo_do_produto;
    resultsProd[i].info_produto = produto[0];
    // console.log(resultsProd)


    avg_avalia = await produtosDAO.getAvgAvalia(resultsProd[i].id_produto);
    if (avg_avalia[0].media_avaliacao == null) {
      avg_avalia[0].media_avaliacao = 5
    }
    media_avaliacao = avg_avalia[0].media_avaliacao.toFixed(1);
  
    numBD = await produtosDAO.getNumAvaliacoes(resultsProd[i].id_produto);
    num_avaliacoes = numBD[0].num_avaliacoes;

    resultsProd[i].info_produto.num_avaliacoes = num_avaliacoes
    resultsProd[i].info_produto.media_avaliacao = media_avaliacao
  }

  
  // var avaliacoes = await produtosDAO.getAvaliacoes(idProd.id_produto);
  // for (let i = 0; i < avaliacoes.length; i++) {
  //   nome_avaliador = await produtosDAO.getAvaliador(avaliacoes[i].id_visit);
  //   console.log(nome_avaliador)
  //   console.log(nome_avaliador[0].nome);
  //   avaliacoes[i].nome_avaliador = nome_avaliador[0].nome
  // }



  console.log(resultsProd)
  res.render('pages/historico', resultsProd)
})



router.get('/cadastro', function (req, res) {
  res.render('pages/cad_visitante', {"erros": null, "valores": {}, erroProp: false });
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

router.post('/cad_visitante',
 upload.single('add-img-v'), 
 body('nome_visitante').isLength({ min: 5, max: 20}).withMessage('Insira um nome entre 5 e 20 caracteres'),
 body('email_visitante').isEmail().withMessage('Insira um email válido'),
 body('celular_visitante').isLength({ min: 14}).withMessage('Insira um telefone válido'),
 async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({ errors: errors.array() });
    return res.render('pages/cad_visitante', { "erros": errors, "valores":req.body, erroProp: false })
  }

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



router.post('/cad_juridica', 
upload.single('add-img-j'),

body('email_prop').isEmail().notEmpty().withMessage('Insira um email válido'),
body('nome_proprietario').isLength({ min: 5, max: 20}).notEmpty().withMessage('Insira um nome entre 5 e 20 caracteres'),
body('telefone_proprietario').isLength({ min: 14}).notEmpty().withMessage('Insira um telefone válido'),
body('cpf').isLength({ min: 14}).notEmpty().withMessage('Insira um cpf válido'),
async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.render('pages/cad_visitante', { "erros": errors, "valores":req.body, erroProp: true })
    }
  // }

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

    if(fileContent == null){
      req.session.usu_foto = null
    } else {
      req.session.usu_foto = fileContent.toString("base64")
    }
    console.log(req.session)
    res.render('pages/criar_oficinas', { cadastrado: true, "erros": null, "valores": "" })
  } catch (e) {

    console.log(e);
    res.status(500).send('Something broke!')

  }

  // console.log(req.body.nome2)
});


module.exports = router;