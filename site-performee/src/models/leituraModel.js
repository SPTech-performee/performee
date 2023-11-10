var database = require("../database/config")

function selecionarTudo() {
    var instrucao = `
        SELECT * FROM Leitura;
    `;
    return database.executar(instrucao);
}

function deletarLeitura(tipo, id) {
    if (tipo == 'DC') {
        var instrucao = `
        delete from Leitura where fkDataCenter = '${id}';
        `;
        return database.executar(instrucao);
    } else if (tipo == 'Server') {
        var instrucao = `
        delete from Leitura where fkServidor = '${id}';
        `;
        return database.executar(instrucao);
    }
    else {
        var instrucao = `
    delete from Leitura where fkEmpresa = '${id}';
    `;
        return database.executar(instrucao);
    }

}

module.exports = {
    selecionarTudo,
    deletarLeitura
};