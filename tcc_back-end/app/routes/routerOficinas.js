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
router.get('/oficinas', async function (req, res) {
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

    // AVALIAÇÕES DE OFICINA
    for (let j = 0; j < results.length; j++) {
      console.log(results[j].cnpj_oficina)
      produtosOfc = await produtosDAO.getProdutosOfc(results[j].cnpj_oficina);
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

      results[j].avg_media_geral = avg_media_geral.toFixed(1);
      results[j].num_avaliacoes = soma_num_avaliacoes;
    }

    setTimeout(function () {
      console.log(results);
      res.render('pages/todas_oficinas', { oficinas: results, autenticado: false })

    }, 500)

  } catch (e) {

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
  res.render('pages/oficina', { oficina: dadosOficina, buff, produtosOfc, servicosOfc, oficinas_parceiras, autenticado});
})

module.exports = router;