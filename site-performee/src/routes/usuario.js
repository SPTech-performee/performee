var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/selecionarTudo", function (req, res) {
  usuarioController.selecionarTudo(req, res);
});

router.get("/selecionarTudoPerEmpresa/:idEmpresa", function (req, res) {
  usuarioController.selecionarTudoPerEmpresa(req, res);
});

router.post("/autenticar", function (req, res) {
  usuarioController.autenticar(req, res);
});

router.post("/cadastrar", function (req, res) {
  usuarioController.cadastrar(req, res);
});

router.post("/editar", function (req, res) {
  usuarioController.editar(req, res);
});

router.get("/selecionarDadosGerais/:idColaborador", function (req, res) {
  usuarioController.selecionarDadosGerais(req, res);
});

router.get("/buscarDadosEmpresaPermissao/:idColaborador", function (req, res) {
  usuarioController.buscarDadosEmpresaPermissao(req, res);
});

router.post("/editarNome", function (req, res) {
  usuarioController.editarNome(req, res);
});

router.post("/editarEmail", function (req, res) {
  usuarioController.editarEmail(req, res);
});

router.post("/editarCpf", function (req, res) {
  usuarioController.editarCpf(req, res);
});

router.post("/editarCargo", function (req, res) {
  usuarioController.editarCargo(req, res);
});

router.post("/deletar", function (req, res) {
  usuarioController.deletar(req, res);
});

router.post("/deletarUsuario", function (req, res) {
  usuarioController.deletarUsuario(req, res);
});

module.exports = router;