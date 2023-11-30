var database = require("../database/config")

function selecionarTudo() {
    if (process.env.AMBIENTE_PROCESSO == "producao") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT * FROM EnderecoDataCenter;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function cadastrar(pais, estado, cidade, cep, bairro, numero, complemento, fkDataCenter) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {

        var instrucao = `
            INSERT INTO EnderecoDataCenter (pais, estado, cidade, cep, bairro, numero, complemento, fkDataCenter) 
            VALUES 
            ('${pais}', '${estado}', '${cidade}', '${cep}', '${bairro}', '${numero}', '${complemento}', ${fkDataCenter});
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            INSERT INTO EnderecoDataCenter (pais, estado, cidade, cep, bairro, numero, complemento, fkDataCenter) VALUES ('${pais}', '${estado}', '${cidade}','${cep}','${bairro}', '${numero}', '${complemento}', '${fkDataCenter}');
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function editar(pais, estado, cidade, cep, bairro, numero, complemento, fkDataCenter) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            UPDATE EnderecoDataCenter AS e SET e.pais = '${pais}', e.estado = '${estado}', e.cidade = '${cidade}', e.cep = '${cep}', e.bairro = "${bairro}", e.numero = '${numero}', e.complemento = '${complemento}' WHERE fkDataCenter = '${fkDataCenter}';
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function deletarEnderecoDataCenter(tipo, id) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        if (tipo == 'DC') {
            var instrucao = `
            DELETE FROM EnderecoDataCenter 
            WHERE fkDatacenter IN (SELECT idDataCenter FROM DataCenter WHERE idDataCenter = '${id}');
            
            `;
        }
        else {
            var instrucao = `
            DELETE FROM EnderecoDataCenter 
            WHERE fkDatacenter IN (SELECT idDataCenter FROM DataCenter WHERE fkEmpresa = '${id}');
            
            `;
        }
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (tipo == 'DC') {
            var instrucao = `
                delete from enderecoDataCenter where fkDatacenter IN (select idDataCenter from datacenter where idDataCenter = '${id}');
            `;
        }
        else {
            var instrucao = `
                delete from enderecoDataCenter where fkDatacenter IN (select idDataCenter from datacenter where fkEmpresa = '${id}');
            `;
        }
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo,
    editar,
    cadastrar,
    deletarEnderecoDataCenter
};