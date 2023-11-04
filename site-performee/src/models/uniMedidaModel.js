var database = require("../database/config")

function selecionarTudo() {
    var instrucao = `
        SELECT * FROM UnidadeMedida;
    `;
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo
};