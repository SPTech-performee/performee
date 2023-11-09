const { response } = require("express");
var componenteModel = require("../models/componenteModel");

function selecionarTudo(req, res) {
    componenteModel.selecionarTudo()
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

    function deletarComponente(req, res) {

        var tipo = req.body.tipoServer;
        var id = req.body.idEmpServer;
      
         componenteModel.deletarComponente(tipo,id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
      }

module.exports = {
    selecionarTudo,
    deletarComponente
}