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
// thaisinha passou por aq haha
function selecionarTudoPerEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa
    servidorModel.selecionarTudoPerEmpresa(idEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta selecionar tudo per empresa! Erro: ", erro.sqlMessage);
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

function editar(req, res) {
    var hostName = req.body.nomeServerServer;
    var ipServidor = req.body.dnsServerServer;
    var sisOp = req.body.SisOpServer;
    var ativo = req.body.ativoServer;
    var hostNameAntigo = req.body.hnServer;
    var fkEmp = req.body.fkEmpServer;

    servidorModel.editar(ipServidor, hostName, sisOp, ativo, hostNameAntigo, fkEmp)
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

function deletarServidor(req, res) {
    var tipo = req.body.tipoServer;
    var id = req.body.idEmpServer;

    servidorModel.deletarServidor(tipo, id)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o delete! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function exibirDadosGerais(req, res) {
    var ipServidor = req.params.ipServidor;

    if (ipServidor == undefined) {
        res.status(400).send("O ipServidor está undefined!");
    } else {
        servidorModel.exibirDadosGerais(ipServidor)
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

function exibirServidoresPerDCenter(req, res) {
    var idDataCenter = req.params.idDataCenter;

    if (idDataCenter == undefined) {
        res.status(400).send("O idDataCenter está undefined!");
    } else {
        servidorModel.exibirServidoresPerDCenter(idDataCenter)
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

function exibirStatusServidoresPerDCenter(req, res) {
    var idDataCenter = req.params.idDataCenter;

    if (idDataCenter == undefined) {
        res.status(400).send("O idDataCenter está undefined!");
    } else {
        servidorModel.exibirStatusServidoresPerDCenter(idDataCenter)
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

function buscarQtdAtivosDesativadosPerEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("O idEmpresa está undefined!");
    } else {
        servidorModel.buscarQtdAtivosDesativadosPerEmpresa(idEmpresa)
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
    selecionarDadosGerais,
    buscarQtdAtivosDesativados,
    deletarServidor,
    exibirDadosGerais,
    exibirServidoresPerDCenter,
    exibirStatusServidoresPerDCenter,
    buscarQtdAtivosDesativadosPerEmpresa,
    selecionarTudoPerEmpresa
}