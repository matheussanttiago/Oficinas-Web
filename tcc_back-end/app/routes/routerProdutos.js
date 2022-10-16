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
router.get('/produtos', async function (req, res) {
  try {
    results = await produtosDAO.getProdutos();
    var arrProdutos = []
    for (let i = 0; i < results.length; i++) {
      var produto = await produtosDAO.getOneProduto(results[i].id_produto);

      // AVALIAÇÃO
      avg_avalia = await produtosDAO.getAvgAvalia(results[i].id_produto);
      if (avg_avalia[0].media_avaliacao == null) {
        avg_avalia[0].media_avaliacao = 5
      }
      media_avaliacao = avg_avalia[0].media_avaliacao;
      // console.log(media_avaliacao)
      produto[0].media_avaliacao = media_avaliacao;
      arrProdutos.push(produto[0]);
      // console.log(results)
    }

    // PRODUTOS DE MOTO
    var idProdutosMoto = await produtosDAO.getProdutosMoto();
    // console.log(idProdutosMoto);
    var arrMotos = []
    for (let i = 0; i < idProdutosMoto.length; i++) {
      var produto = await produtosDAO.getOneProduto(idProdutosMoto[i].id_produto);

      // AVALIAÇÃO
      avg_avalia = await produtosDAO.getAvgAvalia(idProdutosMoto[i].id_produto);
      if (avg_avalia[0].media_avaliacao == null) {
        avg_avalia[0].media_avaliacao = 5
      }
      media_avaliacao = avg_avalia[0].media_avaliacao;
      // console.log(media_avaliacao)
      produto[0].media_avaliacao = media_avaliacao;
      arrMotos.push(produto[0]);
    }
    // console.log(arrMotos)

    // PRODUTOS DE CARRO
    var idProdutosCarro = await produtosDAO.getProdutosCarro();
    // console.log(idProdutosCarro);
    var arrCarros = []
    for (let i = 0; i < idProdutosCarro.length; i++) {
      var produto = await produtosDAO.getOneProduto(idProdutosCarro[i].id_produto);
      // AVALIAÇÃO
      avg_avalia = await produtosDAO.getAvgAvalia(idProdutosCarro[i].id_produto);
      if (avg_avalia[0].media_avaliacao == null) {
        avg_avalia[0].media_avaliacao = 5
      }
      media_avaliacao = avg_avalia[0].media_avaliacao;
      // console.log(media_avaliacao)
      produto[0].media_avaliacao = media_avaliacao;
      arrCarros.push(produto[0]);
    }
    // console.log(arrCarros)

    // PRODUTOS DE VAN
    var idProdutosVan = await produtosDAO.getProdutosVan();
    // console.log(idProdutosVan);
    var arrVans = []
    for (let i = 0; i < idProdutosVan.length; i++) {
      var produto = await produtosDAO.getOneProduto(idProdutosVan[i].id_produto);
      // AVALIAÇÃO
      avg_avalia = await produtosDAO.getAvgAvalia(idProdutosVan[i].id_produto);
      if (avg_avalia[0].media_avaliacao == null) {
        avg_avalia[0].media_avaliacao = 5
      }
      media_avaliacao = avg_avalia[0].media_avaliacao;
      // console.log(media_avaliacao)
      produto[0].media_avaliacao = media_avaliacao;
      arrVans.push(produto[0]);
    }
    // console.log(arrVans)

    // PRODUTOS DE Caminhao
    var idProdutosCaminhao = await produtosDAO.getProdutosCaminhao();
    // console.log(idProdutosCaminhao);
    var arrCaminhoes = []
    for (let i = 0; i < idProdutosCaminhao.length; i++) {
      var produto = await produtosDAO.getOneProduto(idProdutosCaminhao[i].id_produto);
      // AVALIAÇÃO
      avg_avalia = await produtosDAO.getAvgAvalia(idProdutosCaminhao[i].id_produto);
      if (avg_avalia[0].media_avaliacao == null) {
        avg_avalia[0].media_avaliacao = 5
      }
      media_avaliacao = avg_avalia[0].media_avaliacao;
      // console.log(media_avaliacao)
      produto[0].media_avaliacao = media_avaliacao;
      arrCaminhoes.push(produto[0]);
    }
    // console.log(arrCaminhoes)

    // PRODUTOS DE Bicicleta
    var idProdutosBicicleta = await produtosDAO.getProdutosBicicleta();
    // console.log(idProdutosBicicleta);
    var arrBicicletas = []
    for (let i = 0; i < idProdutosBicicleta.length; i++) {
      var produto = await produtosDAO.getOneProduto(idProdutosBicicleta[i].id_produto);
      // AVALIAÇÃO
      avg_avalia = await produtosDAO.getAvgAvalia(idProdutosBicicleta[i].id_produto);
      if (avg_avalia[0].media_avaliacao == null) {
        avg_avalia[0].media_avaliacao = 5
      }
      media_avaliacao = avg_avalia[0].media_avaliacao;
      // console.log(media_avaliacao)
      produto[0].media_avaliacao = media_avaliacao;
      arrBicicletas.push(produto[0]);
    }
    // console.log(arrBicicletas)

    autenticado = req.session.autenticado;
    res.render('pages/todos_produtos', { produtos: arrProdutos, arrMotos, arrCarros, arrVans, arrCaminhoes, arrBicicletas, autenticado })
  } catch (e) {

    console.log(e);
    res.status(500).send('Something broke!')

  }
});

