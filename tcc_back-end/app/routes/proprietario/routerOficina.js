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

var PlanosDAO = require("../../models/planosDAO");
planosDAO = new PlanosDAO(conexao);


router.get('/add-oficina', function (req, res) {
  res.render('pages/criar_oficinas', { cadastrado: false });
  console.log(req.session)
});


router.post('/cad_oficina', upload.fields([{ name: 'add-img-pp', maxCount: 1 }, { name: 'add_img', maxCount: 6 }]), async (req, res) => {

  let content = [null, null, null, null, null, null]
  for (let i = 0; i < req.files['add_img'].length; i++) {
    content[i] = req.files['add_img'][i].buffer.toString('base64');
  }

  if (!req.files['add-img-pp']) {
    filePerfil = null;
  } else {
    filePerfil = req.files['add-img-pp'][0].buffer.toString('base64');
  }
  // console.log(req.files['add-img-pp'])
  // console.log(req.files['add_img'])

  let cnpj = req.body.cnpj_oficina;
  let cnpjBD = cnpj.replace('.', '').replace('.', '').replace('/', '').replace('-', '');

  let cep = req.body.cep;
  let cepBD = cep.replace('-', '');

  let telefone = req.body.phone_oficina
  let telefoneBD = telefone.replace('(', '').replace(')', '').replace('-', '')

  let celular = req.body.wpp_oficina
  let celularBD = celular.replace('(', '').replace(')', '').replace('-', '')

  // const teste = req.files['add_img'][2]
  // console.log(teste)

  var userId
  if (req.session.usu_id) {
    userId = req.session.usu_id;
  } else {
    userId = req.session.id_prop
  }
  var dadosForm = {
    id_prop: userId,
    cnpj_oficina: cnpjBD,
    email_oficina: req.body.email_oficina,
    nome_oficina: req.body.nome_oficina,
    nome_tela: req.body.nome_tela,
    cep: cepBD,
    numero_ofc: req.body.num_oficina,
    telefone: telefoneBD,
    celular: celularBD,
    horario_funcionamento: req.body.horario_oficina,
    descricao_ofc: req.body.desc_oficina,
    instagram: req.body.link_insta,
    facebook: req.body.link_face,
    foto_perfil_ofc: filePerfil,
    foto1: content[0],
    foto2: content[1],
    foto3: content[2],
    foto4: content[3],
    foto5: content[4],
    foto6: content[5],
  };



  // console.log(req.body.carro);
  try {
    // CADASTRO DE OFICINA
    results = await oficinasDAO.CadOficina(dadosForm);

    // ADICIONANDO CATEGORIA
    if (req.body.moto == 'on') {
      var dadosCategoria = {
        tipo_veiculo_id: 1,
        cnpj_oficina: cnpjBD
      }
      addCategoria = await oficinasDAO.addCategoria(dadosCategoria)
    }
    if (req.body.carro == 'on') {
      var dadosCategoria = {
        tipo_veiculo_id: 2,
        cnpj_oficina: cnpjBD
      }
      addCategoria = await oficinasDAO.addCategoria(dadosCategoria)
    }
    if (req.body.van == 'on') {
      var dadosCategoria = {
        tipo_veiculo_id: 3,
        cnpj_oficina: cnpjBD
      }
      addCategoria = await oficinasDAO.addCategoria(dadosCategoria)
    }
    if (req.body.caminhao == 'on') {
      var dadosCategoria = {
        tipo_veiculo_id: 4,
        cnpj_oficina: cnpjBD
      }
      addCategoria = await oficinasDAO.addCategoria(dadosCategoria)
    }
    if (req.body.bicicleta == 'on') {
      var dadosCategoria = {
        tipo_veiculo_id: 5,
        cnpj_oficina: cnpjBD
      }
      addCategoria = await oficinasDAO.addCategoria(dadosCategoria)
    }

    // SALVANDO CNPJ NA SESSÃO
    req.session.cnpj = cnpjBD;
    req.session.nomeTela = req.body.nome_tela;
    oficinaProp = await oficinasDAO.getOficinaProp(req.session.id_prop);
    console.log(req.session)
    res.render('pages/planos', { cadastrado: true, oficinaProp });
  } catch (e) {

    console.log(e);
    res.status(500).send('Something broke!')

  }
});


