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


router.get('/seus-produtos', function(req, res) {
  res.render('pages/produtos');
});


//cria ume espaço de armazenamento em memória
const armazenamentoMemoria = multer.memoryStorage()
//adiciona este espaço ao método de upload
const upload2 = multer({ 
  storage: armazenamentoMemoria,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
} })

router.post('/cad_produto', upload2.any(), async (req, res) => {
  var dadosForm = {
    nome_produto: req.body.nome_produto,
    valor_produto: req.body.valor_produto,
    caracterisiticas: req.body.carac_produtos,
    descricao_prod: req.body.desc_produtos,
    tipo_do_produto: '1',
    foto1: null,
    foto2: null,
    foto3: null,
    foto4: null,
    foto5: null,
    foto6: null,
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