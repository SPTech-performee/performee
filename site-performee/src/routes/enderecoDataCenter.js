var express = require("express");
var router = express.Router();

var enderecoDataCenterController = require("../controllers/enderecoDataCenterController");

router.get("/selecionarTudo", function (req, res) {
    enderecoDataCenterController.selecionarTudo(req, res);
});

router.post("/cadastrar", function (req, res) {
    enderecoDataCenterController.cadastrar(req, res);
});

router.post("/editar", function (req, res) {
    enderecoDataCenterController.editar(req, res);
});

router.post("/deletarEnderecoDataCenter", function (req, res) {
    enderecoDataCenterController.deletarEnderecoDataCenter(req, res);
});

module.exports = router;