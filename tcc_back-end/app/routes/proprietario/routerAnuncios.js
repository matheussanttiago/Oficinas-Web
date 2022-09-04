const express = require('express');
const router = express.Router();
var async = require('async');
const bcrypt = require('bcryptjs');
const multer = require('multer');


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


//cria ume espaço de armazenamento em memória
const armazenamentoMemoria = multer.memoryStorage()
//adiciona este espaço ao método de upload
const upload = multer({
  storage: armazenamentoMemoria,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
})

router.post('/cad_produto', upload.array('add-img'), async (req, res) => {
  // if (!req.file) {
  //   console.log("Falha no carregamento");
  // } else {
  let content = [null, null, null, null, null, null]
  for (let i = 0; i < req.files.length; i++) {
    content[i] = req.files[i].buffer.toString('base64');
  }
  var dadosForm = {
    nome_produto: req.body.nome_produto,
    valor_produto: req.body.valor_produto,
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



//cria ume espaço de armazenamento em memória
const armazenamentoMemoria2 = multer.memoryStorage()
//adiciona este espaço ao método de upload
const upload2 = multer({ 
  storage: armazenamentoMemoria2,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
} })

router.post('/cad_servico', upload2.array('add-img'), async (req, res) => {
  let content = [null, null, null, null, null, null]
  for (let i = 0; i < req.files.length; i++) {
    content[i] = req.files[i].buffer.toString('base64');
  }

  var dadosForm = {
    nome_produto: req.body.nome_produto,
    valor_produto: req.body.valor_produto,
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