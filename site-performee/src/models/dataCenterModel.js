var database = require("../database/config")

function selecionarTudo() {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT * FROM DataCenter;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function cadastrar(nome, tamanho, empresa) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            INSERT INTO DataCenter (nome, tamanho, fkEmpresa) VALUES ('${nome}', '${tamanho}', '${empresa}');
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function editar(nome, tamanho, idDataCenter) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            UPDATE dataCenter AS d SET d.nome = '${nome}', d.tamanho = '${tamanho}' WHERE idDataCenter = '${idDataCenter}';
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function buscarUltimoDC() {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT idDataCenter FROM DataCenter ORDER BY idDataCenter DESC LIMIT 1;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function selecionarDadosGerais(idDataCenter) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT dt.nome, dt.tamanho, e.razaoSocial, edt.cep, edt.bairro, edt.numero, edt.complemento, edt.cidade, edt.estado, edt.pais FROM DataCenter as dt INNER JOIN Empresa as e ON dt.fkEmpresa = e.idEmpresa LEFT JOIN EnderecoDataCenter as edt ON dt.idDataCenter = edt.fkDataCenter WHERE idDataCenter = ${idDataCenter};    
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function exibirDadosEspecificosDC(idDataCenter) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT dt.nome, e.razaoSocial, (SELECT COUNT(ipServidor) FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter}) AS qtdServer, (SELECT COUNT(ativo) FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter} AND ativo = 1) AS serversAtivo, (SELECT COUNT(ativo) FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter} AND ativo = 0) AS serversDesativados, (SELECT s.sisOp FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter} AND (SELECT MAX((SELECT COUNT(DISTINCT sisOp) as qtdSisOp FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter} GROUP BY sisOp LIMIT 1)) as maxQtdSisOp FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter}) GROUP BY sisOp ORDER BY sisOp ASC LIMIT 1) AS sisOpMaisUtilizado FROM DataCenter as dt INNER JOIN Empresa as e ON dt.fkEmpresa = e.idEmpresa INNER JOIN Servidor as s ON dt.idDataCenter = s.fkDataCenter WHERE dt.idDataCenter = ${idDataCenter} GROUP BY dt.nome, e.razaoSocial;
        `;
        ;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function deletarDataCenter(tipo, id) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (tipo == 'DC') {
            var instrucao = `
                delete from datacenter where idDataCenter = '${id}';
            `;
        }
        else {
            var instrucao = `
                delete from datacenter where fkEmpresa = '${id}';
            `;
        }
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function selecionarTudoPerEmpresa(idEmpresa) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT * FROM DataCenter as dt INNER JOIN Empresa as e ON dt.fkEmpresa = e.idEmpresa WHERE e.idEmpresa = ${idEmpresa};
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo,
    cadastrar,
    editar,
    buscarUltimoDC,
    selecionarDadosGerais,
    exibirDadosEspecificosDC,
    deletarDataCenter,
    selecionarTudoPerEmpresa
};