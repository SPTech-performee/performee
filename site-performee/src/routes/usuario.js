var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/selecionarTudo", function (req, res) {
    usuarioController.selecionarTudo(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
  });

  router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

module.exports = router;