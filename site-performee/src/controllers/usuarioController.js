const { response } = require("express");
var usuarioModel = require("../models/usuarioModel");

function selecionarTudo(req, res) {
    usuarioModel.selecionarTudo()
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

function autenticar(req, res) {
    var identity = req.body.identityServer;
    var senha = req.body.senhaServer;

    if (identity == undefined) {
        res.status(400).send("Seu identity está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(identity, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Identidade e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cargo = req.body.cargoServer;
    var empresa = req.body.empresaServer;
    var cpf = req.body.cpfServer;
    var permissao = req.body.permissaoServer
    var senha = req.body.senhaServer

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        usuarioModel.cadastrar(nome, email, cargo, empresa, cpf, permissao, senha)
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
    var idColaborador = req.params.idColaborador;

    if (idColaborador == undefined) {
        res.status(400).send("O idColaborador está undefined!");
    } else {
        usuarioModel.selecionarDadosGerais(idColaborador)
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

function buscarDadosEmpresaPermissao(req, res) {
    var idColaborador = req.params.idColaborador;

    if (idColaborador == undefined) {
        res.status(400).send("O idColaborador está undefined!");
    } else {
        usuarioModel.buscarDadosEmpresaPermissao(idColaborador)
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

function editar(req, res) {

    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var cargo = req.body.cargoServer;
    var permissao = req.body.permissaoServer;
    var senha = req.body.senhaServer;
    var id = req.body.idUsuarioServer;

    usuarioModel.editar(nome, email, cpf, cargo, permissao, senha, id)
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

function editarNome(req, res) {

    var nome = req.body.nomeServer;
    var id = req.body.idUsuarioServer;

    usuarioModel.editarNome(nome, id)
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

function editarEmail(req, res) {

    var email = req.body.emailServer;
    var id = req.body.idUsuarioServer;

    usuarioModel.editarEmail(email, id)
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

function editarCpf(req, res) {

    var cpf = req.body.cpfServer;
    var id = req.body.idUsuarioServer;

    usuarioModel.editarCpf(cpf, id)
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

function editarCargo(req, res) {

    var cargo = req.body.cargoServer;
    var id = req.body.idUsuarioServer;

    usuarioModel.editarCargo(cargo, id)
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

function deletar(req, res) {

   
    var id = req.body.idUserServer;

    usuarioModel.deletar(id)
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

function deletarUsuario(req, res) {

    var id = req.body.idEmpServer;
  
    usuarioModel.deletarUsuario(id)
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
    autenticar,
    cadastrar,
    editar,
    selecionarDadosGerais,
    buscarDadosEmpresaPermissao,
    editarNome,
    editarEmail,
    editarCpf,
    editarCargo,
    deletar,
    deletarUsuario
}