// PÁGINA DO PRODUTO
router.get('/produto/:id_produto', async function (req, res) {
  var idProd = req.params;
  console.log(idProd)
  var dadosProduto = await produtosDAO.getOneProduto(idProd.id_produto);
  var dadosAnunciante = await oficinasDAO.getAnunciante(dadosProduto[0].cnpj_oficina);
  console.log(dadosProduto)
  // console.log(dadosAnunciante[0].nome_oficina)

  var avaliacoes = await produtosDAO.getAvaliacoes(idProd.id_produto);
  for (let i = 0; i < avaliacoes.length; i++) {
    nome_avaliador = await produtosDAO.getAvaliador(avaliacoes[i].id_visit);
    console.log(nome_avaliador)
    console.log(nome_avaliador[0].nome);
    avaliacoes[i].nome_avaliador = nome_avaliador[0].nome
  }

  avg_avalia = await produtosDAO.getAvgAvalia(idProd.id_produto);
  if (avg_avalia[0].media_avaliacao == null) {
    avg_avalia[0].media_avaliacao = 5
  }
  media_avaliacao = avg_avalia[0].media_avaliacao.toFixed(1);

  numBD = await produtosDAO.getNumAvaliacoes(idProd.id_produto);
  num_avaliacoes = numBD[0].num_avaliacoes;

  console.log(avaliacoes);

  autenticado = req.session.autenticado;
  tipo_usuario = req.session.usu_tipo;
  res.render('pages/pag_produto', { produto: dadosProduto, dadosAnunciante, avaliacoes, media_avaliacao, num_avaliacoes, autenticado, tipo_usuario });
});


// PÁGINA DE TODOS OS SERVIÇOS
router.get('/servicos', async function (req, res) {
  try {
    results = await produtosDAO.getServicos();

    autenticado = req.session.autenticado;
    email = req.session.usu_autenticado;
    nome = req.session.usu_nome;
    tipo_usuario = req.session.usu_tipo;
    id_usu = req.session.usu_id
    id_prop = req.session.id_prop

    autenticado = req.session.autenticado;
    res.render('pages/todos_servicos', { servicos: results, autenticado })
  } catch (e) {

    console.log(e);
    res.status(500).send('Something broke!')

  }
});

// PÁGINA DO SERVIÇO
router.get('/servico/:id_produto', async function (req, res) {
  var idProd = req.params;
  // console.log(idProd);
  var dadosServico = await produtosDAO.getOneServico(idProd.id_produto);
  var dadosAnunciante = await oficinasDAO.getAnunciante(dadosServico[0].cnpj_oficina);
  console.log(dadosServico);

  var avaliacoes = await produtosDAO.getAvaliacoes(idProd.id_produto);
  for (let i = 0; i < avaliacoes.length; i++) {
    nome_avaliador = await produtosDAO.getAvaliador(avaliacoes[i].id_visit);
    console.log(nome_avaliador[0].nome);
    avaliacoes[i].nome_avaliador = nome_avaliador[0].nome
  }

  avg_avalia = await produtosDAO.getAvgAvalia(idProd.id_produto);
  if (avg_avalia[0].media_avaliacao == null) {
    avg_avalia[0].media_avaliacao = 5
  }
  media_avaliacao = avg_avalia[0].media_avaliacao.toFixed(1);

  numBD = await produtosDAO.getNumAvaliacoes(idProd.id_produto);
  num_avaliacoes = numBD[0].num_avaliacoes;

  console.log(avaliacoes);

  autenticado = req.session.autenticado;
  tipo_usuario = req.session.usu_tipo;
  res.render('pages/pag_servico', { servico: dadosServico, dadosAnunciante, avaliacoes, media_avaliacao, num_avaliacoes, autenticado, tipo_usuario });
});

