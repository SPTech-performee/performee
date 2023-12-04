var express = require("express");
var router = express.Router();

var leituraController = require("../controllers/leituraController");

router.get("/selecionarTudo", function (req, res) {
  leituraController.selecionarTudo(req, res);
});

router.post("/deletarLeitura", function (req, res) {
  leituraController.deletarLeitura(req, res);
});

router.get("/ultimasLeiturasCpu/:ipServidor", function (req, res) {
  leituraController.ultimasLeiturasCpu(req, res);
});

router.get("/leituraMaisRecenteCpu/:ipServidor", function (req, res) {
  leituraController.leituraMaisRecenteCpu(req, res);
});

router.get("/ultimasLeiturasGpu/:ipServidor", function (req, res) {
  leituraController.ultimasLeiturasGpu(req, res);
});

router.get("/leituraMaisRecenteGpu/:ipServidor", function (req, res) {
  leituraController.leituraMaisRecenteGpu(req, res);
});

router.get("/ultimasLeiturasRam/:ipServidor", function (req, res) {
  leituraController.ultimasLeiturasRam(req, res);
});

router.get("/leituraMaisRecenteRam/:ipServidor", function (req, res) {
  leituraController.leituraMaisRecenteRam(req, res);
});

router.get("/leituraUsoRamPerHora/:ipServidor", function (req, res) {
  leituraController.leituraUsoRamPerHora(req, res);
});

router.get("/ultimasLeiturasDisco/:ipServidor", function (req, res) {
  leituraController.ultimasLeiturasDisco(req, res);
});

router.get("/leituraMaisRecenteDisco/:ipServidor", function (req, res) {
  leituraController.leituraMaisRecenteDisco(req, res);
});

router.get("/ultimasLeiturasRede/:ipServidor", function (req, res) {
  leituraController.ultimasLeiturasRede(req, res);
});

router.get("/leituraMaisRecenteRede/:ipServidor", function (req, res) {
  leituraController.leituraMaisRecenteRede(req, res);
});

router.get("/leituraComparacaoUpDownPerDia/:ipServidor", function (req, res) {
  leituraController.leituraComparacaoUpDownPerDia(req, res);
});

module.exports = router;