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

module.exports = {
    selecionarTudo,
    selecionarAlertasPerEstado
};