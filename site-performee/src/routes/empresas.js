var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
  empresaController.cadastrar(req, res);
});

router.get("/listarEmpresa/:idEmpresa", function (req, res) {
  empresaController.listarEmpresa(req, res);
});

router.post("/editar", function (req, res) {
  empresaController.editar(req, res);
});

router.get("/consulta", function (req, res) {
  empresaController.consulta(req, res);
});

router.get("/buscar", function (req, res) {
    empresaController.buscarPorCnpj(req, res);
});

router.get("/buscar/:id", function (req, res) {
  empresaController.buscarPorId(req, res);
});

router.get("/listar", function (req, res) {
  empresaController.listar(req, res);
});

router.get("/selecionarDadosGerais/:idEmpresa", function (req, res) {
  empresaController.selecionarDadosGerais(req, res);
});

router.post("/deletarEmpresa", function (req, res) {
  empresaController.deletarEmpresa(req, res);
});


module.exports = router;