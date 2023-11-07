const { response } = require("express");
var servidorModel = require("../models/servidorModel");

function selecionarTudo(req, res) {
    servidorModel.selecionarTudo()
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
    var hostName = req.body.nomeServerServer;
    var ipServidor = req.body.dnsServerServer;
    var sisOp = req.body.SisOpServer;
    var ativo = req.body.ativoServer;
    var fkEmpresa = req.body.fkEmpresaServerServer;
    var fkDataCenter = req.body.fkDcServer;

    if (hostName == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (ipServidor == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (sisOp == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (ativo == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        servidorModel.cadastrar(ipServidor, hostName, sisOp, ativo, fkEmpresa, fkDataCenter)
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
}

function selecionarDadosGerais(req, res) {
    var ipServidor = req.params.ipServidor;

    servidorModel.selecionarDadosGerais(ipServidor)
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

function buscarQtdAtivosDesativados(req, res) {
    servidorModel.buscarQtdAtivosDesativados()
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
    selecionarTudo,
    cadastrar,
    selecionarDadosGerais,
    buscarQtdAtivosDesativados
}