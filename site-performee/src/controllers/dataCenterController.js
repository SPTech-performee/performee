const { response } = require("express");
var dataCenterModel = require("../models/dataCenterModel");

function selecionarTudo(req, res) {
    dataCenterModel.selecionarTudo()
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(
        function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
    }

module.exports = {
    selecionarTudo
}