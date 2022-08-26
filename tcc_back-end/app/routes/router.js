const express = require('express');
const router = express.Router();
var async = require('async');
const bcrypt = require('bcryptjs');

const DbConnection = require('../../config/DbConnection');
var conexao = DbConnection();

var CadastroDAO = require("../models/cadastroDAO");
cadastroDAO = new CadastroDAO(conexao);

var ProdutosDAO = require("../models/produtosDAO");
produtosDAO = new ProdutosDAO(conexao);


router.get('/', function(req, res) {
  // DbConnection.connection().query(
  //   "SELECT * FROM Oficina",
  //   function (error, results, fields) {
  //     if (error) throw error;
  //     res.render('pages/index', {dados_oficina: results});
  //     console.log(results)
  //   },
  // );
  async.parallel([
    function(callback) {
        var queryData = '' +
        'SELECT * FROM oficina';
        // DbConnection.connection().query(queryData, function (err, rows1) {
        conexao.query(queryData, function (err, rows1) {

            if (err) {
                return callback(err);
            }
            return callback(null, rows1);
        });
    },
    function(callback) {
      // DbConnection.connection().query('SELECT * FROM produto', function (err, rows2) {
      conexao.query('SELECT * FROM produto', function (err, rows2) {
            if (err) {
                return callback(err);
            }
            return callback(null, rows2);
        });
    }
], function(error, callbackResults) {
    if (error) {
        //handle error
        console.log(error);
    } else {
        console.log(callbackResults[0]); // rows1
        console.log(callbackResults[1]); // rows2
        // use this data to send back to client etc.
        res.render('pages/index', {dados_oficina: callbackResults[0], dados_produto: callbackResults[1]});
    }
});

});

router.get('/avaliacao', function(req, res) {
  res.render('pages/avaliacao');
});
router.get('/planos', function(req, res) {
  res.render('pages/planos');
});
router.get('/cadastro', function(req, res) {
  res.render('pages/cad_visitante');
});
router.get('/seus-servicos', function(req, res) {
  res.render('pages/servicos');
});
router.get('/add-produto', function(req, res) {
  res.render('pages/add_produto');
});
router.get('/add-oficina', function(req, res) {
  res.render('pages/cad_oficina');
});
router.get('/dashboard', function(req, res) {
  if (req.session.autenticado == true && req.session.usu_tipo == 2) {
    autenticado = { autenticado: req.session.usu_autenticado };
    res.render("pages/adm", autenticado);
  } else {
    res.send('Área restrita')
  }
});


router.post('/add_oficina', (req, res) => {
  var dadosForm = {
    Facebook: req.body.Facebook,
    Cep: req.body.Cep,
    Email: req.body.Email,
    Celular_telefone: req.body.Celular_telefone,
    horario_funcionamento: req.body.horario_funcionamento,
    Nome_oficina: req.body.Nome_oficina,
    descricao: req.body.descricao,
    Instagram: req.body.Instagram,
    Avaliacao: req.body.Avaliacao,
    Especialidade: req.body.Especialidade,
    numero_casa: req.body.numero_casa,
    Cnpj: req.body.Cnpj,
  };
  
  DbConnection.connection().query(
    "INSERT INTO Oficina SET ?",
    dadosForm,
    function (error, results, fields) {
      if (error) throw error;
      // Neat!
    }
  );

  res.redirect("/");
})


// router.post('/cad_visitante', async (req, res) => {
//   const DbConnection = require('../../config/DbConnection');
//   const bcrypt = require('bcryptjs');

//   try {
//       const hashedPassword = await bcrypt.hash(req.body.senha, 10)
//       DbConnection.connection().query(`insert into visitante(nome, e_mail_vist, telefone_visitante, senha, foto, tipo_usuario) 
//       values ('${req.body.nome_visitante}', 
//         '${req.body.email}', '${req.body.celular_visitante}', '${hashedPassword}',  null, '1')`)
//       res.redirect('/login')

//   } catch(e) {

//       console.log(e);
//       res.status(500).send('Something broke!')

//   }
// })


router.post('/cad_servico', async (req, res) => {
  var dadosForm = {
    nome_produto: req.body.nome_servico,
    valor_produto: req.body.valor_servico,
    caracterisiticas: req.body.carac_servico,
    descricao_prod: req.body.desc_servico,
    tipo_do_produto: '2',
    foto1: null,
    foto2: null,
    foto3: null,
    foto4: null,
    foto5: null,
    foto6: null,
  };
  
  try {
    results = await produtosDAO.CadProduto(dadosForm); 
    res.redirect('/seus-servicos')
  } catch(e) {

      console.log(e);
      res.status(500).send('Something broke!')

  }
})

router.post('/cad_visitante', async (req, res) => {
  var dadosForm = {
    nome: req.body.nome_visitante,
    e_mail_vist: req.body.email,
    telefone_visitante: req.body.celular_visitante,
    senha: await bcrypt.hash(req.body.senha, 10),
    foto: null,
    tipo_usuario: '1'
  };

  try {
    results = await cadastroDAO.CadVisitante(dadosForm); 
    res.redirect('/login')
  } catch(e) {

      console.log(e);
      res.status(500).send('Something broke!')

  }
})

router.post('/cad_juridica', async (req, res) => {
  var dadosForm = {
    nome_proprietario: req.body.nome_proprietario,
    e_mail_pop: req.body.email,
    cpf: req.body.cpf,
    telefone: req.body.celular_proprietario,
    senha: await bcrypt.hash(req.body.senha, 10),
    foto: null,
    tipo_usuario: '2'
  };

  try {
    results = await cadastroDAO.CadProprietario(dadosForm); 
    res.redirect('/login')
  } catch(e) {

      console.log(e);
      res.status(500).send('Something broke!')

  }
})

module.exports = router;