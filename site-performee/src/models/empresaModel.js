var database = require("../database/config");

function consulta() {
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
      select * from Empresa;
    `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
      select * from empresa;
    `;
  } else {
    console.log('Ambienetes não definidos no app.js');
    return;
  }
  return database.executar(instrucao);
}

function listarEmpresa(idEmpresa) {
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
      select * from Empresa where idEmpresa = ${idEmpresa} ;
    `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
      select * from empresa where idEmpresa = ${idEmpresa} ;
    `;
  } else {
    console.log('Ambienetes não definidos no app.js');
    return;
  }
  return database.executar(instrucao);
}


function buscarPorId(id) {
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var query = `
    select * from Empresa where id = '${id}'
  `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var query = `
      select * from empresa where id = '${id}'
    `;
  } else {
    console.log('Ambienetes não definidos no app.js');
    return;
  }
  return database.executar(query);
}

function listar() {
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var query = `
      select * from Empresa
    `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var query = `
      select * from empresa
    `;
  } else {
    console.log('Ambienetes não definidos no app.js');
    return;
  }
  return database.executar(query);
}

function buscarPorCnpj(cnpj) {
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var query = `
      select * from Empresa where cnpj = '${cnpj}'
    `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var query = `
      select * from empresa where cnpj = '${cnpj}'
    `;
  } else {
    console.log('Ambienetes não definidos no app.js');
    return;
  }
  return database.executar(query);
}

function cadastrar(razaoSocial, nomeFantasia, cnpj, email, telefone) {
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
      INSERT INTO Empresa (razaoSocial, nomeFantasia, cnpj, email, telefone) VALUES ('${razaoSocial}', '${nomeFantasia}', '${cnpj}','${email}','${telefone}');
    `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
      INSERT INTO empresa (razaoSocial, nomeFantasia, cnpj, email, telefone) VALUES ('${razaoSocial}', '${nomeFantasia}', '${cnpj}','${email}','${telefone}');
    `;
  } else {
    console.log('Ambienetes não definidos no app.js');
    return;
  }
  return database.executar(instrucao);
}

function editar(razaoSocial, nomeFantasia, cnpj, email, telefone, idEmpresa) {
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
    UPDATE Empresa
    SET razaoSocial = '${razaoSocial}',
        nomeFantasia = '${nomeFantasia}',
        cnpj = '${cnpj}',
        email = '${email}',
        telefone = '${telefone}'
    WHERE idEmpresa = '${idEmpresa}';
    
    `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
      UPDATE empresa AS e SET e.razaoSocial = '${razaoSocial}', e.nomeFantasia = '${nomeFantasia}', e.cnpj = '${cnpj}', e.email = '${email}', e.telefone = '${telefone}' WHERE idEmpresa = '${idEmpresa}';
    `;
  } else {
    console.log('Ambienetes não definidos no app.js');
    return;
  }
  return database.executar(instrucao);
}

function selecionarDadosGerais(idEmpresa) {
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
    select * from Empresa where idEmpresa = ${idEmpresa};
  `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
      select * from empresa where idEmpresa = ${idEmpresa};
    `;
  } else {
    console.log('Ambienetes não definidos no app.js');
    return;
  }
  return database.executar(instrucao);
}

function deletarEmpresa(id) {
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
      delete from Empresa where idEmpresa = '${id}';
    `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    var instrucao = `
      delete from empresa where idEmpresa = '${id}';
    `;
  } else {
    console.log('Ambienetes não definidos no app.js');
    return;
  }
  return database.executar(instrucao);
}


module.exports = {
  consulta,
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  editar,
  listar,
  selecionarDadosGerais,
  deletarEmpresa,
  listarEmpresa
}