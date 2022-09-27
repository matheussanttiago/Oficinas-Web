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
  res.render('pages/criar_oficinas');
  console.log(req.session)
});


router.post('/cad_oficina', upload.fields([{name: 'add-img-pp', maxCount:1}, {name: 'add_img', maxCount:6}]), async (req, res) => {
  
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

  var dadosForm = {
    id_prop: req.session.id_prop,
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

  try {
    results = await oficinasDAO.CadOficina(dadosForm); 

    req.session.cnpj = cnpjBD;
    res.redirect('/planos');
  } catch(e) {

      console.log(e);
      res.status(500).send('Something broke!')

  }
});


// PLANOS
router.post('/basico', async (req, res) => {
  try {
    cnpjBD = req.session.cnpj;
    results = await planosDAO.CadPlanoBasico(cnpjBD); 
    res.redirect('/pagamento');
  } catch (error) {
    console.log(error)
  }
})

router.post('/prata', async (req, res) => {
  try {
    cnpjBD = req.session.cnpj;
    results = await planosDAO.CadPlanoPrata(cnpjBD); 
    res.redirect('/pagamento');
  } catch (error) {
    console.log(error)
  }
})

router.post('/ouro', async (req, res) => {
  try {
    cnpjBD = req.session.cnpj;
    results = await planosDAO.CadPlanoOuro(cnpjBD); 
    res.redirect('/pagamento');
  } catch (error) {
    console.log(error)
  }
})

router.post('/dima', async (req, res) => {
  try {
    cnpjBD = req.session.cnpj;
    results = await planosDAO.CadPlanoDima(cnpjBD); 
    res.redirect('/pagamento');
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;