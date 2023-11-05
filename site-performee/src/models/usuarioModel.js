var database = require("../database/config")

function selecionarTudo() {
    var instrucao = `
        SELECT * FROM Usuario;
    `;
    return database.executar(instrucao);
}

function autenticar(identity, senha) {
    var instrucao = `
        SELECT * FROM usuario WHERE (email = '${identity}' OR cpf = '${identity}') AND senha = '${senha}';
    `;
    return database.executar(instrucao);
}

function cadastrar(nome, email, cargo, empresa, cpf, permissao, senha) {
    var instrucao = `
        INSERT INTO usuario (nome, email, senha, cpf, cargo, fkEmpresa, fkTipoPermissao) VALUES ('${nome}', '${email}', '${senha}','${cpf}','${cargo}', '${empresa}', '${permissao}');

    `;
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo,
    autenticar,
    cadastrar
};