router.get('/produtos/:nome_tela', async function (req, res) {
  nomeTela = req.params
  oficina = await oficinasDAO.getOneOficina(nomeTela.nome_tela)
  // console.log(oficina)

  // TODOS OS PRODUTOS
  produtosOfc = await produtosDAO.getProdutoOfc(oficina[0].cnpj_oficina)
  for (let i = 0; i < produtosOfc.length; i++) {
    var produto = await produtosDAO.getOneProduto(produtosOfc[i].id_produto);

    // AVALIAÇÃO
    avg_avalia = await produtosDAO.getAvgAvalia(produtosOfc[i].id_produto);
    if (avg_avalia[0].media_avaliacao == null) {
      avg_avalia[0].media_avaliacao = 5
    }
    media_avaliacao = avg_avalia[0].media_avaliacao.toFixed(1);
    // console.log(media_avaliacao)
    produtosOfc[i].media_avaliacao = media_avaliacao;
    // arrMotos.push(produto[0]);
  }




  // TODOS OS PRODUTOS DE MOTO
  produtosOfcCategoria = await produtosDAO.getProdutoOfc(oficina[0].cnpj_oficina)
  let arrMotos = [];
  let resultsMoto = [];
  let produtosTipoMoto = [];
  for (let i = 0; i < produtosOfcCategoria.length; i++) {
    produtosMoto = await produtosDAO.getProdutosMotoOfc(produtosOfcCategoria[i].id_produto)
    if (produtosMoto[0] == undefined) {
      arrMotos.push(null)
    } else {
      arrMotos.push(produtosMoto[0].id_produto)
      resultsMoto = arrMotos.filter(element => {
        return element !== null;
      });
    }
  }

  for (let j = 0; j < resultsMoto.length; j++) {
    resultsMoto2 = await produtosDAO.getProduto(resultsMoto[j]);
    // console.log(resultsMoto);
    produtosTipoMoto.push(resultsMoto2[0])

    // AVALIAÇÃO
    avg_avalia = await produtosDAO.getAvgAvalia(produtosTipoMoto[j].id_produto);
    if (avg_avalia[0].media_avaliacao == null) {
      avg_avalia[0].media_avaliacao = 5
    }
    media_avaliacao = avg_avalia[0].media_avaliacao.toFixed(1);
    produtosTipoMoto[j].media_avaliacao = media_avaliacao;
  }




  // TODOS OS PRODUTOS DE CARRO
  produtosOfcCategoria = await produtosDAO.getProdutoOfc(oficina[0].cnpj_oficina)
  let arrCarros = [];
  let resultsCarro = [];
  let produtosTipoCarro = [];
  for (let i = 0; i < produtosOfcCategoria.length; i++) {
    produtosCarro = await produtosDAO.getProdutosCarroOfc(produtosOfcCategoria[i].id_produto)
    if (produtosCarro[0] == undefined) {
      arrCarros.push(null)
    } else {
      arrCarros.push(produtosCarro[0].id_produto)
      resultsCarro = arrCarros.filter(element => {
        return element !== null;
      });
    }
  }

  for (let j = 0; j < resultsCarro.length; j++) {
    resultsCarro2 = await produtosDAO.getProduto(resultsCarro[j]);
    // console.log(resultsCarro2);
    produtosTipoCarro.push(resultsCarro2[0])

    // AVALIAÇÃO
    avg_avalia = await produtosDAO.getAvgAvalia(produtosTipoCarro[j].id_produto);
    if (avg_avalia[0].media_avaliacao == null) {
      avg_avalia[0].media_avaliacao = 5
    }
    media_avaliacao = avg_avalia[0].media_avaliacao.toFixed(1);
    produtosTipoCarro[j].media_avaliacao = media_avaliacao;
  }




  // TODOS OS PRODUTOS DE VAN
  produtosOfcCategoria = await produtosDAO.getProdutoOfc(oficina[0].cnpj_oficina)
  let arrVans = [];
  let resultsVan = [];
  let produtosTipoVan = [];
  for (let i = 0; i < produtosOfcCategoria.length; i++) {
    produtosVan = await produtosDAO.getProdutosVanOfc(produtosOfcCategoria[i].id_produto)
    if (produtosVan[0] == undefined) {
      arrVans.push(null)
    } else {
      arrVans.push(produtosVan[0].id_produto)
      resultsVan = arrVans.filter(element => {
        return element !== null;
      });
    }
  }

  for (let j = 0; j < resultsVan.length; j++) {
    resultsVan2 = await produtosDAO.getProduto(resultsVan[j]);
    // console.log(resultsVan2);
    produtosTipoVan.push(resultsVan2[0])

    // AVALIAÇÃO
    avg_avalia = await produtosDAO.getAvgAvalia(produtosTipoVan[j].id_produto);
    if (avg_avalia[0].media_avaliacao == null) {
      avg_avalia[0].media_avaliacao = 5
    }
    media_avaliacao = avg_avalia[0].media_avaliacao.toFixed(1);
    produtosTipoVan[j].media_avaliacao = media_avaliacao;
  }




  // TODOS OS PRODUTOS DE CAMINHÃO
  produtosOfcCategoria = await produtosDAO.getProdutoOfc(oficina[0].cnpj_oficina)
  let arrCaminhoes = [];
  let resultsCaminhao = [];
  let produtosTipoCaminhao = [];
  for (let i = 0; i < produtosOfcCategoria.length; i++) {
    produtosCaminhao = await produtosDAO.getProdutosCaminhaoOfc(produtosOfcCategoria[i].id_produto)
    if (produtosCaminhao[0] == undefined) {
      arrCaminhoes.push(null)
    } else {
      arrCaminhoes.push(produtosCaminhao[0].id_produto)
      resultsCaminhao = arrCaminhoes.filter(element => {
        return element !== null;
      });
    }
  }

  for (let j = 0; j < resultsCaminhao.length; j++) {
    resultsCaminhao2 = await produtosDAO.getProduto(resultsCaminhao[j]);
    // console.log(resultsCaminhao2);
    produtosTipoCaminhao.push(resultsCaminhao2[0])

    // AVALIAÇÃO
    avg_avalia = await produtosDAO.getAvgAvalia(produtosTipoCaminhao[j].id_produto);
    if (avg_avalia[0].media_avaliacao == null) {
      avg_avalia[0].media_avaliacao = 5
    }
    media_avaliacao = avg_avalia[0].media_avaliacao.toFixed(1);
    produtosTipoCaminhao[j].media_avaliacao = media_avaliacao;
  }




  // TODOS OS PRODUTOS DE BICICLETA
  produtosOfcCategoria = await produtosDAO.getProdutoOfc(oficina[0].cnpj_oficina)
  let arrBicicletas = [];
  let resultsBicicleta = [];
  let produtosTipoBicicleta = [];
  for (let i = 0; i < produtosOfcCategoria.length; i++) {
    produtosBicicleta = await produtosDAO.getProdutosBicicletaOfc(produtosOfcCategoria[i].id_produto)
    if (produtosBicicleta[0] == undefined) {
      arrBicicletas.push(null)
    } else {
      arrBicicletas.push(produtosBicicleta[0].id_produto)
      resultsBicicleta = arrBicicletas.filter(element => {
        return element !== null;
      });
    }
  }

  for (let j = 0; j < resultsBicicleta.length; j++) {
    resultsBicicleta2 = await produtosDAO.getProduto(resultsBicicleta[j]);
    // console.log(resultsBicicleta2);
    produtosTipoBicicleta.push(resultsBicicleta2[0])

    // AVALIAÇÃO
    avg_avalia = await produtosDAO.getAvgAvalia(produtosTipoBicicleta[j].id_produto);
    if (avg_avalia[0].media_avaliacao == null) {
      avg_avalia[0].media_avaliacao = 5
    }
    media_avaliacao = avg_avalia[0].media_avaliacao.toFixed(1);
    produtosTipoBicicleta[j].media_avaliacao = media_avaliacao;
  }


  autenticado = req.session.autenticado
  res.render('pages/produtos_oficina', { oficina, produtos: produtosOfc, autenticado, arrMotos: produtosTipoMoto, arrCarros: produtosTipoCarro, arrVans: produtosTipoVan, arrCaminhoes: produtosTipoCaminhao, arrBicicletas: produtosTipoBicicleta })
})



router.get('/servicos/:nome_tela', async function(req, res){
  nomeTela = req.params;
  oficina = await oficinasDAO.getOneOficina(nomeTela.nome_tela);
  // console.log(oficina)
  // TODOS OS SERVICOS
  servicosOfc = await produtosDAO.getServicoOfc(oficina[0].cnpj_oficina);

  autenticado = req.session.autenticado;
  res.render('pages/servicos_oficina', {oficina, servicosOfc, autenticado})
})

router.post('/deletar/:id_produto', async function(req, res){
  // console.log(req.params)
  tipo_produto = await produtosDAO.getTipoProduto(req.params.id_produto);

  results1 = await produtosDAO.deleteProdutoAtuacao(req.params.id_produto);
  results2 = await produtosDAO.deleteProduto(req.params.id_produto);

  // console.log(tipo_produto)
  if(tipo_produto[0].tipo_do_produto == 1){
    res.redirect('/seus-produtos')
  } else {
    res.redirect('/seus-servicos')
  }
})

module.exports = router;