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

function editar(pais, estado, cidade, cep, bairro, numero, complemento, fkDataCenter) {
    if (pais != null) {
        var instrucao = `
      UPDATE enderecoDataCenter AS e SET e.pais = '${pais}' WHERE idEndereco = '${fkDataCenter}';
  `;
        return database.executar(instrucao);
    }
    if (estado != null) {
        var instrucao = `
        UPDATE enderecoDataCenter AS e SET e.estado = '${estado}' WHERE idEndereco = '${idDataCenter}';
  `;
        return database.executar(instrucao);
    }
    if (cidade != null) {
        var instrucao = `
        UPDATE enderecoDataCenter AS e SET e.cidade = '${cidade}' WHERE idEndereco = '${idDataCenter}';
  `;
        return database.executar(instrucao);
    }
    if (cep != null) {
        var instrucao = `
        UPDATE enderecoDataCenter AS e SET e.estado = '${cep}' WHERE idEndereco = '${idDataCenter}';
  `;
        return database.executar(instrucao);
    }
    if (bairro != null) {
        var instrucao = `
        UPDATE enderecoDataCenter AS e SET e.estado = '${bairro}' WHERE idEndereco = '${idDataCenter}';
  `;
        return database.executar(instrucao);
    }
    if (numero != null) {
        var instrucao = `
        UPDATE enderecoDataCenter AS e SET e.estado = '${numero}' WHERE idEndereco = '${idDataCenter}';
  `;
        return database.executar(instrucao);
    }
    if (complemento != null) {
        var instrucao = `
        UPDATE enderecoDataCenter AS e SET e.estado = '${complemento}' WHERE idEndereco = '${idDataCenter}';
  `;
        return database.executar(instrucao);
    }
}

module.exports = {
    selecionarTudo,
    editar,
    cadastrar
};