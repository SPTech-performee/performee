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

function ultimasLeiturasCpu(req, res) {
    var ipServidor = req.params.ipServidor;

    leituraModel.ultimasLeiturasCpu(ipServidor)
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

function leituraMaisRecenteCpu(req, res) {
    var ipServidor = req.params.ipServidor;

    leituraModel.leituraMaisRecenteCpu(ipServidor)
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

function ultimasLeiturasGpu(req, res) {
    var ipServidor = req.params.ipServidor;

    leituraModel.ultimasLeiturasGpu(ipServidor)
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

function leituraMaisRecenteGpu(req, res) {
    var ipServidor = req.params.ipServidor;

    leituraModel.leituraMaisRecenteGpu(ipServidor)
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

function ultimasLeiturasRam(req, res) {
    var ipServidor = req.params.ipServidor;

    leituraModel.ultimasLeiturasRam(ipServidor)
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

function leituraMaisRecenteRam(req, res) {
    var ipServidor = req.params.ipServidor;

    leituraModel.leituraMaisRecenteRam(ipServidor)
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

function leituraUsoRamPerHora(req, res) {
    var ipServidor = req.params.ipServidor;

    leituraModel.leituraUsoRamPerHora(ipServidor)
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

function ultimasLeiturasDisco(req, res) {
    var ipServidor = req.params.ipServidor;

    leituraModel.ultimasLeiturasDisco(ipServidor)
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

function leituraMaisRecenteDisco(req, res) {
    var ipServidor = req.params.ipServidor;

    leituraModel.leituraMaisRecenteDisco(ipServidor)
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

function ultimasLeiturasRede(req, res) {
    var ipServidor = req.params.ipServidor;

    leituraModel.ultimasLeiturasRede(ipServidor)
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

function leituraMaisRecenteRede(req, res) {
    var ipServidor = req.params.ipServidor;

    leituraModel.leituraMaisRecenteRede(ipServidor)
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

function leituraComparacaoUpDownPerDia(req, res) {
    var ipServidor = req.params.ipServidor;

    leituraModel.leituraComparacaoUpDownPerDia(ipServidor)
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
    deletarLeitura,

    ultimasLeiturasCpu,
    leituraMaisRecenteCpu,

    ultimasLeiturasGpu,
    leituraMaisRecenteGpu,

    ultimasLeiturasRam,
    leituraMaisRecenteRam,
    leituraUsoRamPerHora,

    ultimasLeiturasDisco,
    leituraMaisRecenteDisco,

    ultimasLeiturasRede,
    leituraMaisRecenteRede,
    leituraComparacaoUpDownPerDia
}