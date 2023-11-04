var express = require("express");
var router = express.Router();

var leituraController = require("../controllers/leituraController");

router.get("/selecionarTudo", function (req, res) {
    leituraController.selecionarTudo(req, res);
});

module.exports = router;