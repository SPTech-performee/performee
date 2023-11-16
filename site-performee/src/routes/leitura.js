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

module.exports = router;