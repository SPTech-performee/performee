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
    tipo,
    ROUND((COUNT(DISTINCT fkServidor) / TotalServidoresDiaAtual) * 100, 2) AS Porcentagem
    FROM (
    SELECT
        fkServidor,
        tipo
    FROM
        alerta
    WHERE
        dataAlerta = CURDATE()
    ) AS AlertasDiaAtual
    CROSS JOIN (
    SELECT
        COUNT(DISTINCT fkServidor) AS TotalServidoresDiaAtual
    FROM
        alerta
    WHERE
        dataAlerta = CURDATE()
    ) AS TotalServidores
    GROUP BY
    tipo, TotalServidoresDiaAtual
    ORDER BY FIELD(tipo, 'Estável', 'Cuidado', 'Em risco');
    `;
    return database.executar(instrucao);
}

function selecionarAlertasPerEstadoPerEmpresa(idEmpresa) {
    var instrucao = `
    SELECT
    tipo,
    ROUND((COUNT(DISTINCT fkServidor) / TotalServidoresDiaAtual) * 100, 2) AS Porcentagem
    FROM (
    SELECT
        a.fkServidor,
        a.tipo
    FROM
        alerta a
        JOIN Servidor s ON a.fkServidor = s.ipServidor
    WHERE
        a.dataAlerta = CURDATE()
        AND s.fkEmpresa = ${idEmpresa}
    ) AS AlertasDiaAtual
    CROSS JOIN (
    SELECT
        COUNT(DISTINCT fkServidor) AS TotalServidoresDiaAtual
    FROM
        alerta a
        JOIN Servidor s ON a.fkServidor = s.ipServidor
    WHERE
        a.dataAlerta = CURDATE()
        AND s.fkEmpresa = ${idEmpresa}
    ) AS TotalServidores
    GROUP BY
    tipo, TotalServidoresDiaAtual
    ORDER BY FIELD(tipo, 'Estável', 'Cuidado', 'Em risco');
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

