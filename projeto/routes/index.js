var express = require('express');
//eu que inseri o db
var db = require('../util/db');

var router = express.Router();


/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});


//Listagem de filmes e series armazenados no banco
router.get('/listar', function (req, res) {
  db.query('select * from filmes_e_series order by ano_lancamento, titulo', (erro, resultado, fields) => {
    if (erro) {
      res.status(200).send(erro)
    }
    console.log(erro, resultado)
    res.render('lista', { lista: resultado })
  });
});

//Rota para acessar form de cadastro
router.get('/add', function (req, res) {
  res.render('form', { filme: {} });
  //para passar um parametro vazio usa a {}, assim vai carregar os dados para editar sem dar erro
});


//Rota para receber os dados do form de cadastro
router.post('/add', function (req, res) {
  // res.status(200).send(req.body)//teste joga as informações na tela
  db.query('insert into filmes_e_series(titulo, ano_lancamento) values(?, ?)', [req.body.titulo, req.body.ano],
    function (erro) {//insert só trata o erro não tem resultado
      if (erro) {
        res.status(200).send('Erro: ' + erro)
      }
      res.redirect('/listar') //se der certo volta para a tela listar
    })
});


//Rota para buscar o filme/serie para edição
router.get('/edit/:id', function (req, res) {
  db.query('select * from filmes_e_series where id = ?', [req.params.id], //params pega o dado da url
    function (erro, resultado) {
      if (erro) {
        res.status(200).send('Erro: + erro')
      }
      //res.status(200).send(resultado)
      res.render('form', { filme: resultado[0] })//vai trazer uma lista unica por isso na pos 0
    })
})

//Rota para receber os dados do form  de edição
router.post('/edit/:id', function (req, res) {
  // res.status(200).send(req.body)//teste joga as informações na tela
  db.query('update filmes_e_series set titulo = ? , ano_lancamento = ? where id = ?', [req.body.titulo, req.body.ano, req.params.id],
    function (erro) {//set só trata o erro não tem resultado
      if (erro) {
        res.status(200).send('Erro: ' + erro)
      }
      res.redirect('/listar') //se der certo volta para a tela listar
    })
});

/*
Rota para receber os dados do form  de edição
o navegador só entende post e get, tem que criar um script com java script para fazer o delete
esta na pagina da lista.ejs */
router.delete('/delete/:id', function (req, res) {
  // res.status(200).send(req.body)//teste joga as informações na tela
  db.query('delete from filmes_e_series where id = ?', [req.params.id],
    function (erro) {//set só trata o erro não tem resultado
      if (erro) {
        res.status(200).send('Erro: ' + erro)
      } else {
        res.status(200).send('OK')
      }
      //res.redirect('/listar') //se der certo volta para a tela listar
    })
});



module.exports = router;
