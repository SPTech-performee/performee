var database = require("../database/config")

function selecionarTudo() {
    var instrucao = `
        SELECT * FROM Componente;
    `;
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo
};