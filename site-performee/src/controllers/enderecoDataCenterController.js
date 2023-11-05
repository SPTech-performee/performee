const { response } = require("express");
var enderecoDataCenterModel = require("../models/enderecoDataCenterModel");

function selecionarTudo(req, res) {
    enderecoDataCenterModel.selecionarTudo()
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

    function cadastrar(req, res) {
        
        var pais = req.body.paisServer;
        var estado = req.body.estadoServer;
        var cidade = req.body.cidadeServer;
        var cep = req.body.cepServer;
        var bairro = req.body.bairroServer;
        var numero = req.body.numeroServer;
        var complemento = req.body.complementoServer;
        var fkDataCenter = req.body.fkDataCenterServer;
        
            enderecoDataCenterModel.cadastrar(pais, estado, cidade, cep, bairro, numero, complemento, fkDataCenter)
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
    cadastrar
}