const express = require('express');
const router = express.Router();
var async = require('async');
const bcrypt = require('bcryptjs');
const multer = require('multer');


const DbConnection = require('../../config/DbConnection');
var conexao = DbConnection();

var CadastroDAO = require("../models/cadastroDAO");
cadastroDAO = new CadastroDAO(conexao);

var ProdutosDAO = require("../models/produtosDAO");
produtosDAO = new ProdutosDAO(conexao);

var OficinasDAO = require("../models/oficinasDAO");
oficinasDAO = new OficinasDAO(conexao);

// PÁGINA DE TODOS OS PRODUTOS
router.get('/produtos', async function(req, res) {
  try {
    results = await produtosDAO.getProdutos(); 
    res.render('pages/todos_produtos', {produtos: results})
  } catch(e) {

      console.log(e);
      res.status(500).send('Something broke!')

  }
});

// PÁGINA DO PRODUTO
router.get('/produto/:id_produto', async function(req, res) {
  var idProd = req.params;
  console.log(idProd)
  var dadosProduto = await produtosDAO.getOneProduto(idProd.id_produto);
  var dadosAnunciante = await oficinasDAO.getAnunciante(dadosProduto[0].cnpj_oficina);
  console.log(dadosProduto)
  // console.log(dadosAnunciante[0].nome_oficina)

  res.render('pages/pag_produto', {produto: dadosProduto, dadosAnunciante});
});


// PÁGINA DE TODOS OS SERVIÇOS
router.get('/servicos', async function(req, res) {
  try {
    results = await produtosDAO.getServicos(); 
    res.render('pages/todos_servicos', {servicos: results})
  } catch(e) {

      console.log(e);
      res.status(500).send('Something broke!')

  }
});

// PÁGINA DO SERVIÇO
router.get('/servico/:id_produto', async function(req, res) {
  var idProd = req.params;
  console.log(idProd)
  var dadosServico = await produtosDAO.getOneServico(idProd.id_produto);
  var dadosAnunciante = await oficinasDAO.getAnunciante(dadosServico[0].cnpj_oficina);
  console.log(dadosServico)

  res.render('pages/pag_servico', {servico: dadosServico, dadosAnunciante});
});

module.exports = router;