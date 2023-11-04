var express = require("express");
var router = express.Router();

var uniMedidaController = require("../controllers/uniMedidaController");

router.get("/selecionarTudo", function (req, res) {
    uniMedidaController.selecionarTudo(req, res);
});

module.exports = router;