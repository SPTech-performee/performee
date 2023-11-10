const { response } = require("express");
var leituraModel = require("../models/leituraModel");

function selecionarTudo(req, res) {
    leituraModel.selecionarTudo()
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

function deletarLeitura(req, res) {
   
    var tipo = req.body.tipoServer;
    var id = req.body.idEmpServer;
  
    leituraModel.deletarLeitura(tipo, id)
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
    deletarLeitura
}