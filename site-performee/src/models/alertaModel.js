var database = require("../database/config")

function selecionarTudo() {
    var instrucao = `
        SELECT * FROM Alerta;
    `;
    return database.executar(instrucao);
}

function selecionarAlertasPerEstado() {
    var instrucao = `
        SELECT (select count(idAlerta) from Alerta) as qtdTotalAlertas,(select count(tipo) from Alerta WHERE tipo = 'Estável') AS qtdAlertasEstavel, (select count(tipo) from Alerta WHERE tipo = 'Cuidado') AS qtdAlertasCuidado, (select count(tipo) from Alerta WHERE tipo = 'Em risco') AS qtdAlertasRisco FROM Alerta GROUP BY qtdAlertasEstavel, qtdAlertasCuidado, qtdAlertasRisco;
    `;
    return database.executar(instrucao);
}

function deletarAlerta(tipo, id) {
    if (tipo == 'DC') {
        var instrucao = `
    delete from alerta where fkDataCenter = '${id}';
    `;
        return database.executar(instrucao);
    } else if (tipo == 'Server') {

        var instrucao = `
        delete from alerta where fkServidor = '${id}';
        `;
            return database.executar(instrucao);
    }
    else {
        var instrucao = `
    delete from alerta where fkEmpresa = '${id}';
    `;
        return database.executar(instrucao);
    }

}

module.exports = {
    selecionarTudo,
    selecionarAlertasPerEstado,
    deletarAlerta
};