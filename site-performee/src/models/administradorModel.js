var database = require("../database/config")

function autenticar(identity, senha) {
    var instrucao = `
        SELECT * FROM Administrador WHERE (email = '${identity}' OR cpf = '${identity}') AND senha = '${senha}';
    `;
    return database.executar(instrucao);
}

module.exports = {
    autenticar
};