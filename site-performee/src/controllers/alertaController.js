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

function exibirTodosLogsPerEmpresa(req, res) {
    var condicao = req.params.condicao;
    var idEmpresa = req.params.idEmpresa;
    
    alertaModel.exibirTodosLogsPerEmpresa(condicao, idEmpresa)
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

function exibirLogsPerServidor(req, res) {
    var ipServidor = req.params.ipServidor
    var condicao = req.params.condicao;

    alertaModel.exibirLogsPerServidor(ipServidor, condicao)
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

function qtdServerInstavelPerEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa

    alertaModel.qtdServerInstavelPerEmpresa(idEmpresa)
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

function selecionarAlertasPerEstadoPerEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa

    alertaModel.selecionarAlertasPerEstadoPerEmpresa(idEmpresa)
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

function qtdAlertasPerCpu(req, res) {
    var ipServidor = req.params.ipServidor

    alertaModel.qtdAlertasPerCpu(ipServidor)
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

function qtdAlertasPerRam(req, res) {
    var ipServidor = req.params.ipServidor

    alertaModel.qtdAlertasPerRam(ipServidor)
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

function qtdAlertasPerDisco(req, res) {
    var ipServidor = req.params.ipServidor

    alertaModel.qtdAlertasPerDisco(ipServidor)
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

function qtdAlertasPerRede(req, res) {
    var ipServidor = req.params.ipServidor

    alertaModel.qtdAlertasPerRede(ipServidor)
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

function statusComponentesPerSemana(req, res) {
    var ipServidor = req.params.ipServidor

    alertaModel.statusComponentesPerSemana(ipServidor)
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
    qtdServerInstavel,
    qtdServerInstavelPerEmpresa,
    selecionarAlertasPerEstadoPerEmpresa,
    exibirTodosLogsPerEmpresa,
    exibirLogsPerServidor,
    qtdAlertasPerCpu,
    qtdAlertasPerRam,
    qtdAlertasPerDisco,
    qtdAlertasPerRede,
    statusComponentesPerSemana
}