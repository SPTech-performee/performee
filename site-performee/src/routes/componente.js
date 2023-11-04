var express = require("express");
var router = express.Router();

var componenteController = require("../controllers/componenteController");

router.get("/selecionarTudo", function (req, res) {
    componenteController.selecionarTudo(req, res);
});

module.exports = router;