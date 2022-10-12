const express = require('express');
const router = express.Router();
var async = require('async');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const Correios = require('node-correios');
const correios = new Correios();


const DbConnection = require('../../config/DbConnection');
var conexao = DbConnection();

var CadastroDAO = require("../models/cadastroDAO");
cadastroDAO = new CadastroDAO(conexao);

var ProdutosDAO = require("../models/produtosDAO");
produtosDAO = new ProdutosDAO(conexao);

var OficinasDAO = require("../models/oficinasDAO");
oficinasDAO = new OficinasDAO(conexao);

// TODAS AS OFICINAS
router.get('/oficinas', async function(req, res) {
  try {
    results = await oficinasDAO.getOficinas(); 

    for (let i = 0; i < results.length; i++) {

      correios.consultaCEP({ cep: results[i].cep })
        .then(async result => {
          results[i].bairro = result.bairro
          results[i].cidade = result.localidade
        })
        .catch(error => {
          console.log(error)
        });
    }

    setTimeout(function () {
      // console.log(allOficinas);
      res.render('pages/todas_oficinas', {oficinas: results})

    }, 500)

  } catch(e) {

      console.log(e);
      res.status(500).send('Something broke!')

  }
});

// PÁGINA DA OFICINA
router.get('/oficina/:nome_tela', async function (req, res) {
  var nomeTela = req.params;
  console.log(nomeTela)
  var dadosOficina = await oficinasDAO.getOneOficina(nomeTela.nome_tela);
  console.log(dadosOficina)
  
  // OUTRAS INFORMAÇÕES
  produtosOfc = await produtosDAO.getProdutoOfc(dadosOficina[0].cnpj_oficina);
  // console.log(produtosOfc)
  servicosOfc = await produtosDAO.getServicoOfc(dadosOficina[0].cnpj_oficina);
  // console.log(servicosOfc)
  oficinas_parceiras = await oficinasDAO.getOficinaProp(dadosOficina[0].id_prop);
  console.log(oficinas_parceiras)

  // VARIÁVEIS DE SESSÃO
  autenticado = req.session.autenticado;
  email = req.session.usu_autenticado;
  nome = req.session.usu_nome;
  tipo_usuario = req.session.usu_tipo;
  id_usu = req.session.usu_id
  let buff = req.session.usu_foto

  res.render('pages/oficina', {oficina: dadosOficina, buff, produtosOfc, servicosOfc, oficinas_parceiras});
})

module.exports = router;