var database = require("../database/config")

function selecionarTudo() {
    var instrucao = `
        SELECT * FROM EnderecoDataCenter;
    `;
    return database.executar(instrucao);
}

function cadastrar(pais, estado, cidade, cep, bairro, numero, complemento, fkDataCenter) {
    var instrucao = `
        INSERT INTO EnderecoDataCenter (pais, estado, cidade, cep, bairro, numero, complemento, fkDataCenter) VALUES ('${pais}', '${estado}', '${cidade}','${cep}','${bairro}', '${numero}', '${complemento}', '${fkDataCenter}');
    `;
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo,
    cadastrar
};