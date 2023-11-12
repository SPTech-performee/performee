var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");

router.get("/selecionarTudo", function (req, res) {
    servidorController.selecionarTudo(req, res);
});

router.post("/cadastrar", function (req, res) {
    servidorController.cadastrar(req, res);
});

router.post("/editar", function (req, res) {
    servidorController.editar(req, res);
});

router.get("/selecionarDadosGerais/:ipServidor", function (req, res) {
    servidorController.selecionarDadosGerais(req, res);
});

router.get("/buscarQtdAtivosDesativados", function (req, res) {
    servidorController.buscarQtdAtivosDesativados(req, res);
});

router.post("/deletarServidor", function (req, res) {
    servidorController.deletarServidor(req, res);
});

router.get("/buscarQtdAtivosDesativados", function (req, res) {
    servidorController.buscarQtdAtivosDesativados(req, res);
});

router.get("/exibirDadosGerais/:ipServidor", function (req, res) {
    servidorController.exibirDadosGerais(req, res);
});

router.get("/exibirServidoresPerDCenter/:idDataCenter", function (req, res) {
    servidorController.exibirServidoresPerDCenter(req, res);
});

module.exports = router;