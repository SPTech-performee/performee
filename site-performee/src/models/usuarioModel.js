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

function selecionarDadosGerais(idColaborador) {
    var instrucao = `
        SELECT u.nome, u.email, u.cpf, u.cargo, e.razaoSocial, p.descricao FROM Usuario AS u INNER JOIN Permissao AS p ON u.fkTipoPermissao = p.idTipo INNER JOIN Empresa AS e ON u.fkEmpresa = e.idEmpresa WHERE idColaborador = ${idColaborador};
    `;
    return database.executar(instrucao);
}

function buscarDadosEmpresaPermissao(idColaborador) {
    var instrucao = `
    SELECT e.razaoSocial, e.cnpj, e.email, p.idTipo FROM Empresa as e INNER JOIN Usuario as u ON u.fkEmpresa = e.idEmpresa INNER JOIN Permissao AS p ON u.fkTipoPermissao = idTipo WHERE u.idColaborador = ${idColaborador};   
    `;
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo,
    autenticar,
    cadastrar,
    selecionarDadosGerais,
    buscarDadosEmpresaPermissao
};