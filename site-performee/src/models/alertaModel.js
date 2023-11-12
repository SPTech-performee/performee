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

function exibirTodosLogs(condicao) {
    switch (condicao) {
        case '1': {
            var instrucao = `
            SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa ORDER BY FIELD(a.tipo, 'Em risco', 'Cuidado', 'Estável');
            `;
            return database.executar(instrucao);
        }
        case '2': {
            var instrucao = `
            SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa ORDER BY a.dataAlerta DESC;
        `;
            return database.executar(instrucao);
        }
        case '3': {
            var instrucao = `
            SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa ORDER BY a.dataAlerta;
        `;
            return database.executar(instrucao);
        }
        case '4': {
            var instrucao = `
            SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa ORDER BY e.razaoSocial;
            `;
            return database.executar(instrucao);
        }
        case '5': {
            var instrucao = `
            SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa ORDER BY dt.nome;
            `;
            return database.executar(instrucao);
        }
        case '6': {
            var instrucao = `
            SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa ORDER BY s.hostname;
            `;
            return database.executar(instrucao);
        }
    }
}

function exibirLogsPerDCenter(idDataCenter, condicao) {
    switch (condicao) {
        case '1': {
            var instrucao = `
            SELECT s.hostname, c.tipo as componente, a.descricao, a.tipo as tipoAlerta, a.dataAlerta FROM Alerta as a 
            INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor 
            INNER JOIN Componente as c ON c.fkServidor = s.ipServidor 
            INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
                WHERE dt.idDataCenter = ${idDataCenter} ORDER BY FIELD(a.tipo, 'Em risco', 'Cuidado', 'Estável');            `;
            return database.executar(instrucao);
        }
        case '2': {
            var instrucao = `
            SELECT s.hostname, c.tipo as componente, a.descricao, a.tipo as tipoAlerta, a.dataAlerta FROM Alerta as a 
            INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor 
            INNER JOIN Componente as c ON c.fkServidor = s.ipServidor 
            INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
                WHERE dt.idDataCenter = ${idDataCenter} ORDER BY a.dataAlerta DESC;        `;
            return database.executar(instrucao);
        }
        case '3': {
            var instrucao = `
            SELECT s.hostname, c.tipo as componente, a.descricao, a.tipo as tipoAlerta, a.dataAlerta FROM Alerta as a 
            INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor 
            INNER JOIN Componente as c ON c.fkServidor = s.ipServidor 
            INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
                WHERE dt.idDataCenter = ${idDataCenter} ORDER BY a.dataAlerta;        `;
            return database.executar(instrucao);
        }
        case '4': {
            var instrucao = `
            SELECT s.hostname, c.tipo as componente, a.descricao, a.tipo as tipoAlerta, a.dataAlerta FROM Alerta as a 
            INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor 
            INNER JOIN Componente as c ON c.fkServidor = s.ipServidor 
            INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
            WHERE dt.idDataCenter = ${idDataCenter} ORDER BY s.hostname;
            `;
            return database.executar(instrucao);
        }
    }
}

module.exports = {
    selecionarTudo,
    selecionarAlertasPerEstado,
    deletarAlerta,
    exibirTodosLogs,
    exibirLogsPerDCenter
};