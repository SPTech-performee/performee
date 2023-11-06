var express = require("express");
var router = express.Router();

// Caminho para chegar no controller do administrador
var administradorController = require("../controllers/administradorController");

// Criando um caminho para o fetch com método GET (busca) no banco
router.get("/selecionarTudo", function (req, res) {

    // Utilizando o caminho para o controler, ele utiliza a função selecionarTudo no controller
    administradorController.selecionarTudo(req, res);
});

// Criando um caminho para o fetch com método POST (inserir) no banco
router.post("/autenticar", function (req, res) {

    // Utilizando o caminho para o controler, ele utiliza a função autenticar no controller
    administradorController.autenticar(req, res);
});

router.get("/selecionarDadosGerais/:idAdmin", function (req, res) {
    administradorController.selecionarDadosGerais(req, res);
  });

// Exportando a variável router para outro arquivo no site
    // Função do module export é essa
module.exports = router;