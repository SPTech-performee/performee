var database = require("../database/config")

function selecionarTudo() {
    var instrucao = `
        SELECT * FROM Alerta;
    `;
    return database.executar(instrucao);
}

function selecionarAlertasPerEstado() {
    var instrucao = `
    SELECT 
        (select count(idAlerta) from Alerta WHERE dataAlerta = (SELECT MAX(a.dataAlerta) FROM Alerta as a)) as qtdTotalAlertas, 
        (select count(tipo) from Alerta WHERE dataAlerta = (SELECT MAX(a.dataAlerta) FROM Alerta as a) and tipo = 'Estável') AS qtdAlertasEstavel, 
        (select count(tipo) from Alerta WHERE dataAlerta = (SELECT MAX(a.dataAlerta) FROM Alerta as a) and tipo = 'Cuidado') AS qtdAlertasCuidado, 
        (select count(tipo) from Alerta WHERE dataAlerta = (SELECT MAX(a.dataAlerta) FROM Alerta as a) and tipo = 'Em risco') AS qtdAlertasRisco 
    FROM Alerta GROUP BY qtdAlertasEstavel, qtdAlertasCuidado, qtdAlertasRisco;
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

function exibirQtdStatusPerDCenter(idDataCenter) {
    var instrucao = `
    SELECT 
    (
        CASE WHEN (select count(a.tipo) from Alerta as a inner join leitura as l on a.fkLeitura = l.idLeitura inner join componente as c on c.idComponente = l.fkComponente 
inner join Servidor as s on s.ipServidor = c.fkServidor inner join datacenter as dt on dt.idDataCenter = s.fkDataCenter where a.tipo = 'Estável' and dt.idDataCenter = ${idDataCenter} and (SELECT MAX(a.dataAlerta) FROM Alerta as a)) THEN (select count(a.tipo) from Alerta as a inner join leitura as l on a.fkLeitura = l.idLeitura inner join componente as c on c.idComponente = l.fkComponente 
inner join Servidor as s on s.ipServidor = c.fkServidor inner join datacenter as dt on dt.idDataCenter = s.fkDataCenter where a.tipo = 'Estável' and dt.idDataCenter = ${idDataCenter} and (SELECT MAX(a.dataAlerta) FROM Alerta as a)) ELSE 0 END) AS qtdAlertasEstavel, 
    
    (
        CASE WHEN (select count(a.tipo) from Alerta as a inner join leitura as l on a.fkLeitura = l.idLeitura inner join componente as c on c.idComponente = l.fkComponente 
inner join Servidor as s on s.ipServidor = c.fkServidor inner join datacenter as dt on dt.idDataCenter = s.fkDataCenter where a.tipo = 'Cuidado' and dt.idDataCenter = ${idDataCenter} and (SELECT MAX(a.dataAlerta) FROM Alerta as a)) THEN (select count(a.tipo) from Alerta as a inner join leitura as l on a.fkLeitura = l.idLeitura inner join componente as c on c.idComponente = l.fkComponente 
inner join Servidor as s on s.ipServidor = c.fkServidor inner join datacenter as dt on dt.idDataCenter = s.fkDataCenter where a.tipo = 'Cuidado' and dt.idDataCenter = ${idDataCenter} and (SELECT MAX(a.dataAlerta) FROM Alerta as a)) ELSE 0 END) AS qtdAlertasCuidado, 
    
    (
        CASE WHEN (select count(a.tipo) from Alerta as a inner join leitura as l on a.fkLeitura = l.idLeitura inner join componente as c on c.idComponente = l.fkComponente 
inner join Servidor as s on s.ipServidor = c.fkServidor inner join datacenter as dt on dt.idDataCenter = s.fkDataCenter where a.tipo = 'Em risco' and dt.idDataCenter = ${idDataCenter} and (SELECT MAX(a.dataAlerta) FROM Alerta as a)) THEN (select count(a.tipo) from Alerta as a inner join leitura as l on a.fkLeitura = l.idLeitura inner join componente as c on c.idComponente = l.fkComponente 
inner join Servidor as s on s.ipServidor = c.fkServidor inner join datacenter as dt on dt.idDataCenter = s.fkDataCenter where a.tipo = 'Em risco' and dt.idDataCenter = ${idDataCenter} and (SELECT MAX(a.dataAlerta) FROM Alerta as a)) ELSE 0 END) AS qtdAlertasRisco 
FROM Alerta as a INNER JOIN DataCenter as dt ON a.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter} GROUP BY qtdAlertasEstavel, qtdAlertasCuidado, qtdAlertasRisco;


    `;
    return database.executar(instrucao);
}

function qtdServerInstavel() {
    var instrucao = `
    SELECT 
        (select count(a.tipo) from Alerta as a 
            WHERE a.tipo = 'Em risco' AND 
                a.dataAlerta = ((SELECT MAX(a.dataAlerta) FROM Alerta as a))) as atual, 
        (select count(a.tipo) as 1diaAtras from Alerta as a 
            WHERE a.tipo = 'Em risco' AND 
                a.dataAlerta = (SELECT 
                                    (SELECT MAX(a.dataAlerta) - interval 1 day from Alerta as a) FROM Alerta as a 
                                        WHERE a.tipo = 'Em risco' order by a.dataAlerta DESC limit 1)) as diasAtras1, 
        (select count(a.tipo) from Alerta as a 
            WHERE a.tipo = 'Em risco' AND 
                a.dataAlerta = (SELECT 
                                    (SELECT MAX(a.dataAlerta) - interval 2 day from Alerta as a) FROM Alerta as a 
                                        WHERE a.tipo = 'Em risco' order by a.dataAlerta DESC limit 1)) as diasAtras2, 
        (select count(a.tipo) from Alerta as a 
            WHERE a.tipo = 'Em risco' AND 
                a.dataAlerta = (SELECT 
                                    (SELECT MAX(a.dataAlerta) - interval 3 day from Alerta as a) FROM Alerta as a 
                                        WHERE a.tipo = 'Em risco' order by a.dataAlerta DESC limit 1)) as diasAtras3, 
        (select count(a.tipo) from Alerta as a 
            WHERE a.tipo = 'Em risco' AND 
                a.dataAlerta = (SELECT 
                                    (SELECT MAX(a.dataAlerta) - interval 4 day from Alerta as a) FROM Alerta as a 
                                        WHERE a.tipo = 'Em risco' order by a.dataAlerta DESC limit 1)) as diasAtras4, 
        (select count(a.tipo) from Alerta as a 
            WHERE a.tipo = 'Em risco' AND 
                a.dataAlerta = (SELECT 
                                    (SELECT MAX(a.dataAlerta) - interval 5 day from Alerta as a) FROM Alerta as a 
                                        WHERE a.tipo = 'Em risco' order by a.dataAlerta DESC limit 1)) as diasAtras5, 
        (select count(a.tipo) from Alerta as a 
            WHERE a.tipo = 'Em risco' AND 
                a.dataAlerta = (SELECT 
                                    (SELECT MAX(a.dataAlerta) - interval 6 day from Alerta as a) FROM Alerta as a 
                                        WHERE a.tipo = 'Em risco' order by a.dataAlerta DESC limit 1)) as diasAtras6
    FROM Alerta as a group by atual; 
    `;
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo,
    selecionarAlertasPerEstado,
    deletarAlerta,
    exibirTodosLogs,
    exibirLogsPerDCenter,
    exibirQtdStatusPerDCenter,
    qtdServerInstavel
};