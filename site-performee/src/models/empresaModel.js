var database = require("../database/config");

function consulta() {
  var instrucao = `
  select * from empresa;
  `;
  return database.executar(instrucao);
}


function buscarPorId(id) {
  var query = `select * from empresa where id = '${id}'`;

  return database.executar(query);
}

function listar() {
  var query = `select * from empresa`;

  return database.executar(query);
}

function buscarPorCnpj(cnpj) {
  var query = `select * from empresa where cnpj = '${cnpj}'`;

  return database.executar(query);
}

function cadastrar(razaoSocial, nomeFantasia, cnpj, email, telefone) {
  var instrucao = `
      INSERT INTO empresa (razaoSocial, nomeFantasia, cnpj, email, telefone) VALUES ('${razaoSocial}', '${nomeFantasia}', '${cnpj}','${email}','${telefone}');

  `;
  return database.executar(instrucao);
}

function selecionarDadosGerais(idEmpresa) {
  var instrucao = `
    select * from empresa where idEmpresa = ${idEmpresa};
  `;
  return database.executar(instrucao);
}

module.exports = { consulta, buscarPorCnpj, buscarPorId, cadastrar, listar, selecionarDadosGerais };
