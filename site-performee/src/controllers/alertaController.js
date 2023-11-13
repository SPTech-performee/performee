const { response } = require("express");
var alertaModel = require("../models/alertaModel");

function selecionarTudo(req, res) {
    alertaModel.selecionarTudo()
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

function selecionarAlertasPerEstado(req, res) {
    alertaModel.selecionarAlertasPerEstado()
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

function deletarAlerta(req, res) {
    var tipo = req.body.tipoServer;
    var id = req.body.idEmpServer;

    alertaModel.deletarAlerta(tipo,id)
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

function exibirTodosLogs(req, res) {
    var condicao = req.params.condicao;
    alertaModel.exibirTodosLogs(condicao)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao buscar os logs! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function exibirLogsPerDCenter(req, res) {
    var idDataCenter = req.params.idDataCenter
    var condicao = req.params.condicao;
    alertaModel.exibirLogsPerDCenter(idDataCenter, condicao)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao buscar os logs! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function exibirQtdStatusPerDCenter(req, res) {
    var idDataCenter = req.params.idDataCenter

    alertaModel.exibirQtdStatusPerDCenter(idDataCenter)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao buscar os logs! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function qtdServerInstavel(req, res) {
    alertaModel.qtdServerInstavel()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao buscar os logs! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    selecionarTudo,
    selecionarAlertasPerEstado,
    deletarAlerta,
    exibirTodosLogs,
    exibirLogsPerDCenter,
    exibirQtdStatusPerDCenter,
    qtdServerInstavel
}