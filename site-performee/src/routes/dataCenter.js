var express = require("express");
var router = express.Router();

var dataCenterController = require("../controllers/dataCenterController");

router.get("/selecionarTudo", function (req, res) {
    dataCenterController.selecionarTudo(req, res);
});

module.exports = router;