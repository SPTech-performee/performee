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

module.exports = {
    selecionarTudo,
    cadastrar
};