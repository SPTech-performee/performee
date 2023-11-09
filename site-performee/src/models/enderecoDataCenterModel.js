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
    var instrucao = `
    UPDATE EnderecoDataCenter AS e SET e.pais = '${pais}', e.estado = '${estado}', e.cidade = '${cidade}', e.cep = '${cep}', e.bairro = '${bairro}', e.numero = '${numero}', e.complemento = '${complemento}' WHERE fkDataCenter = '${fkDataCenter}';
  `;
        return database.executar(instrucao);
}

function deletarEnderecoDataCenter(tipo, id) {
    if (tipo == 'DC') {
        var instrucao = `
    delete from enderecoDataCenter where fkDatacenter IN (select idDataCenter from datacenter where idDataCenter = '${id}');
    `;
    return database.executar(instrucao);
    }
    else {
        var instrucao = `
    delete from enderecoDataCenter where fkDatacenter IN (select idDataCenter from datacenter where fkEmpresa = '${id}');
    `;
    return database.executar(instrucao);
    }
    
  }

module.exports = {
    selecionarTudo,
    editar,
    cadastrar,
    deletarEnderecoDataCenter
};