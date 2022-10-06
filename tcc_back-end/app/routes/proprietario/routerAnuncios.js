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


router.get('/seus-produtos', async function (req, res) {
  cnpj = req.session.cnpj_oficina
  produtosOfc = await produtosDAO.getProdutoOfc(cnpj)
  
  res.render('pages/produtos', {produtos: produtosOfc});
  console.log(req.session)
});

router.get('/seus-servicos', async function (req, res) {
  cnpj = req.session.cnpj_oficina
  servicosOfc = await produtosDAO.getServicoOfc(cnpj)
  
  res.render('pages/servicos', {servicos: servicosOfc});
  console.log(req.session)
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
    cnpj_oficina: req.session.cnpj_oficina,
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

  // var dadosCategoria

  // if(req.body.carro.checked){
  //   dadosCategoria = {
  //     tipo_veiculo_id: req.body.carro,
  //     id_produto
  //   };
  // }
  
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
    cnpj_oficina: req.session.cnpj_oficina,
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

    lastId = await produtosDAO.getProdutoId()
        // ADICIONANDO CATEGORIA
        if(req.body.moto == 'on'){
          var dadosCategoria = {
            tipo_veiculo_id: 1,
            id_produto: lastId
          }
          addCategoria = await produtosDAO.addCategoria(dadosCategoria)
        } 
        if(req.body.carro == 'on'){
          var dadosCategoria = {
            tipo_veiculo_id: 2,
            id_produto: lastId
          }
          addCategoria = await produtosDAO.addCategoria(dadosCategoria)
        } 
        if(req.body.van == 'on'){
          var dadosCategoria = {
            tipo_veiculo_id: 3,
            id_produto: lastId
          }
          addCategoria = await produtosDAO.addCategoria(dadosCategoria)
        } 
        if(req.body.caminhao == 'on'){
          var dadosCategoria = {
            tipo_veiculo_id: 4,
            id_produto: lastId
          }
          addCategoria = await produtosDAO.addCategoria(dadosCategoria)
        } 
        if(req.body.bicicleta == 'on'){
          var dadosCategoria = {
            tipo_veiculo_id: 5,
            id_produto: lastId
          }
          addCategoria = await produtosDAO.addCategoria(dadosCategoria)
        } 
    res.redirect('/')
  } catch(e) {

      console.log(e);
      res.status(500).send('Something broke!')

  }
});

module.exports = router;