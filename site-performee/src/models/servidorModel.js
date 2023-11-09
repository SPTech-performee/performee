var database = require("../database/config")

function selecionarTudo() {
    var instrucao = `
        SELECT * FROM Servidor;
    `;
    return database.executar(instrucao);
}

function cadastrar(ipServidor, hostName, sisOp, ativo, fkEmpresa, fkDataCenter) {
    var instrucao = `
        INSERT INTO Servidor (ipServidor, hostname, sisOp, ativo, fkEmpresa, fkDataCenter) VALUES ('${ipServidor}', '${hostName}', '${sisOp}','${ativo}','${fkEmpresa}', '${fkDataCenter}');
  
    `;
    return database.executar(instrucao);
}

function editar(ipServidor, hostName, sisOp, ativo, hostNameAntigo, fkEmp) {
    var instrucao = `
    UPDATE Servidor
SET 
  hostname = '${hostName}',
  sisOp = '${sisOp}',
  ativo = '${ativo}'
WHERE fkEmpresa = '${fkEmp}' and hostname = '${hostNameAntigo}' ;
    `;
    return database.executar(instrucao);
}

function selecionarDadosGerais(ipServidor) {
    var instrucao = `
        SELECT s.ipServidor, s.hostname, s.ativo, s.sisOp, s.fkEmpresa, dt.nome, e.razaoSocial, c.tipo, c.modelo, c.capacidadeTotal, uni.tipoMedida FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON s.fkEmpresa = e.idEmpresa LEFT JOIN Componente as c ON c.fkServidor = s.ipServidor LEFT JOIN UnidadeMedida as uni ON c.fkMedida = uni.idUnidadeMedida WHERE ipServidor = ${ipServidor};`;
    return database.executar(instrucao);
}

function buscarQtdAtivosDesativados() {
    var instrucao = `
        SELECT (SELECT COUNT(ativo) FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE ativo = 1) as serversAtivos, (SELECT COUNT(ativo) as serversDesativos FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE ativo = 0) as serversDesativados FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE ativo = 1 GROUP BY serversAtivos, serversDesativados;
    `;
    return database.executar(instrucao);
}

function deletarServidor(tipo,id) {
    if (tipo == 'DC') {
        var instrucao = `
        delete from servidor where fkDataCenter = '${id}';
        `;
        return database.executar(instrucao);
    } else if (tipo == 'Server') {
        var instrucao = `
        delete from servidor where ipServidor = '${id}';
        `;
        return database.executar(instrucao);
    }
    else {
        var instrucao = `
    delete from servidor where fkEmpresa = '${id}';
    `;
    return database.executar(instrucao);
    }
  }

module.exports = {
    selecionarTudo,
    cadastrar,
    editar,
    selecionarDadosGerais,
    buscarQtdAtivosDesativados,
    deletarServidor
};