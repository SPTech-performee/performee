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

  function selecionarDadosGerais(ipServidor) {
    var instrucao = `
    SELECT s.ipServidor, s.hostname, s.ativo, s.sisOp, dt.nome, e.razaoSocial, c.tipo, c.modelo, c.capacidadeTotal, uni.tipoMedida FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON s.fkEmpresa = e.idEmpresa LEFT JOIN Componente as c ON c.fkServidor = s.ipServidor LEFT JOIN UnidadeMedida as uni ON c.fkMedida = uni.idUnidadeMedida WHERE ipServidor = '${ipServidor}';`;
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo,
    cadastrar,
    selecionarDadosGerais
};