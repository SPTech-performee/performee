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

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var tamanho = req.body.tamanhoServer;
    var empresa = req.body.empresaServer;

    dataCenterModel.cadastrar(nome, tamanho, empresa)
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


function editar(req, res) {
    var nome = req.body.nomeServer;
    var tamanho = req.body.tamanhoServer;
    var idDataCenter = req.body.idDataCenterServer;

    dataCenterModel.editar(nome, tamanho, idDataCenter)
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

function buscarUltimoDC(req, res) {

    dataCenterModel.buscarUltimoDC().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o ultimo DataCenter.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function selecionarDadosGerais(req, res) {
    var idDataCenter = req.params.idDataCenter;

    if (idDataCenter == undefined) {
        res.status(400).send("O idDataCenter está undefined!");
    } else {
        dataCenterModel.selecionarDadosGerais(idDataCenter)
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
}

function exibirDadosEspecificosDC(req, res) {
    var idDataCenter = req.params.idDataCenter;

    if (idDataCenter == undefined) {
        res.status(400).send("O idDataCenter está undefined!");
    } else {
        dataCenterModel.exibirDadosEspecificosDC(idDataCenter)
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
}

module.exports = {
    selecionarTudo,
    cadastrar,
    editar,
    buscarUltimoDC,
    selecionarDadosGerais,
    exibirDadosEspecificosDC
}