var database = require("../database/config")

function selecionarTudo() {
    var instrucao = `
        SELECT * FROM EnderecoDataCenter;
    `;
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo
};