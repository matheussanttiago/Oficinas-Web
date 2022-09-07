const express = require('express');
const router = express.Router();
var async = require('async');
const bcrypt = require('bcryptjs');
const multer = require('multer');

var upload = require('../../models/upload')

const DbConnection = require('../../../config/DbConnection');
var conexao = DbConnection();

var CadastroDAO = require("../../models/cadastroDAO");
cadastroDAO = new CadastroDAO(conexao);

var ProdutosDAO = require("../../models/produtosDAO");
produtosDAO = new ProdutosDAO(conexao);

var OficinasDAO = require("../../models/oficinasDAO");
oficinasDAO = new OficinasDAO(conexao);


router.get('/seus-produtos', function (req, res) {
  res.render('pages/produtos');
});
router.get('/seus-servicos', function (req, res) {
  res.render('pages/servicos');
});


// CADASTRO DE PRODUTO (TIPO 1)
router.post('/cad_produto', upload.array('add-img'), async (req, res) => {
  // if (!req.file) {
  //   console.log("Falha no carregamento");
  // } else {
  let content = [null, null, null, null, null, null]
  for (let i = 0; i < req.files.length; i++) {
    content[i] = req.files[i].buffer.toString('base64');
  }

  let valor = req.body.valor_produto;
  let valorBD = valor.replace('.', '').replace(',', '.');

  var dadosForm = {
    nome_produto: req.body.nome_produto,
    valor_produto: valorBD,
    caracteristicas: req.body.carac_produtos,
    descricao_prod: req.body.desc_produtos,
    tipo_do_produto: '1',
    foto1: content[0],
    foto2: content[1],
    foto3: content[2],
    foto4: content[3],
    foto5: content[4],
    foto6: content[5],
  };
  // console.log(req.files)
  try {
    results = await produtosDAO.CadProduto(dadosForm);
    res.redirect('/')
  } catch (e) {

    console.log(e);
    res.status(500).send('Something broke!')

  }
  // }
});


// CADASTRO DE SERVIÇO (TIPO 2)
router.post('/cad_servico', upload.array('add-img'), async (req, res) => {

  let content = [null, null, null, null, null, null]
  for (let i = 0; i < req.files.length; i++) {
    content[i] = req.files[i].buffer.toString('base64');
  }

  let valor = req.body.valor_produto;
  let valorBD = valor.replace('.', '').replace(',', '.');

  var dadosForm = {
    nome_produto: req.body.nome_produto,
    valor_produto: valorBD,
    caracteristicas: req.body.carac_produtos,
    descricao_prod: req.body.desc_produtos,
    tipo_do_produto: '2',
    foto1: content[0],
    foto2: content[1],
    foto3: content[2],
    foto4: content[3],
    foto5: content[4],
    foto6: content[5],
  };

  try {
    results = await produtosDAO.CadProduto(dadosForm); 
    // res.redirect('/')
  } catch(e) {

      console.log(e);
      res.status(500).send('Something broke!')

  }
});

module.exports = router;