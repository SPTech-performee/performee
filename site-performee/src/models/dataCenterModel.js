var database = require("../database/config")

function selecionarTudo() {
    var instrucao = `
        SELECT * FROM DataCenter;
    `;
    return database.executar(instrucao);
}

function cadastrar(nome, tamanho, empresa) {
    var instrucao = `
        INSERT INTO DataCenter (nome, tamanho, fkEmpresa) VALUES ('${nome}', '${tamanho}', '${empresa}');

    `;
    return database.executar(instrucao);
}

function buscarUltimoDC() {

    var instrucao = `
        SELECT idDataCenter FROM DataCenter ORDER BY idDataCenter DESC LIMIT 1;
    `;
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo,
    cadastrar,
    buscarUltimoDC

};