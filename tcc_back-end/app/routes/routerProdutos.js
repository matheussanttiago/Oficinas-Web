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


router.get('/produtos', async function(req, res) {
  try {
    results = await produtosDAO.getProdutos(); 
    res.render('pages/todos_produtos', {produtos: results})
  } catch(e) {

      console.log(e);
      res.status(500).send('Something broke!')

  }
});

router.get('/servicos', async function(req, res) {
  try {
    results = await produtosDAO.getServicos(); 
    res.render('pages/todos_servicos', {servicos: results})
  } catch(e) {

      console.log(e);
      res.status(500).send('Something broke!')

  }
});

module.exports = router;