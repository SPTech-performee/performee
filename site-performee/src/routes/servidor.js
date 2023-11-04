var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");

router.get("/selecionarTudo", function (req, res) {
    servidorController.selecionarTudo(req, res);
});

module.exports = router;