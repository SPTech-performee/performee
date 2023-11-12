var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

router.get("/selecionarTudo", function (req, res) {
    alertaController.selecionarTudo(req, res);
});

router.get("/selecionarAlertasPerEstado", function (req, res) {
    alertaController.selecionarAlertasPerEstado(req, res);
});

router.post("/deletarAlerta", function (req, res) {
    alertaController.deletarAlerta(req, res);
});

router.get("/exibirTodosLogs/:condicao", function (req, res) {
    alertaController.exibirTodosLogs(req, res);
});

router.get("/exibirLogsPerDCenter/:idDataCenter/:condicao", function (req, res) {
    alertaController.exibirLogsPerDCenter(req, res);
});

module.exports = router;