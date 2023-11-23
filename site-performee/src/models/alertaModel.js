var database = require("../database/config")

function selecionarTudo() {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT * FROM Alerta;
    `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function selecionarAlertasPerEstado() {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT
    ROUND(COUNT(DISTINCT CASE WHEN TipoAlerta.Tipo_Alerta = 'Estável' THEN s.ipServidor END) / COUNT(DISTINCT s.ipServidor) * 100, 2) AS Estavel,
    ROUND(COUNT(DISTINCT CASE WHEN TipoAlerta.Tipo_Alerta = 'Cuidado' THEN s.ipServidor END) / COUNT(DISTINCT s.ipServidor) * 100, 2) AS Cuidado,
    ROUND(COUNT(DISTINCT CASE WHEN TipoAlerta.Tipo_Alerta = 'Em risco' THEN s.ipServidor END) / COUNT(DISTINCT s.ipServidor) * 100, 2) AS EmRisco
FROM
    (
        SELECT 'Estável' AS Tipo_Alerta, 1 AS Prioridade UNION
        SELECT 'Cuidado', 2 UNION
        SELECT 'Em risco', 3
    ) TipoAlerta
LEFT JOIN Servidor s ON 1 = 1
LEFT JOIN (
    SELECT
        a.fkServidor,
        MAX(CASE WHEN a.tipo = 'Em risco' THEN 3 WHEN a.tipo = 'Cuidado' THEN 2 WHEN a.tipo = 'Estável' THEN 1 ELSE 0 END) AS Prioridade
    FROM
        alerta a
    JOIN Componente c ON a.fkComponente = c.idComponente
    JOIN Servidor s ON c.fkServidor = s.ipServidor
    WHERE
        DATE(a.dataAlerta) = CURDATE()
    GROUP BY
        a.fkServidor
) PrioridadeAlerta ON s.ipServidor = PrioridadeAlerta.fkServidor
WHERE
    COALESCE(PrioridadeAlerta.Prioridade, 0) = TipoAlerta.Prioridade
    AND s.ativo = 1;     
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function selecionarAlertasPerEstadoPerEmpresa(idEmpresa) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT
    ROUND(COUNT(DISTINCT CASE WHEN TipoAlerta.Tipo_Alerta = 'Estável' THEN s.ipServidor END) / COUNT(DISTINCT s.ipServidor) * 100, 2) AS Estavel,
    ROUND(COUNT(DISTINCT CASE WHEN TipoAlerta.Tipo_Alerta = 'Cuidado' THEN s.ipServidor END) / COUNT(DISTINCT s.ipServidor) * 100, 2) AS Cuidado,
    ROUND(COUNT(DISTINCT CASE WHEN TipoAlerta.Tipo_Alerta = 'Em risco' THEN s.ipServidor END) / COUNT(DISTINCT s.ipServidor) * 100, 2) AS EmRisco
FROM
    (
        SELECT 'Estável' AS Tipo_Alerta, 1 AS Prioridade UNION
        SELECT 'Cuidado', 2 UNION
        SELECT 'Em risco', 3
    ) TipoAlerta
LEFT JOIN Servidor s ON 1 = 1
LEFT JOIN (
    SELECT
        a.fkServidor,
        MAX(CASE WHEN a.tipo = 'Em risco' THEN 3 WHEN a.tipo = 'Cuidado' THEN 2 WHEN a.tipo = 'Estável' THEN 1 ELSE 0 END) AS Prioridade
    FROM
        alerta a
    JOIN Componente c ON a.fkComponente = c.idComponente
    JOIN Servidor s ON c.fkServidor = s.ipServidor
    WHERE
        s.fkEmpresa = ${idEmpresa} 
    GROUP BY
        a.fkServidor
) PrioridadeAlerta ON s.ipServidor = PrioridadeAlerta.fkServidor
LEFT JOIN leitura l ON s.ipServidor = l.fkServidor
WHERE
    COALESCE(DATE(l.dataLeitura), CURDATE()) = CURDATE()
    AND COALESCE(PrioridadeAlerta.Prioridade, 0) = TipoAlerta.Prioridade
    AND PrioridadeAlerta.Prioridade <> 3; 
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function deletarAlerta(tipo, id) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (tipo == 'DC') {
            var instrucao = `
        delete from alerta where fkDataCenter = '${id}';
        `;
        } else if (tipo == 'Server') {
            var instrucao = `
            delete from alerta where fkServidor = '${id}';
            `;
        }
        else {
            var instrucao = `
        delete from alerta where fkEmpresa = '${id}';
        `;
        }
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function exibirTodosLogs(condicao) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        switch (condicao) {
            case '1': {
                var instrucao = `
                SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa ORDER BY FIELD(a.tipo, 'Em risco', 'Cuidado', 'Estável');
                `;
                break;
            }
            case '2': {
                var instrucao = `
                SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa ORDER BY a.dataAlerta DESC;
            `;
                break;
            }
            case '3': {
                var instrucao = `
                SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa ORDER BY a.dataAlerta;
            `;
                break;
            }
            case '4': {
                var instrucao = `
                SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa ORDER BY e.razaoSocial;
                `;
                break;
            }
            case '5': {
                var instrucao = `
                SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa ORDER BY dt.nome;
                `;
                break;
            }
            case '6': {
                var instrucao = `
                SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa ORDER BY s.hostname;
                `;
                break;
            }
        }
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function exibirTodosLogsPerEmpresa(condicao, idEmpresa) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        switch (condicao) {
            case '1': {
                var instrucao = `
                SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
                INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa 
                    WHERE e.idEmpresa = ${idEmpresa} ORDER BY FIELD(a.tipo, 'Em risco', 'Cuidado', 'Estável');
                `;
                break;
            }
            case '2': {
                var instrucao = `
                SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
                INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa 
                    WHERE e.idEmpresa = ${idEmpresa} ORDER BY a.dataAlerta DESC;
                `;
                break;
            }
            case '3': {
                var instrucao = `
                SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
                INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa 
                    WHERE e.idEmpresa = ${idEmpresa} ORDER BY a.dataAlerta;
                `;
                break;
            }
            case '4': {
                var instrucao = `
                SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
                INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa 
                    WHERE e.idEmpresa = ${idEmpresa} ORDER BY e.razaoSocial;
                `;
                break;
            }
            case '5': {
                var instrucao = `
                SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
                INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa 
                    WHERE e.idEmpresa = ${idEmpresa} ORDER BY dt.nome;
                `;
                break;
            }
            case '6': {
                var instrucao = `
                SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
                INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa 
                    WHERE e.idEmpresa = ${idEmpresa} ORDER BY s.hostname;
                `;
                break;
            }
        }
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function exibirLogsPerDCenter(idDataCenter, condicao) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        switch (condicao) {
            case '1': {
                var instrucao = `
                SELECT s.hostname, c.tipo as componente, a.descricao, a.tipo as tipoAlerta, a.dataAlerta FROM Alerta as a 
                INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor 
                INNER JOIN Componente as c ON c.fkServidor = s.ipServidor 
                INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
                    WHERE dt.idDataCenter = ${idDataCenter} ORDER BY FIELD(a.tipo, 'Em risco', 'Cuidado', 'Estável');        
                    `;
                break;
            }
            case '2': {
                var instrucao = `
                SELECT s.hostname, c.tipo as componente, a.descricao, a.tipo as tipoAlerta, a.dataAlerta FROM Alerta as a 
                INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor 
                INNER JOIN Componente as c ON c.fkServidor = s.ipServidor 
                INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
                    WHERE dt.idDataCenter = ${idDataCenter} ORDER BY a.dataAlerta DESC;    
                    `;
                break;
            }
            case '3': {
                var instrucao = `
                SELECT s.hostname, c.tipo as componente, a.descricao, a.tipo as tipoAlerta, a.dataAlerta FROM Alerta as a 
                INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor 
                INNER JOIN Componente as c ON c.fkServidor = s.ipServidor 
                INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
                    WHERE dt.idDataCenter = ${idDataCenter} ORDER BY a.dataAlerta;    
                    `;
                break;
            }
            case '4': {
                var instrucao = `
                SELECT s.hostname, c.tipo as componente, a.descricao, a.tipo as tipoAlerta, a.dataAlerta FROM Alerta as a 
                INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor 
                INNER JOIN Componente as c ON c.fkServidor = s.ipServidor 
                INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
                WHERE dt.idDataCenter = ${idDataCenter} ORDER BY s.hostname;
                `;
                break;
            }
        }
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function exibirLogsPerServidor(ipServidor, condicao) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        switch (condicao) {
            case '1': {
                var instrucao = `
                SELECT c.modelo as componente, a.tipo as tipoAlerta, a.descricao, a.dataAlerta FROM Alerta as a 
                INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor 
                INNER JOIN Componente as c ON c.fkServidor = s.ipServidor 
                    WHERE s.ipServidor = '${ipServidor}' ORDER BY FIELD(a.tipo, 'Em risco', 'Cuidado', 'Estável') LIMIT 100;
                `;
                break;
            }
            case '2': {
                var instrucao = `
                SELECT c.modelo as componente, a.tipo as tipoAlerta, a.descricao, a.dataAlerta FROM Alerta as a 
                INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor 
                INNER JOIN Componente as c ON c.fkServidor = s.ipServidor 
                    WHERE s.ipServidor = '${ipServidor}' ORDER BY a.dataAlerta DESC LIMIT 100;
                `;
                break;
            }
            case '3': {
                var instrucao = `
                SELECT c.modelo as componente, a.tipo as tipoAlerta, a.descricao, a.dataAlerta FROM Alerta as a 
                INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor 
                INNER JOIN Componente as c ON c.fkServidor = s.ipServidor 
                    WHERE s.ipServidor = '${ipServidor}' ORDER BY a.dataAlerta LIMIT 100;
                `;
                break;
            }
        }
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function exibirQtdStatusPerDCenter(idDataCenter) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT
    TipoAlerta.Tipo_Alerta,
    COUNT(DISTINCT s.ipServidor) AS Quantidade
FROM
    (
        SELECT 'Estável' AS Tipo_Alerta, 1 AS Prioridade UNION
        SELECT 'Cuidado', 2 UNION
        SELECT 'Em risco', 3
    ) TipoAlerta
LEFT JOIN Servidor s ON 1 = 1
LEFT JOIN (
    SELECT
        a.fkServidor,
        MAX(CASE WHEN a.tipo = 'Em risco' THEN 3 WHEN a.tipo = 'Cuidado' THEN 2 WHEN a.tipo = 'Estável' THEN 1 ELSE 0 END) AS Prioridade
    FROM
        alerta a
    JOIN Componente c ON a.fkComponente = c.idComponente
    JOIN Servidor s ON c.fkServidor = s.ipServidor
    WHERE
        s.fkDataCenter = ${idDataCenter}
    GROUP BY
        a.fkServidor
) PrioridadeAlerta ON s.ipServidor = PrioridadeAlerta.fkServidor
WHERE
    COALESCE(PrioridadeAlerta.Prioridade, 0) = TipoAlerta.Prioridade
GROUP BY
    TipoAlerta.Tipo_Alerta
ORDER BY
    MIN(TipoAlerta.Prioridade);
    `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function qtdServerInstavel() {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT
        DATE_SUB(CURDATE(), INTERVAL n DAY) AS Data,
        COUNT(DISTINCT s.ipServidor) AS EmRisco
    FROM
        Servidor s
    CROSS JOIN (
        SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6
    ) AS Numbers
    LEFT JOIN (
        SELECT
            a.fkServidor,
            MAX(CASE WHEN a.tipo = 'Em risco' THEN 3 WHEN a.tipo = 'Cuidado' THEN 2 WHEN a.tipo = 'Estável' THEN 1 ELSE 0 END) AS Prioridade
        FROM
            alerta a
        JOIN Componente c ON a.fkComponente = c.idComponente
        JOIN Servidor s ON c.fkServidor = s.ipServidor
        WHERE
            DATE(a.dataAlerta) >= CURDATE() - INTERVAL 6 DAY
            AND DATE(a.dataAlerta) <= CURDATE()
        GROUP BY
            a.fkServidor
    ) PrioridadeAlerta ON s.ipServidor = PrioridadeAlerta.fkServidor
    WHERE
        PrioridadeAlerta.Prioridade = 3
    GROUP BY
        Data
    ORDER BY
        Data;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function qtdServerInstavelPerEmpresa(idEmpresa) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT
        DATE_SUB(CURDATE(), INTERVAL n DAY) AS Data,
        COUNT(DISTINCT s.ipServidor) AS EmRisco
    FROM
        Servidor s
    CROSS JOIN (
        SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6
    ) AS Numbers
    LEFT JOIN (
        SELECT
            a.fkServidor,
            MAX(CASE WHEN a.tipo = 'Em risco' THEN 3 WHEN a.tipo = 'Cuidado' THEN 2 WHEN a.tipo = 'Estável' THEN 1 ELSE 0 END) AS Prioridade
        FROM
            alerta a
        JOIN Componente c ON a.fkComponente = c.idComponente
        JOIN Servidor s ON c.fkServidor = s.ipServidor
        WHERE
            DATE(a.dataAlerta) >= CURDATE() - INTERVAL 6 DAY
            AND DATE(a.dataAlerta) <= CURDATE()
        GROUP BY
            a.fkServidor
    ) PrioridadeAlerta ON s.ipServidor = PrioridadeAlerta.fkServidor
    WHERE
        PrioridadeAlerta.Prioridade = 3
        AND s.fkEmpresa = ${idEmpresa}
    GROUP BY
        Data
    ORDER BY
        Data;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function qtdAlertasPerCpu(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT
            a.tipo,
            COUNT(*) AS quantidade
            FROM
            alerta a
            INNER JOIN Componente c ON a.fkComponente = c.idComponente
            INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
            WHERE
            s.ipServidor = '${ipServidor}'
            AND c.tipo = 'CPU'
            AND DATE(a.dataAlerta) = CURDATE()
            GROUP BY
            a.tipo
            ORDER BY FIELD(a.tipo, 'Estável', 'Cuidado', 'Em risco');
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function qtdAlertasPerRam(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT
            a.tipo,
            COUNT(*) AS quantidade
            FROM
            alerta a
            INNER JOIN Componente c ON a.fkComponente = c.idComponente
            INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
            WHERE
            s.ipServidor = '${ipServidor}'
            AND c.tipo = 'RAM'
            AND DATE(a.dataAlerta) = CURDATE()
            GROUP BY
            a.tipo
            ORDER BY FIELD(a.tipo, 'Estável', 'Cuidado', 'Em risco');
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function qtdAlertasPerDisco(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT
            a.tipo,
            COUNT(*) AS quantidade
            FROM
            alerta a
            INNER JOIN Componente c ON a.fkComponente = c.idComponente
            INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
            WHERE
            s.ipServidor = '${ipServidor}'
            AND c.tipo = 'Disco'
            AND DATE(a.dataAlerta) = CURDATE()
            GROUP BY
            a.tipo
            ORDER BY FIELD(a.tipo, 'Estável', 'Cuidado', 'Em risco');
    `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function qtdAlertasPerRede(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
    SELECT
    a.tipo,
    COUNT(*) AS quantidade
FROM
    alerta a
    INNER JOIN Componente c ON a.fkComponente = c.idComponente
    INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
WHERE
    s.ipServidor = '${ipServidor}'
    AND c.tipo = 'Rede'
    AND DATE(a.dataAlerta) = CURDATE()
GROUP BY
    a.tipo
ORDER BY FIELD(a.tipo, 'Estável', 'Cuidado', 'Em risco');
    `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function statusComponentesPerSemana(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        WITH RankedAlertas AS (
            SELECT
                c.tipo AS tipoComponente,
                a.tipo AS tipoAlerta,
                COUNT(*) AS qtdAlertas,
                ROW_NUMBER() OVER (PARTITION BY c.tipo ORDER BY COUNT(*) DESC) AS RowRank
            FROM
                alerta a
                JOIN Componente c ON a.fkComponente = c.idComponente
            WHERE
                c.fkServidor = '${ipServidor}'
                AND a.dataAlerta >= CURDATE() - INTERVAL 7 DAY
            GROUP BY
                c.tipo, a.tipo
            ORDER BY FIELD (c.tipo, 'CPU', 'RAM', 'Disco', 'Rede', 'GPU')
        )
        SELECT
            tipoComponente,
            tipoAlerta,
            qtdAlertas
        FROM
            RankedAlertas
        WHERE
            RowRank = 1;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
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
    exibirLogsPerServidor,
    qtdAlertasPerCpu,
    qtdAlertasPerRam,
    qtdAlertasPerDisco,
    qtdAlertasPerRede,
    statusComponentesPerSemana
};