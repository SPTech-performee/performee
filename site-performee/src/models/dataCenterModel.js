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

function selecionarDadosGerais(idDataCenter) {
    var instrucao = `
        SELECT dt.nome, dt.tamanho, e.razaoSocial, edt.cep, edt.bairro, edt.numero, edt.complemento, edt.cidade, edt.estado, edt.pais FROM DataCenter as dt INNER JOIN Empresa as e ON dt.fkEmpresa = e.idEmpresa LEFT JOIN EnderecoDataCenter as edt ON dt.idDataCenter = edt.fkDataCenter WHERE idDataCenter = ${idDataCenter};    `;
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo,
    cadastrar,
    buscarUltimoDC,
    selecionarDadosGerais
};