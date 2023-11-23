// Vendo conexão com o banco através do arquivo Config.js
var database = require("../database/config")

// Criando uma função SELECIONARTUDO() que busca os dados do banco
// Aqui que botamos a Query do banco
function selecionarTudo() {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT * FROM Administrador;
    `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

// Criando uma função AUTENTICAR que busca os dados do banco
// Aqui que botamos a Query do banco
function autenticar(identity, senha) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT * FROM Administrador WHERE (email = '${identity}' OR cpf = '${identity}') AND senha = '${senha}';
    `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function selecionarDadosGerais(idAdmin) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT a.nome, a.email, a.cpf FROM Administrador AS a WHERE idAdmin = ${idAdmin};
    `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function editarNome(nome, id) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        UPDATE Administrador AS u SET u.nome = '${nome}' WHERE idAdmin = '${id}';
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function editarEmail(email, id) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        UPDATE Administrador AS u SET u.email = '${email}' WHERE idAdmin = '${id}';
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function editarCpf(cpf, id) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        UPDATE Administrador AS u SET u.cpf = '${cpf}' WHERE idAdmin = '${id}';
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

// Exportando as funções do model criadas para outros arquivos
module.exports = {
    selecionarTudo,
    autenticar,
    selecionarDadosGerais,
    editarNome,
    editarEmail,
    editarCpf
};