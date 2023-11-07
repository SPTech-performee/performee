// Vendo conexão com o banco através do arquivo Config.js
var database = require("../database/config")

// Criando uma função SELECIONARTUDO() que busca os dados do banco
    // Aqui que botamos a Query do banco
function selecionarTudo() {
    var instrucao = `
        SELECT * FROM Administrador;
    `;
    return database.executar(instrucao);
}

// Criando uma função AUTENTICAR que busca os dados do banco
    // Aqui que botamos a Query do banco
function autenticar(identity, senha) {
    var instrucao = `
        SELECT * FROM Administrador WHERE (email = '${identity}' OR cpf = '${identity}') AND senha = '${senha}';
    `;
    return database.executar(instrucao);
}

function selecionarDadosGerais(idAdmin) {
    var instrucao = `
        SELECT a.nome, a.email, a.cpf FROM Administrador AS a WHERE idAdmin = ${idAdmin};
    `;
    return database.executar(instrucao);
}

function editar(nome, email, cpf, cargo, idUsuario) {
    if (nome != null) {
        var instrucao = `
        UPDATE Administrador AS a SET a.nome = '${nome}' WHERE idAdmin = '${idUsuario}';
    `;
    return database.executar(instrucao);
    }
    if (email != null) {
        var instrucao = `
        UPDATE Administrador AS a SET a.email = '${email}' WHERE idAdmin = '${idUsuario}';
    `;
    return database.executar(instrucao);
    }
    if (cpf != null) {
        var instrucao = `
        UPDATE Administrador AS a SET a.cpf = '${cpf}' WHERE idAdmin = '${idUsuario}';
    `;
    return database.executar(instrucao);
    }
    if (cargo != null) {
        var instrucao = `
        UPDATE Administrador AS a SET a.cargo = '${cargo}' WHERE idAdmin = '${idUsuario}';
        `
        return database.executar(instrucao);
    }

}

// Exportando as funções do model criadas para outros arquivos
module.exports = {
    selecionarTudo,
    autenticar,
    selecionarDadosGerais,
    editar
};