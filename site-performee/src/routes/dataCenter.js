var express = require("express");
var router = express.Router();

var dataCenterController = require("../controllers/dataCenterController");

router.get("/selecionarTudo", function (req, res) {
    dataCenterController.selecionarTudo(req, res);
});

router.post("/cadastrar", function (req, res) {
    dataCenterController.cadastrar(req, res);
});

router.post("/editar", function (req, res) {
    dataCenterController.editar(req, res);
});

router.get("/buscarUltimoDC", function (req, res) {
    dataCenterController.buscarUltimoDC(req, res);
});

router.get("/selecionarDadosGerais/:idDataCenter", function (req, res) {
    dataCenterController.selecionarDadosGerais(req, res);
});

router.get("/exibirDadosEspecificosDC/:idDataCenter", function (req, res) {
    dataCenterController.exibirDadosEspecificosDC(req, res);
});

router.post("/deletarDataCenter", function (req, res) {
    dataCenterController.deletarDataCenter(req, res);
});

module.exports = router;