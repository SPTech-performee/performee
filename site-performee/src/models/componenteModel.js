var database = require("../database/config")

function selecionarTudo() {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT * FROM Componente;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function deletarComponente(tipo, id) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (tipo == 'DC') {
            var instrucao = `
            delete from Componente where fkDataCenter = '${id}';
            `;
        } else if (tipo == 'Server') {
            var instrucao = `
        delete from Componente where fkServidor = '${id}';
        `;
        }
        else {
            var instrucao = `
        delete from Componente where fkEmpresa = '${id}';
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
    deletarComponente
};