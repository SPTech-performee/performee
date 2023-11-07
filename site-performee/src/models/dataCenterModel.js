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

function exibirDadosEspecificosDC(idDataCenter) {
    var instrucao = `
    SELECT dt.nome, e.razaoSocial, (SELECT COUNT(ipServidor) FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter}) AS qtdServer, (SELECT COUNT(ativo) FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter} AND ativo = 1) AS serversAtivo, (SELECT COUNT(ativo) FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter} AND ativo = 0) AS serversDesativados, (SELECT s.sisOp FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter} AND (SELECT MAX((SELECT COUNT(DISTINCT sisOp) as qtdSisOp FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter} GROUP BY sisOp LIMIT 1)) as maxQtdSisOp FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter}) GROUP BY sisOp ORDER BY sisOp ASC LIMIT 1) AS sisOpMaisUtilizado FROM DataCenter as dt INNER JOIN Empresa as e ON dt.fkEmpresa = e.idEmpresa INNER JOIN Servidor as s ON dt.idDataCenter = s.fkDataCenter WHERE dt.idDataCenter = ${idDataCenter} GROUP BY dt.nome, e.razaoSocial;
    `    
    ;
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo,
    cadastrar,
    buscarUltimoDC,
    selecionarDadosGerais,
    exibirDadosEspecificosDC
};