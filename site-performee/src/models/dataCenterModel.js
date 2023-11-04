var database = require("../database/config")

function selecionarTudo() {
    var instrucao = `
        SELECT * FROM DataCenter;
    `;
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo
};