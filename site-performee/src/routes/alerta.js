var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

router.get("/selecionarTudo", function (req, res) {
    alertaController.selecionarTudo(req, res);
});

router.get("/selecionarAlertasPerEstado", function (req, res) {
    alertaController.selecionarAlertasPerEstado(req, res);
});

router.get("/selecionarAlertasPerEstadoPerEmpresa/:idEmpresa", function (req, res) {
    alertaController.selecionarAlertasPerEstadoPerEmpresa(req, res);
});

router.post("/deletarAlerta", function (req, res) {
    alertaController.deletarAlerta(req, res);
});

router.get("/exibirTodosLogs/:condicao", function (req, res) {
    alertaController.exibirTodosLogs(req, res);
});

router.get("/exibirTodosLogsPerEmpresa/:condicao", function (req, res) {
    alertaController.exibirTodosLogsPerEmpresa(req, res);
});

router.get("/exibirLogsPerDCenter/:idDataCenter/:condicao", function (req, res) {
    alertaController.exibirLogsPerDCenter(req, res);
});

router.get("/exibirQtdStatusPerDCenter/:idDataCenter/", function (req, res) {
    alertaController.exibirQtdStatusPerDCenter(req, res);
});

router.get("/qtdServerInstavel", function (req, res) {
    alertaController.qtdServerInstavel(req, res);
});

router.get("/qtdServerInstavelPerEmpresa/:idEmpresa", function (req, res) {
    alertaController.qtdServerInstavel(req, res);
});

module.exports = router;