var database = require("../database/config")

function selecionarTudo() {
    var instrucao = `
        SELECT * FROM Usuario;
    `;
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo
};