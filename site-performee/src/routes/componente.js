var express = require("express");
var router = express.Router();

var componenteController = require("../controllers/componenteController");

router.get("/selecionarTudo", function (req, res) {
    componenteController.selecionarTudo(req, res);
});

router.post("/deletarComponente", function (req, res) {
    componenteController.deletarComponente(req, res);
  });

module.exports = router;