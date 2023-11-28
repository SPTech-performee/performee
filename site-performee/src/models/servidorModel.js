var database = require("../database/config")

function selecionarTudo() {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
            SELECT * FROM Servidor;
        `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT * FROM Servidor;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function cadastrar(ipServidor, hostName, sisOp, ativo, fkEmpresa, fkDataCenter) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        INSERT INTO Servidor (ipServidor, hostname, sisOp, ativo, fkEmpresa, fkDataCenter)
    VALUES ('${ipServidor}', '${hostName}', '${sisOp}', '${ativo}', '${fkEmpresa}', '${fkDataCenter}');
    `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            INSERT INTO Servidor (ipServidor, hostname, sisOp, ativo, fkEmpresa, fkDataCenter) VALUES ('${ipServidor}', '${hostName}', '${sisOp}','${ativo}','${fkEmpresa}', '${fkDataCenter}');
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
            SELECT * FROM Servidor WHERE fkEmpresa = ${idEmpresa};
        `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT * FROM Servidor WHERE fkEmpresa = ${idEmpresa};
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function editar(hostName, sisOp, ativo, hostNameAntigo, fkEmp) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        UPDATE Servidor
        SET 
            hostname = '${hostName}',
            sisOp = '${sisOp}',
            ativo = '${ativo}'
        WHERE fkEmpresa = '${fkEmp}' AND hostname = '${hostNameAntigo}';
    `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            UPDATE Servidor
                SET 
            hostname = '${hostName}',
            sisOp = '${sisOp}',
            ativo = '${ativo}'
                WHERE fkEmpresa = '${fkEmp}' and hostname = '${hostNameAntigo}';
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function selecionarDadosGerais(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT s.ipServidor, s.hostname, s.ativo, s.sisOp, s.fkEmpresa, dt.nome, e.razaoSocial, c.tipo, c.modelo, c.capacidadeTotal, uni.tipoMedida 
        FROM Servidor AS s 
        INNER JOIN DataCenter AS dt ON s.fkDataCenter = dt.idDataCenter 
        INNER JOIN Empresa AS e ON s.fkEmpresa = e.idEmpresa 
        LEFT JOIN Componente AS c ON c.fkServidor = s.ipServidor 
        LEFT JOIN UnidadeMedida AS uni ON c.fkMedida = uni.idUnidadeMedida 
        WHERE ipServidor = ${ipServidor};
    `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT s.ipServidor, s.hostname, s.ativo, s.sisOp, s.fkEmpresa, dt.nome, e.razaoSocial, c.tipo, c.modelo, c.capacidadeTotal, uni.tipoMedida FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON s.fkEmpresa = e.idEmpresa LEFT JOIN Componente as c ON c.fkServidor = s.ipServidor LEFT JOIN UnidadeMedida as uni ON c.fkMedida = uni.idUnidadeMedida WHERE ipServidor = ${ipServidor};
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function buscarQtdAtivosDesativados() {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT
    SUM(CASE WHEN s.ativo = 1 THEN 1 ELSE 0 END) AS Ativos,
    SUM(CASE WHEN PrioridadeAlerta.Prioridade = 3 AND s.ativo = 1 THEN 1 ELSE 0 END) AS EmRisco
FROM
    Servidor s
LEFT JOIN (
    SELECT
        a.fkServidor,
        MAX(CASE WHEN a.tipo = 'Em risco' THEN 3 WHEN a.tipo = 'Cuidado' THEN 2 WHEN a.tipo = 'Estável' THEN 1 ELSE 0 END) AS Prioridade
    FROM
        alerta a
    JOIN Componente c ON a.fkComponente = c.idComponente
    JOIN Servidor s ON c.fkServidor = s.ipServidor
    WHERE
        CONVERT(DATE, a.dataAlerta) = CONVERT(DATE, GETDATE())
    GROUP BY
        a.fkServidor
) PrioridadeAlerta ON s.ipServidor = PrioridadeAlerta.fkServidor;

        `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT
        SUM(CASE WHEN s.ativo = 1 THEN 1 ELSE 0 END) AS Ativos,
        SUM(CASE WHEN PrioridadeAlerta.Prioridade = 3 AND s.ativo = 1 THEN 1 ELSE 0 END) AS EmRisco
    FROM
        Servidor s
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
    ) PrioridadeAlerta ON s.ipServidor = PrioridadeAlerta.fkServidor;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function deletarServidor(tipo, id) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        if (tipo == 'DC') {
            var instrucao = `
            delete from Servidor where fkDataCenter = '${id}';
            `;
        } else if (tipo == 'Server') {
            var instrucao = `
            delete from Servidor where ipServidor = '${id}';
            `;
        }
        else {
            var instrucao = `
        delete from Servidor where fkEmpresa = '${id}';
        `;
        }
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (tipo == 'DC') {
            var instrucao = `
            delete from servidor where fkDataCenter = '${id}';
            `;
        } else if (tipo == 'Server') {
            var instrucao = `
            delete from servidor where ipServidor = '${id}';
            `;
        }
        else {
            var instrucao = `
        delete from servidor where fkEmpresa = '${id}';
        `;
        }
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function exibirDadosGerais(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT
        s.hostname,
        s.sisOp,
        s.ativo,
        (
            SELECT TOP 1 l.emUso
            FROM Leitura AS l
            INNER JOIN Componente AS c ON l.fkComponente = c.idComponente
            INNER JOIN Servidor AS s ON c.fkServidor = s.ipServidor
            WHERE c.tipo = 'CPU' AND s.ipServidor = '${ipServidor}'
            ORDER BY l.dataLeitura DESC
        ) AS usoCpu,
        (
            SELECT TOP 1 ROUND(((l.emUso / c.capacidadeTotal) * 100), 2)
            FROM Leitura AS l
            INNER JOIN Componente AS c ON c.idComponente = l.fkComponente
            INNER JOIN Servidor AS s ON s.ipServidor = c.fkServidor
            WHERE c.tipo = 'RAM' AND ipServidor = '${ipServidor}'
            ORDER BY l.dataLeitura DESC
        ) AS usoRam,
        (
            SELECT TOP 1 CONCAT(l.velocidadeEscrita, 'MB/s')
            FROM Leitura AS l
            INNER JOIN Componente AS c ON l.fkComponente = c.idComponente
            INNER JOIN Servidor AS s ON c.fkServidor = s.ipServidor
            WHERE c.tipo = 'Disco' AND s.ipServidor = '${ipServidor}'
            ORDER BY l.dataLeitura DESC
        ) AS velocidadeEscrita,
        (
            SELECT TOP 1 CONCAT(l.upload, uni.tipoMedida)
            FROM Leitura AS l
            INNER JOIN Componente AS c ON l.fkComponente = c.idComponente
            INNER JOIN Servidor AS s ON c.fkServidor = s.ipServidor
            INNER JOIN unidadeMedida AS uni ON uni.idUnidadeMedida = c.fkMedida
            WHERE c.tipo = 'Rede' AND s.ipServidor = '${ipServidor}'
            GROUP BY uni.tipoMedida
            ORDER BY l.dataLeitura DESC
        ) AS uploadRede,
        (
            SELECT TOP 1 l.emUso
            FROM Leitura AS l
            INNER JOIN Componente AS c ON l.fkComponente = c.idComponente
            INNER JOIN Servidor AS s ON c.fkServidor = s.ipServidor
            WHERE c.tipo = 'GPU' AND s.ipServidor = '${ipServidor}'
            ORDER BY l.dataLeitura DESC
        ) AS usoGpu
    FROM
        Servidor AS s
    LEFT JOIN
        Componente AS c ON c.fkServidor = s.ipServidor
    LEFT JOIN
        Leitura AS l ON l.fkComponente = c.idComponente
    WHERE
        s.ipServidor = '${ipServidor}'
    GROUP BY
        s.hostname, s.sisOp, s.ativo;
    
    `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
    SELECT s.hostname, s.sisOp, s.ativo, 
    (SELECT l.emUso FROM Leitura as l INNER JOIN Componente as c ON l.fkComponente = c.idComponente 
    INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE c.tipo = 'CPU' AND s.ipServidor = '${ipServidor}' 
    ORDER BY l.dataLeitura DESC LIMIT 1) as usoCpu, 
    
    (SELECT ROUND(((SELECT l.emUso FROM Leitura as l INNER JOIN Componente as c ON c.idComponente = l.fkComponente 
    INNER JOIN Servidor as s ON s.ipServidor = c.fkServidor WHERE c.tipo = 'RAM' AND ipServidor = '${ipServidor}' 
    ORDER BY l.dataLeitura DESC LIMIT 1) / 
        (SELECT c.capacidadeTotal FROM Componente as c INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE ipServidor = '${ipServidor}' AND c.tipo = 'RAM') * 100),2)) as usoRam, 
    
    (SELECT CONCAT((SELECT l.velocidadeEscrita FROM Leitura as l INNER JOIN Componente as c ON l.fkComponente = c.idComponente 
    INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE c.tipo = 'Disco' AND s.ipServidor = '${ipServidor}' 
    ORDER BY l.dataLeitura DESC LIMIT 1), ('MB/s'))) as velocidadeEscrita, 
    
    (SELECT CONCAT((SELECT l.upload FROM Leitura as l INNER JOIN Componente as c ON l.fkComponente = c.idComponente 
    INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE c.tipo = 'Rede' AND s.ipServidor = '${ipServidor}' 
    ORDER BY l.dataLeitura DESC LIMIT 1), (SELECT uni.tipoMedida FROM unidadeMedida as uni INNER JOIN 
    Componente as c ON c.fkMedida = uni.idUnidadeMedida INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE c.tipo = 'REDE' GROUP BY uni.tipoMedida))) as uploadRede, 
    
    (SELECT l.emUso FROM Leitura as l INNER JOIN Componente as c ON l.fkComponente = c.idComponente 
    INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE c.tipo = 'GPU' AND s.ipServidor = '${ipServidor}' 
    ORDER BY l.dataLeitura DESC LIMIT 1) as usoGpu 
    
    FROM Servidor as s LEFT JOIN Componente as c ON c.fkServidor = s.ipServidor 
    LEFT JOIN Leitura as l ON l.fkComponente = c.idComponente WHERE s.ipServidor = '${ipServidor}' GROUP BY s.hostname, s.sisOp, s.ativo;
    `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function exibirServidoresPerDCenter(idDataCenter) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT * FROM Servidor as s WHERE fkDataCenter = ${idDataCenter};
    `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT * FROM Servidor as s WHERE fkDataCenter = ${idDataCenter};
    `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function exibirStatusServidoresPerDCenter(idDataCenter) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT 
    (
        SELECT COUNT(idAlerta) 
        FROM Alerta AS a 
        INNER JOIN DataCenter AS dt ON a.fkDataCenter = dt.idDataCenter 
        WHERE dt.idDataCenter = ${idDataCenter}
    ) AS qtdTotalAlertas,
    (
        SELECT COUNT(tipo) 
        FROM Alerta AS a 
        INNER JOIN DataCenter AS dt ON a.fkDataCenter = dt.idDataCenter 
        WHERE dt.idDataCenter = ${idDataCenter} AND tipo = 'Estável'
    ) AS qtdAlertasEstavel,
    (
        SELECT COUNT(tipo) 
        FROM Alerta AS a 
        INNER JOIN DataCenter AS dt ON a.fkDataCenter = dt.idDataCenter 
        WHERE dt.idDataCenter = ${idDataCenter} AND tipo = 'Cuidado'
    ) AS qtdAlertasCuidado,
    (
        SELECT COUNT(tipo) 
        FROM Alerta AS a 
        INNER JOIN DataCenter AS dt ON a.fkDataCenter = dt.idDataCenter 
        WHERE dt.idDataCenter = ${idDataCenter} AND tipo = 'Em risco'
    ) AS qtdAlertasRisco;
        `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT 
            (select count(idAlerta) from Alerta as a INNER JOIN DataCenter as dt ON a.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter}) as qtdTotalAlertas,
            (select count(tipo) from Alerta as a INNER JOIN DataCenter as dt ON a.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter} AND tipo = 'Estável') AS qtdAlertasEstavel, 
            (select count(tipo) from Alerta as a INNER JOIN DataCenter as dt ON a.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter} AND tipo = 'Cuidado') AS qtdAlertasCuidado, 
            (select count(tipo) from Alerta as a INNER JOIN DataCenter as dt ON a.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter} AND tipo = 'Em risco') AS qtdAlertasRisco 
        FROM Alerta as a INNER JOIN DataCenter as dt ON a.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter}  GROUP BY qtdAlertasEstavel, qtdAlertasCuidado, qtdAlertasRisco;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function buscarQtdAtivosDesativadosPerEmpresa(idEmpresa) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT
    SUM(CASE WHEN s.ativo = 1 THEN 1 ELSE 0 END) AS Ativos,
    SUM(CASE WHEN PrioridadeAlerta.Prioridade = 3 AND s.ativo = 1 THEN 1 ELSE 0 END) AS EmRisco
FROM
    Servidor s
LEFT JOIN (
    SELECT
        a.fkServidor,
        MAX(CASE WHEN a.tipo = 'Em risco' THEN 3 WHEN a.tipo = 'Cuidado' THEN 2 WHEN a.tipo = 'Estável' THEN 1 ELSE 0 END) AS Prioridade
    FROM
        alerta a
    JOIN Componente c ON a.fkComponente = c.idComponente
    JOIN Servidor s ON c.fkServidor = s.ipServidor
    WHERE
        CONVERT(date, a.dataAlerta) = CONVERT(date, GETDATE())
    GROUP BY
        a.fkServidor
) PrioridadeAlerta ON s.ipServidor = PrioridadeAlerta.fkServidor
WHERE
    s.fkEmpresa = ${idEmpresa};     
        `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT
        SUM(CASE WHEN s.ativo = 1 THEN 1 ELSE 0 END) AS Ativos,
        SUM(CASE WHEN PrioridadeAlerta.Prioridade = 3 AND s.ativo = 1 THEN 1 ELSE 0 END) AS EmRisco
    FROM
        Servidor s
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
        s.fkEmpresa = ${idEmpresa};     
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function exibirDadosKpiServidor(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT
        (SELECT TOP 1
            c.capacidadeTotal AS CapacidadeRam
        FROM
            Leitura l
            JOIN Componente c ON l.fkComponente = c.idComponente
        WHERE
            c.tipo = 'RAM'
            AND c.fkServidor = '${ipServidor}'
        GROUP BY
            c.capacidadeTotal
        ) AS capacidadeRam,
    
        (SELECT TOP 1
            l.emUso AS UsoCPU
        FROM
            Leitura l
            JOIN Componente c ON l.fkComponente = c.idComponente
        WHERE
            c.tipo = 'CPU'
            AND c.fkServidor = '${ipServidor}'
            AND l.dataLeitura >= DATEADD(HOUR, -48, GETDATE())
        GROUP BY
            l.emUso
        ORDER BY
            COUNT(*) DESC
        ) AS UsoCPU,
    
        (SELECT TOP 1
            l.emUso AS UsoRAM
        FROM
            Leitura l
            JOIN Componente c ON l.fkComponente = c.idComponente
        WHERE
            c.tipo = 'RAM'
            AND c.fkServidor = '${ipServidor}'
            AND l.dataLeitura >= DATEADD(HOUR, -48, GETDATE())
        GROUP BY
            l.emUso
        ORDER BY
            COUNT(*) DESC
        ) AS UsoRAM,
    
        (SELECT TOP 1
            l.velocidadeEscrita
        FROM
            Leitura l
            JOIN Componente c ON l.fkComponente = c.idComponente
        WHERE
            c.tipo = 'DISCO'
            AND c.fkServidor = '${ipServidor}'
        ORDER BY
            l.dataLeitura DESC
        ) AS velocidadeEscrita,
    
        (SELECT TOP 1
            l.upload
        FROM
            Leitura l
            JOIN Componente c ON l.fkComponente = c.idComponente
        WHERE
            c.tipo = 'Rede'
            AND c.fkServidor = '${ipServidor}'
        ORDER BY
            l.dataLeitura DESC
        ) AS uploadAtual;
    `;
        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
    SELECT
    (SELECT
        c.capacidadeTotal AS CapacidadeRam
    FROM
        Leitura l
        JOIN Componente c ON l.fkComponente = c.idComponente
    WHERE
        c.tipo = 'RAM'
        AND c.fkServidor = '${ipServidor}'
    GROUP BY
        CapacidadeRam
    ) as capacidadeRam,
    (SELECT
        l.emUso AS UsoCPU
    FROM
        Leitura l
        JOIN Componente c ON l.fkComponente = c.idComponente
    WHERE
        c.tipo = 'CPU'
        AND c.fkServidor = '${ipServidor}'
        AND l.dataLeitura >= NOW() - INTERVAL 48 HOUR
    GROUP BY
        l.emUso
    ORDER BY
        COUNT(*) DESC
    LIMIT 1) AS UsoCPU,

    (SELECT
        l.emUso AS UsoRAM
    FROM
        Leitura l
        JOIN Componente c ON l.fkComponente = c.idComponente
    WHERE
        c.tipo = 'RAM'
        AND c.fkServidor = '${ipServidor}'
        AND l.dataLeitura >= NOW() - INTERVAL 48 HOUR
    GROUP BY
        l.emUso
    ORDER BY
        COUNT(*) DESC
    LIMIT 1) AS UsoRAM,

    (SELECT
        l.velocidadeEscrita
    FROM
        Leitura l
        JOIN Componente c ON l.fkComponente = c.idComponente
    WHERE
        c.tipo = 'DISCO'
        AND c.fkServidor = '${ipServidor}'
    ORDER BY
        l.dataLeitura DESC
    LIMIT 1) AS velocidadeEscrita,

    (SELECT
        l.upload
    FROM
        Leitura l
        JOIN Componente c ON l.fkComponente = c.idComponente
    WHERE
        c.tipo = 'Rede'
        AND c.fkServidor = '${ipServidor}'
    ORDER BY
        l.dataLeitura DESC
    LIMIT 1) AS uploadAtual;

    `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo,
    cadastrar,
    editar,
    selecionarDadosGerais,
    buscarQtdAtivosDesativados,
    deletarServidor,
    exibirDadosGerais,
    exibirServidoresPerDCenter,
    exibirStatusServidoresPerDCenter,
    buscarQtdAtivosDesativadosPerEmpresa,
    selecionarTudoPerEmpresa,
    exibirDadosKpiServidor
};