// PLANOS
router.post('/default', async (req, res) => {
  try {
    cnpjBD = req.session.cnpj;
    results = await planosDAO.CadPlanoBasico(cnpjBD);
    nomeTela = req.session.nomeTela;
    var dadosOficina = await oficinasDAO.getOneOficina(nomeTela);
    console.log(dadosOficina)

    req.session.cnpj_oficina = dadosOficina[0].cnpj_oficina

    res.redirect(`/dashboard/${nomeTela}`);
  } catch (error) {
    console.log(error)
  }
})

router.post('/basico', async (req, res) => {
  try {
    let cnpjBD;
    if (req.session.cnpj) {
      cnpjBD = req.session.cnpj;
    } else {
      cnpjBD = req.session.cnpj_oficina;
    }
    results = await planosDAO.CadPlanoBasico(cnpjBD);
    nomeTela = req.session.nomeTela;
    res.render('pages/forma_pagamento', { plano: 'basico', nomeTela });
  } catch (error) {
    console.log(error)
  }
})

router.post('/prata', async (req, res) => {
  try {
    let cnpjBD;
    if (req.session.cnpj) {
      cnpjBD = req.session.cnpj;
    } else {
      cnpjBD = req.session.cnpj_oficina;
    }
    results = await planosDAO.CadPlanoPrata(cnpjBD);
    nomeTela = req.session.nomeTela;
    res.render('pages/forma_pagamento', { plano: 'prata', nomeTela });
  } catch (error) {
    console.log(error)
  }
})

router.post('/ouro', async (req, res) => {
  try {
    let cnpjBD;
    if (req.session.cnpj) {
      cnpjBD = req.session.cnpj;
    } else {
      cnpjBD = req.session.cnpj_oficina;
    }
    results = await planosDAO.CadPlanoOuro(cnpjBD);
    nomeTela = req.session.nomeTela;
    res.render('pages/forma_pagamento', { plano: 'ouro', nomeTela });
  } catch (error) {
    console.log(error)
  }
})

router.post('/dima', async (req, res) => {
  try {
    let cnpjBD;
    if (req.session.cnpj) {
      cnpjBD = req.session.cnpj;
    } else {
      cnpjBD = req.session.cnpj_oficina;
    }
    results = await planosDAO.CadPlanoDima(cnpjBD);
    nomeTela = req.session.nomeTela;
    res.render('pages/forma_pagamento', { plano: 'diamante', nomeTela });
  } catch (error) {
    console.log(error)
  }
})



// DASHBOARD
router.get('/dashboard/:nome_tela', async function (req, res) {
  var nomeTela = req.params;
  console.log(nomeTela)
  var dadosOficina = await oficinasDAO.getOneOficina(nomeTela.nome_tela);
  console.log(dadosOficina)


  produtosOfc = await produtosDAO.getProdutosOfc(dadosOficina[0].cnpj_oficina);
  // console.log(produtosOfc)
  let media_geral = []

  // ADICIONANDO AVALIAÇÕES
  for (let k = 0; k < produtosOfc.length; k++) {
    avaliacaoProd = await produtosDAO.getAvaliacaoProd(produtosOfc[k].id_produto);
    if (avaliacaoProd == undefined || avaliacaoProd.media_avaliacao == null) {
      if (avaliacaoProd[0].media_avaliacao == null) {
        media_geral.push(5)
      } else {
        media_geral.push(avaliacaoProd[0].media_avaliacao)
      }
    } else {
      media_geral.push(avaliacaoProd.media_avaliacao);
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

  dadosOficina[0].avg_media_geral = avg_media_geral.toFixed(1);
  // }

  req.session.cnpj_oficina = dadosOficina[0].cnpj_oficina
  // VARIÁVEIS DE SESSÃO
  req.session.nomeTela = nomeTela.nome_tela
  autenticado = req.session.autenticado;
  email = req.session.usu_autenticado;
  nome = req.session.usu_nome;
  tipo_usuario = req.session.usu_tipo;
  id_usu = req.session.usu_id
  cnpj = req.session.cnpj_oficina
  let buff = req.session.usu_foto

  console.log(cnpj)

  console.log(req.session)

  res.render('pages/dashboard', { oficina: dadosOficina, buff, cnpj, produtoCad: false, servicoCad: false });
})

module.exports = router;