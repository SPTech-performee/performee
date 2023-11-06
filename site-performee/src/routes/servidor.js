var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");

router.get("/selecionarTudo", function (req, res) {
    servidorController.selecionarTudo(req, res);
});

router.post("/cadastrar", function (req, res) {
    servidorController.cadastrar(req, res);
});

router.get("/selecionarDadosGerais/:ipServidor", function (req, res) {
    servidorController.selecionarDadosGerais(req, res);
})

module.exports = router;