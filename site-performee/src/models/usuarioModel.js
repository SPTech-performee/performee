var database = require("../database/config")

function selecionarTudo() {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
            SELECT * FROM Usuario;
        `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT * FROM Usuario;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function selecionarTudoPerEmpresa(idEmpresa) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT *
        FROM Usuario AS u
        INNER JOIN Empresa AS e ON u.fkEmpresa = e.idEmpresa
        WHERE e.idEmpresa = ${idEmpresa};
    `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT * FROM Usuario as u
            INNER JOIN Empresa as e on u.fkEmpresa = e.idEmpresa
            WHERE idEmpresa = ${idEmpresa};
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function autenticar(identity, senha) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT *
        FROM Usuario
        WHERE (email = '${identity}' OR cpf = '${identity}') AND senha = '${senha}';
        
        `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT * FROM usuario WHERE (email = '${identity}' OR cpf = '${identity}') AND senha = '${senha}';
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function cadastrar(nome, email, cargo, empresa, cpf, permissao, senha) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        INSERT INTO usuario (nome, email, senha, cpf, cargo, fkEmpresa, fkTipoPermissao)
    VALUES ('${nome}', '${email}', '${senha}', '${cpf}', '${cargo}', '${empresa}', '${permissao}');

    `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            INSERT INTO usuario (nome, email, senha, cpf, cargo, fkEmpresa, fkTipoPermissao) VALUES ('${nome}', '${email}', '${senha}','${cpf}','${cargo}', '${empresa}', '${permissao}');
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}



function editar(nome, email, cpf, cargo, permissao, senha, id) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        UPDATE Usuario
        SET nome = '${nome}',
            email = '${email}',
            cpf = '${cpf}',
            cargo = '${cargo}',
            fkTipoPermissao = '${permissao}',
            senha = '${senha}'
        WHERE idColaborador = '${id}';
        
        `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            UPDATE Usuario AS u SET u.nome = '${nome}', u.email = '${email}', u.cpf = '${cpf}', u.cargo = '${cargo}', u.fkTipoPermissao = '${permissao}', u.senha = '${senha}'  WHERE idColaborador = '${id}';
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);

}

function selecionarDadosGerais(idColaborador) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT u.nome, u.email, u.cpf, u.cargo, e.razaoSocial, p.descricao 
        FROM Usuario AS u 
        INNER JOIN Permissao AS p ON u.fkTipoPermissao = p.idTipo 
        INNER JOIN Empresa AS e ON u.fkEmpresa = e.idEmpresa 
        WHERE idColaborador = ${idColaborador};        
        `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT u.nome, u.email, u.cpf, u.cargo, e.razaoSocial, p.descricao FROM Usuario AS u INNER JOIN Permissao AS p ON u.fkTipoPermissao = p.idTipo INNER JOIN Empresa AS e ON u.fkEmpresa = e.idEmpresa WHERE idColaborador = ${idColaborador};
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function buscarDadosEmpresaPermissao(idColaborador) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT e.razaoSocial, e.cnpj, e.email, p.idTipo 
        FROM Empresa AS e 
        INNER JOIN Usuario AS u ON u.fkEmpresa = e.idEmpresa 
        INNER JOIN Permissao AS p ON u.fkTipoPermissao = p.idTipo 
        WHERE u.idColaborador = ${idColaborador};           
        `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT e.razaoSocial, e.cnpj, e.email, p.idTipo FROM Empresa as e INNER JOIN Usuario as u ON u.fkEmpresa = e.idEmpresa INNER JOIN Permissao AS p ON u.fkTipoPermissao = idTipo WHERE u.idColaborador = ${idColaborador};   
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function editarNome(nome, id) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        UPDATE Usuario
        SET nome = '${nome}'
        WHERE idColaborador = '${id}';        
        `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            UPDATE Usuario AS u SET u.nome = '${nome}' WHERE idColaborador = '${id}';
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function editarEmail(email, id) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        UPDATE Usuario
        SET email = '${email}'
        WHERE idColaborador = '${id}';        
        `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            UPDATE Usuario AS u SET u.email = '${email}' WHERE idColaborador = '${id}';
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function editarCpf(cpf, id) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        UPDATE Usuario
        SET cpf = '${cpf}'
        WHERE idColaborador = '${id}';        
        `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            UPDATE Usuario AS u SET u.cpf = '${cpf}' WHERE idColaborador = '${id}';
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function editarCargo(cargo, id) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        UPDATE Usuario
        SET cargo = '${cargo}'
        WHERE idColaborador = '${id}';        
        `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            UPDATE Usuario AS u SET u.cargo = '${cargo}' WHERE idColaborador = '${id}';
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function deletar(id) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
            DELETE FROM Usuario where idColaborador = '${id}';
        `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            DELETE FROM Usuario where idColaborador = '${id}';
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function deletarUsuario(id) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        delete from Usuario where fkEmpresa = '${id}';
        `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        delete from usuario where fkEmpresa = '${id}';
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo,
    autenticar,
    cadastrar,
    editar,
    selecionarDadosGerais,
    buscarDadosEmpresaPermissao,
    editarNome,
    editarEmail,
    editarCpf,
    editarCargo,
    deletar,
    deletarUsuario,
    selecionarTudoPerEmpresa
};