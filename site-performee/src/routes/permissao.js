var express = require("express");
var router = express.Router();

var permissaoController = require("../controllers/permissaoController");

router.get("/selecionarTudo", function (req, res) {
    permissaoController.selecionarTudo(req, res);
});

module.exports = router;