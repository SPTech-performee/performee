var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/selecionarTudo", function (req, res) {
    usuarioController.selecionarTudo(req, res);
});

module.exports = router;