function exibirTodosLogsPerEmpresa(condicao, idEmpresa) {
    switch (condicao) {
        case '1': {
            var instrucao = `
            SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
            INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa 
                WHERE e.idEmpresa = ${idEmpresa} ORDER BY FIELD(a.tipo, 'Em risco', 'Cuidado', 'Estável');
            `;
            return database.executar(instrucao);
        }
        case '2': {
            var instrucao = `
            SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
            INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa 
                WHERE e.idEmpresa = ${idEmpresa} ORDER BY a.dataAlerta DESC;
            `;
            return database.executar(instrucao);
        }
        case '3': {
            var instrucao = `
            SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
            INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa 
                WHERE e.idEmpresa = ${idEmpresa} ORDER BY a.dataAlerta;
            `;
            return database.executar(instrucao);
        }
        case '4': {
            var instrucao = `
            SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
            INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa 
                WHERE e.idEmpresa = ${idEmpresa} ORDER BY e.razaoSocial;
            `;
            return database.executar(instrucao);
        }
        case '5': {
            var instrucao = `
            SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
            INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa 
                WHERE e.idEmpresa = ${idEmpresa} ORDER BY dt.nome;
            `;
            return database.executar(instrucao);
        }
        case '6': {
            var instrucao = `
            SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
            INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa 
                WHERE e.idEmpresa = ${idEmpresa} ORDER BY s.hostname;
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

function exibirLogsPerServidor(ipServidor, condicao) {
    switch (condicao) {
        case '1': {
            var instrucao = `
            SELECT c.tipo as componente, a.tipo as tipoAlerta, a.descricao, a.dataAlerta FROM Alerta as a 
            INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor 
            INNER JOIN Componente as c ON c.fkServidor = s.ipServidor 
                WHERE s.ipServidor = '${ipServidor}' ORDER BY FIELD(a.tipo, 'Em risco', 'Cuidado', 'Estável') LIMIT 100;
            `;
            return database.executar(instrucao);
        }
        case '2': {
            var instrucao = `
            SELECT c.tipo as componente, a.tipo as tipoAlerta, a.descricao, a.dataAlerta FROM Alerta as a 
            INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor 
            INNER JOIN Componente as c ON c.fkServidor = s.ipServidor 
                WHERE s.ipServidor = '${ipServidor}' ORDER BY a.dataAlerta DESC LIMIT 100;
            `;
            return database.executar(instrucao);
        }
        case '3': {
            var instrucao = `
            SELECT c.tipo as componente, a.tipo as tipoAlerta, a.descricao, a.dataAlerta FROM Alerta as a 
            INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor 
            INNER JOIN Componente as c ON c.fkServidor = s.ipServidor 
                WHERE s.ipServidor = '${ipServidor}' ORDER BY a.dataAlerta LIMIT 100;
            `;
            return database.executar(instrucao);
        }
    }
}

function exibirQtdStatusPerDCenter(idDataCenter) {
    var instrucao = `
    SELECT
    tipo,
    COUNT(*) AS quantidade
FROM
    alerta a
    INNER JOIN Servidor s ON a.fkServidor = s.ipServidor
    INNER JOIN DataCenter dc ON s.fkDataCenter = dc.idDataCenter
WHERE
    dc.idDataCenter = ${idDataCenter} 
    AND DATE(a.dataAlerta) = CURDATE()
    AND a.tipo IN ('Estável', 'Cuidado', 'Em risco')
GROUP BY
    tipo
ORDER BY FIELD(a.tipo, 'Estável', 'Cuidado', 'Em risco');
    `;
    return database.executar(instrucao);
}

function qtdServerInstavel() {
    var instrucao = `
    SELECT
    DATE_FORMAT(CURDATE(), '%Y-%m-%d') AS 'Dia Atual',
    COUNT(DISTINCT fkServidor) AS qtdServers
FROM
    alerta
WHERE
    tipo = 'Em risco'
    AND dataAlerta = CURDATE()

UNION

SELECT
    DATE_FORMAT(CURDATE() - INTERVAL 1 DAY, '%Y-%m-%d') AS '1 Dia Antes',
    COUNT(DISTINCT fkServidor) AS diaAtras1
FROM
    alerta
WHERE
    tipo = 'Em risco'
    AND dataAlerta = CURDATE() - INTERVAL 1 DAY

UNION

SELECT
    DATE_FORMAT(CURDATE() - INTERVAL 2 DAY, '%Y-%m-%d') AS '2 Dias Antes',
    COUNT(DISTINCT fkServidor) AS diaAtras2
FROM
    alerta
WHERE
    tipo = 'Em risco'
    AND dataAlerta = CURDATE() - INTERVAL 2 DAY

UNION

SELECT
    DATE_FORMAT(CURDATE() - INTERVAL 3 DAY, '%Y-%m-%d') AS '3 Dias Antes',
    COUNT(DISTINCT fkServidor) AS diaAtras3
FROM
    alerta
WHERE
    tipo = 'Em risco'
    AND dataAlerta = CURDATE() - INTERVAL 3 DAY

UNION

SELECT
    DATE_FORMAT(CURDATE() - INTERVAL 4 DAY, '%Y-%m-%d') AS '4 Dias Antes',
    COUNT(DISTINCT fkServidor) AS diaAtras4
FROM
    alerta
WHERE
    tipo = 'Em risco'
    AND dataAlerta = CURDATE() - INTERVAL 4 DAY

UNION

SELECT
    DATE_FORMAT(CURDATE() - INTERVAL 5 DAY, '%Y-%m-%d') AS '5 Dias Antes',
    COUNT(DISTINCT fkServidor) AS diaAtras5
FROM
    alerta
WHERE
    tipo = 'Em risco'
    AND dataAlerta = CURDATE() - INTERVAL 5 DAY

UNION

SELECT
    DATE_FORMAT(CURDATE() - INTERVAL 6 DAY, '%Y-%m-%d') AS '6 Dias Antes',
    COUNT(DISTINCT fkServidor) AS diaAtras6
FROM
    alerta
WHERE
    tipo = 'Em risco'
    AND dataAlerta = CURDATE() - INTERVAL 6 DAY; 
    `;
    return database.executar(instrucao);
}

function qtdServerInstavelPerEmpresa(idEmpresa) {
    var instrucao = `
    SELECT
    DATE_FORMAT(CURDATE(), '%Y-%m-%d') AS 'Dia Atual',
    COUNT(DISTINCT a.fkServidor) AS qtdServers
FROM
    alerta a
    JOIN Servidor s ON a.fkServidor = s.ipServidor
WHERE
    a.tipo = 'Em risco'
    AND a.dataAlerta = CURDATE()
    AND s.fkEmpresa = ${idEmpresa}

UNION

SELECT
    DATE_FORMAT(CURDATE() - INTERVAL 1 DAY, '%Y-%m-%d') AS '1 Dia Antes',
    COUNT(DISTINCT a.fkServidor) AS diaAtras1
FROM
    alerta a
    JOIN Servidor s ON a.fkServidor = s.ipServidor
WHERE
    a.tipo = 'Em risco'
    AND a.dataAlerta = CURDATE() - INTERVAL 1 DAY
    AND s.fkEmpresa = ${idEmpresa}

UNION

SELECT
    DATE_FORMAT(CURDATE() - INTERVAL 2 DAY, '%Y-%m-%d') AS '2 Dias Antes',
    COUNT(DISTINCT a.fkServidor) AS diaAtras2
FROM
    alerta a
    JOIN Servidor s ON a.fkServidor = s.ipServidor
WHERE
    a.tipo = 'Em risco'
    AND a.dataAlerta = CURDATE() - INTERVAL 2 DAY
    AND s.fkEmpresa = ${idEmpresa}

UNION

SELECT
    DATE_FORMAT(CURDATE() - INTERVAL 3 DAY, '%Y-%m-%d') AS '3 Dias Antes',
    COUNT(DISTINCT a.fkServidor) AS diaAtras3
FROM
    alerta a
    JOIN Servidor s ON a.fkServidor = s.ipServidor
WHERE
    a.tipo = 'Em risco'
    AND a.dataAlerta = CURDATE() - INTERVAL 3 DAY
    AND s.fkEmpresa = ${idEmpresa}

UNION

SELECT
    DATE_FORMAT(CURDATE() - INTERVAL 4 DAY, '%Y-%m-%d') AS '4 Dias Antes',
    COUNT(DISTINCT a.fkServidor) AS diaAtras4
FROM
    alerta a
    JOIN Servidor s ON a.fkServidor = s.ipServidor
WHERE
    a.tipo = 'Em risco'
    AND a.dataAlerta = CURDATE() - INTERVAL 4 DAY
    AND s.fkEmpresa = ${idEmpresa}

UNION

SELECT
    DATE_FORMAT(CURDATE() - INTERVAL 5 DAY, '%Y-%m-%d') AS '5 Dias Antes',
    COUNT(DISTINCT a.fkServidor) AS diaAtras5
FROM
    alerta a
    JOIN Servidor s ON a.fkServidor = s.ipServidor
WHERE
    a.tipo = 'Em risco'
    AND a.dataAlerta = CURDATE() - INTERVAL 5 DAY
    AND s.fkEmpresa = ${idEmpresa}

UNION

SELECT
    DATE_FORMAT(CURDATE() - INTERVAL 6 DAY, '%Y-%m-%d') AS '6 Dias Antes',
    COUNT(DISTINCT a.fkServidor) AS diaAtras6
FROM
    alerta a
    JOIN Servidor s ON a.fkServidor = s.ipServidor
WHERE
    a.tipo = 'Em risco'
    AND a.dataAlerta = CURDATE() - INTERVAL 6 DAY
    AND s.fkEmpresa = ${idEmpresa};
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
    qtdServerInstavel,
    qtdServerInstavelPerEmpresa,
    selecionarAlertasPerEstadoPerEmpresa,
    exibirTodosLogsPerEmpresa,
    exibirLogsPerServidor
};