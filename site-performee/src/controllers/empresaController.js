var empresaModel = require("../models/empresaModel");

function consulta(req, res) {
  empresaModel.consulta()
    .then(function (resultadoEmpresa) {
      if (resultadoEmpresa.length > 0) {
        res.status(200).json(resultadoEmpresa);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("\nHouve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var razaoSocial = req.body.razaoSocialServer;
  var nomeFantasia = req.body.nomeFantasiaServer;
  var cnpj = req.body.cnpjServer;
  var email = req.body.emailServer;
  var telefone = req.body.telefoneServer;



  if (razaoSocial == undefined) {
    res.status(400).send("Seu razaoSocial está undefined!");
  } else if (nomeFantasia == undefined) {
    res.status(400).send("Seu nomeFantasia está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else {

    empresaModel.cadastrar(razaoSocial, nomeFantasia, cnpj, email, telefone)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastro! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

function editar(req, res) {
  
  var razaoSocial = req.body.razaoSocialServer;
  var nomeFantasia = req.body.nomeFantasiaServer;
  var cnpj = req.body.cnpjServer;
  var email = req.body.emailServer;
  var telefone = req.body.telefoneServer;
  var idEmpresa = req.body.idEmpServer;

    empresaModel.editar(razaoSocial, nomeFantasia, cnpj, email, telefone, idEmpresa)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastro! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  
}

function selecionarDadosGerais(req, res) {
  var idEmpresa = req.params.idEmpresa;

  if (idEmpresa == undefined) {
      res.status(400).send("O idEmpresa está undefined!");
  } else {
      empresaModel.selecionarDadosGerais(idEmpresa)
          .then(function (resultado) {
              if (resultado.length > 0) {
                  res.status(200).json(resultado);
              } else {
                  res.status(204).send("Nenhum resultado encontrado!")
              }
          }).catch(
              function (erro) {
                  console.log(erro);
                  console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                  res.status(500).json(erro.sqlMessage);
              }
          );
  }
}

function deletarEmpresa(req, res) {

   
  var id = req.body.idEmpServer;

  empresaModel.deletarEmpresa(id)
      .then(
          function (resultado) {
              res.json(resultado);
          }
      ).catch(
          function (erro) {
              console.log(erro);
              console.log(
                  "\nHouve um erro ao realizar o cadastro! Erro: ",
                  erro.sqlMessage
              );
              res.status(500).json(erro.sqlMessage);
          }
      );
}




module.exports = {
  consulta,
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  editar,
  listar,
  selecionarDadosGerais,
  deletarEmpresa
};
