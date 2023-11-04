var database = require("../database/config")

function selecionarTudo() {
    var instrucao = `
        SELECT * FROM Leitura;
    `;
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo
};