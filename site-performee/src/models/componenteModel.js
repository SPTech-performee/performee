var database = require("../database/config")

function selecionarTudo() {
    var instrucao = `
        SELECT * FROM Componente;
    `;
    return database.executar(instrucao);
}

function deletarComponente(tipo, id) {
    if (tipo == 'DC') {
        var instrucao = `
        delete from Componente where fkDataCenter = '${id}';
        `;
        return database.executar(instrucao);
    } else if (tipo == 'Server') {
        var instrucao = `
    delete from Componente where fkServidor = '${id}';
    `;
    return database.executar(instrucao);
    }
    else {
        var instrucao = `
    delete from Componente where fkEmpresa = '${id}';
    `;
    return database.executar(instrucao);
    }
  }

module.exports = {
    selecionarTudo,
    deletarComponente
};