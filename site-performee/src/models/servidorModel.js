var database = require("../database/config")

function selecionarTudo() {
    var instrucao = `
        SELECT * FROM Servidor;
    `;
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo
};