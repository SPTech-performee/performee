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

function editar(razaoSocial, nomeFantasia, cnpj, email, telefone, idEmpresa) {
  var instrucao = `
  UPDATE empresa AS e SET e.razaoSocial = '${razaoSocial}', e.nomeFantasia = '${nomeFantasia}', e.cnpj = '${cnpj}', e.email = '${email}', e.telefone = '${telefone}' WHERE idEmpresa = '${idEmpresa}';
`;
  return database.executar(instrucao);
}

function selecionarDadosGerais(idEmpresa) {
  var instrucao = `
    select * from empresa where idEmpresa = ${idEmpresa};
  `;
  return database.executar(instrucao);
}

function deletarEmpresa(id) {
  var instrucao = `
  delete from empresa where idEmpresa = '${id}';
  `;
  return database.executar(instrucao);
}


module.exports = { consulta,
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  editar,
  listar,
  selecionarDadosGerais,
  deletarEmpresa
}