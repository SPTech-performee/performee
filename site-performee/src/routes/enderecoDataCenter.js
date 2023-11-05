var express = require("express");
var router = express.Router();

var enderecoDataCenterController = require("../controllers/enderecoDataCenterController");

router.get("/selecionarTudo", function (req, res) {
    enderecoDataCenterController.selecionarTudo(req, res);
});

router.post("/cadastrar", function (req, res) {
    enderecoDataCenterController.cadastrar(req, res);
})

module.exports = router;