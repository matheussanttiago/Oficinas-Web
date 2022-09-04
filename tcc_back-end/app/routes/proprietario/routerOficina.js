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


router.get('/add-oficina', function (req, res) {
  res.render('pages/criar_oficinas');
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

router.post('/cad_oficina', upload2.fields([{name: 'add-img-pp', maxCount:1}, {name: 'add_img', maxCount:6}]), async (req, res) => {
  let content = [null, null, null, null, null, null]
  // for (let i = 0; i < req.files.length; i++) {
  //   content[i] = req.files[i].buffer.toString('base64');
  // }
  const teste = req.files['add-img-pp']
  console.log(teste)

  var dadosForm = {
    cnpj_oficina: req.body.cnpj_oficina,
    e_mail_oficina: req.body.email_oficina,
    nome_oficina: req.body.nome_oficina,
    cep: req.body.cep,
    numero_casa: req.body.num_oficina,
    telefone: req.body.phone_oficina,
    celular: req.body.wpp_oficina,
    horario_funcionamento: req.body.horario_oficina,
    descricao_ofc: req.body.desc_oficina,
    instagram: req.body.link_insta,
    facebook: req.body.link_face,
    area_atuacao: req.body.area_atuacao,
    foto1: content[0],
    foto2: content[1],
    foto3: content[2],
    foto4: content[3],
    foto5: content[4],
    foto6: content[5],
  };

  try {
    results = await oficinasDAO.CadOficina(dadosForm); 
    // res.redirect('/')
  } catch(e) {

      console.log(e);
      res.status(500).send('Something broke!')

  }
});

module.exports = router;