var database = require("../database/config")

function selecionarTudo() {
    var instrucao = `
        SELECT * FROM Permissao;
    `;
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo
};