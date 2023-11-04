var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

router.get("/selecionarTudo", function (req, res) {
    alertaController.selecionarTudo(req, res);
});

module.exports = router;