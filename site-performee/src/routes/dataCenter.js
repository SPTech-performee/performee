var express = require("express");
var router = express.Router();

var dataCenterController = require("../controllers/dataCenterController");

router.get("/selecionarTudo", function (req, res) {
    dataCenterController.selecionarTudo(req, res);
});

router.post("/cadastrar", function (req, res) {
    dataCenterController.cadastrar(req, res);
})

router.get("/buscarUltimoDC", function (req, res) {
    dataCenterController.buscarUltimoDC(req, res);
});

module.exports = router;