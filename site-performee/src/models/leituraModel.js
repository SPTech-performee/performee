var database = require("../database/config")

function selecionarTudo() {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
            SELECT * FROM Leitura;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT * FROM Leitura;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function deletarLeitura(tipo, id) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        if (tipo == 'DC') {
            var instrucao = `
                delete from Leitura where fkDataCenter = '${id}';
            `;
        } else if (tipo == 'Server') {
            var instrucao = `
                delete from Leitura where fkServidor = '${id}';
            `;
        }
        else {
            var instrucao = `
                delete from Leitura where fkEmpresa = '${id}';
            `;
        }
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (tipo == 'DC') {
            var instrucao = `
                delete from Leitura where fkDataCenter = '${id}';
            `;
        } else if (tipo == 'Server') {
            var instrucao = `
                delete from Leitura where fkServidor = '${id}';
            `;
        }
        else {
            var instrucao = `
                delete from Leitura where fkEmpresa = '${id}';
            `;
        }
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function ultimasLeiturasCpu(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT TOP 7
    l.*, c.capacidadeTotal
FROM
    Leitura l
    INNER JOIN Componente c ON l.fkComponente = c.idComponente
    INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
WHERE
    s.ipServidor = '${ipServidor}'
    AND c.tipo = 'CPU'
ORDER BY
    l.dataLeitura DESC;
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT
            l.*, c.capacidadeTotal
            FROM
                Leitura l
                INNER JOIN Componente c ON l.fkComponente = c.idComponente
                INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
            WHERE
                s.ipServidor = '${ipServidor}'
                AND c.tipo = 'CPU'
            ORDER BY
                l.dataLeitura DESC
            LIMIT 7;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function leituraMaisRecenteCpu(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT TOP 1
        l.*, c.capacidadeTotal
    FROM
        Leitura l
        INNER JOIN Componente c ON l.fkComponente = c.idComponente
        INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
    WHERE
        s.ipServidor = '${ipServidor}'
        AND c.tipo = 'CPU'
    ORDER BY
        l.dataLeitura DESC;    
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT
            l.*, c.capacidadeTotal
            FROM
                Leitura l
                INNER JOIN Componente c ON l.fkComponente = c.idComponente
                INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
            WHERE
                s.ipServidor = '${ipServidor}'
                AND c.tipo = 'CPU'
            ORDER BY
                l.dataLeitura DESC
            LIMIT 1;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function ultimasLeiturasGpu(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT TOP 7
        l.*, c.capacidadeTotal
    FROM
        Leitura l
        INNER JOIN Componente c ON l.fkComponente = c.idComponente
        INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
    WHERE
        s.ipServidor = '${ipServidor}'
        AND c.tipo = 'GPU'
    ORDER BY
        l.dataLeitura DESC;    
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT
            l.*, c.capacidadeTotal
            FROM
                Leitura l
                INNER JOIN Componente c ON l.fkComponente = c.idComponente
                INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
            WHERE
                s.ipServidor = '${ipServidor}'
                AND c.tipo = 'GPU'
            ORDER BY
                l.dataLeitura DESC
            LIMIT 7;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function leituraMaisRecenteGpu(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT TOP 1
        l.*, c.capacidadeTotal
    FROM
        Leitura l
        INNER JOIN Componente c ON l.fkComponente = c.idComponente
        INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
    WHERE
        s.ipServidor = '${ipServidor}'
        AND c.tipo = 'GPU'
    ORDER BY
        l.dataLeitura DESC;    
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT
            l.*, c.capacidadeTotal
            FROM
                Leitura l
                INNER JOIN Componente c ON l.fkComponente = c.idComponente
                INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
            WHERE
                s.ipServidor = '${ipServidor}'
                AND c.tipo = 'GPU'
            ORDER BY
                l.dataLeitura DESC
            LIMIT 1;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function ultimasLeiturasRam(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT TOP 7
        l.*, c.capacidadeTotal
    FROM
        Leitura l
        INNER JOIN Componente c ON l.fkComponente = c.idComponente
        INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
    WHERE
        s.ipServidor = '${ipServidor}'
        AND c.tipo = 'RAM'
    ORDER BY
        l.dataLeitura DESC;    
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT
            l.*, c.capacidadeTotal
            FROM
                Leitura l
                INNER JOIN Componente c ON l.fkComponente = c.idComponente
                INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
            WHERE
                s.ipServidor = '${ipServidor}'
                AND c.tipo = 'RAM'
            ORDER BY
                l.dataLeitura DESC
            LIMIT 7;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function leituraMaisRecenteRam(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT TOP 1
        l.*, c.capacidadeTotal
    FROM
        Leitura l
        INNER JOIN Componente c ON l.fkComponente = c.idComponente
        INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
    WHERE
        s.ipServidor = '${ipServidor}'
        AND c.tipo = 'RAM'
    ORDER BY
        l.dataLeitura DESC;    
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT
            l.*, c.capacidadeTotal
            FROM
                Leitura l
                INNER JOIN Componente c ON l.fkComponente = c.idComponente
                INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
            WHERE
                s.ipServidor = '${ipServidor}'
                AND c.tipo = 'RAM'
            ORDER BY
                l.dataLeitura DESC
            LIMIT 1;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function leituraUsoRamPerHora(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT
    MAX(l.dataLeitura) AS ultimaLeitura,
    MAX(l.emUso) AS usoRam,
    MAX(c.capacidadeTotal) AS capacidadeTotal
FROM
    Leitura l
JOIN
    Componente c ON l.fkComponente = c.idComponente
JOIN
    Servidor s ON l.fkServidor = s.ipServidor
WHERE
    s.ipServidor = '${ipServidor}'
    AND c.tipo = 'RAM'
    AND l.dataLeitura >= DATEADD(HOUR, -5, GETDATE())
GROUP BY
    YEAR(l.dataLeitura),
    MONTH(l.dataLeitura),
    DAY(l.dataLeitura),
    DATEPART(HOUR, l.dataLeitura)
ORDER BY
    ultimaLeitura DESC;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT
        MAX(l.dataLeitura) AS ultimaLeitura,
        MAX(l.emUso) AS usoRam,
        MAX(c.capacidadeTotal) AS capacidadeTotal
    FROM
        leitura l
    JOIN Componente c ON l.fkComponente = c.idComponente
    JOIN Servidor s ON l.fkServidor = s.ipServidor
    WHERE
        s.ipServidor = '${ipServidor}'
        AND c.tipo = 'RAM'
        AND l.dataLeitura >= NOW() - INTERVAL 5 HOUR
    GROUP BY
        YEAR(l.dataLeitura),
        MONTH(l.dataLeitura),
        DAY(l.dataLeitura),
        HOUR(l.dataLeitura)
    ORDER BY
        ultimaLeitura DESC;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function ultimasLeiturasDisco(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT TOP 7
        l.*,
        c.capacidadeTotal
    FROM
        Leitura l
    INNER JOIN
        Componente c ON l.fkComponente = c.idComponente
    INNER JOIN
        Servidor s ON c.fkServidor = s.ipServidor
    WHERE
        s.ipServidor = '${ipServidor}'
        AND c.tipo = 'Disco'
    ORDER BY
        l.dataLeitura DESC;    
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT
            l.*, c.capacidadeTotal
            FROM
                Leitura l
                INNER JOIN Componente c ON l.fkComponente = c.idComponente
                INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
            WHERE
                s.ipServidor = '${ipServidor}'
                AND c.tipo = 'Disco'
            ORDER BY
                l.dataLeitura DESC
            LIMIT 7;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function leituraMaisRecenteDisco(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT TOP 1
        l.*,
        c.capacidadeTotal
    FROM
        Leitura l
    INNER JOIN
        Componente c ON l.fkComponente = c.idComponente
    INNER JOIN
        Servidor s ON c.fkServidor = s.ipServidor
    WHERE
        s.ipServidor = '${ipServidor}'
        AND c.tipo = 'Disco'
    ORDER BY
        l.dataLeitura DESC;    
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT
            l.*, c.capacidadeTotal
            FROM
                Leitura l
                INNER JOIN Componente c ON l.fkComponente = c.idComponente
                INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
            WHERE
                s.ipServidor = '${ipServidor}'
                AND c.tipo = 'Disco'
            ORDER BY
                l.dataLeitura DESC
            LIMIT 1;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function ultimasLeiturasRede(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT TOP 7
    l.*,
    c.capacidadeTotal
FROM
    Leitura l
INNER JOIN
    Componente c ON l.fkComponente = c.idComponente
INNER JOIN
    Servidor s ON c.fkServidor = s.ipServidor
WHERE
    s.ipServidor = '${ipServidor}'
    AND c.tipo = 'Rede'
ORDER BY
    l.dataLeitura DESC;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT
        l.*, c.capacidadeTotal
        FROM
            Leitura l
            INNER JOIN Componente c ON l.fkComponente = c.idComponente
            INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
        WHERE
            s.ipServidor = '${ipServidor}'
            AND c.tipo = 'Rede'
        ORDER BY
            l.dataLeitura DESC
        LIMIT 7;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }

    return database.executar(instrucao);
}

function leituraMaisRecenteRede(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT TOP 1
    l.*,
    c.capacidadeTotal
FROM
    Leitura l
INNER JOIN
    Componente c ON l.fkComponente = c.idComponente
INNER JOIN
    Servidor s ON c.fkServidor = s.ipServidor
WHERE
    s.ipServidor = '${ipServidor}'
    AND c.tipo = 'Rede'
ORDER BY
    l.dataLeitura DESC;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT
        l.*, c.capacidadeTotal
        FROM
            Leitura l
            INNER JOIN Componente c ON l.fkComponente = c.idComponente
            INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
        WHERE
            s.ipServidor = '${ipServidor}'
            AND c.tipo = 'Rede'
        ORDER BY
            l.dataLeitura DESC
        LIMIT 1;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function leituraComparacaoUpDownPerDia(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT
    DATEADD(DAY, -0, CAST(GETDATE() AS DATE)) AS [DataAtual],
    COALESCE(ROUND(AVG(upload), 2), 0.00) AS [MediaUpload],
    COALESCE(ROUND(AVG(download), 2), 0.00) AS [MediaDownload]
FROM
    Leitura L
    INNER JOIN Componente C ON L.fkComponente = C.idComponente
    INNER JOIN Servidor S ON L.fkServidor = S.ipServidor
WHERE
    S.ipServidor = '${ipServidor}'
    AND C.tipo = 'Rede'
    AND CONVERT(DATE, L.dataLeitura) = CAST(GETDATE() AS DATE)

UNION ALL

SELECT
    DATEADD(DAY, -1, CAST(GETDATE() AS DATE)) AS [DataAnterior1],
    COALESCE(ROUND(AVG(upload), 2), 0.00) AS [MediaUpload],
    COALESCE(ROUND(AVG(download), 2), 0.00) AS [MediaDownload]
FROM
    Leitura L
    INNER JOIN Componente C ON L.fkComponente = C.idComponente
    INNER JOIN Servidor S ON L.fkServidor = S.ipServidor
WHERE
    S.ipServidor = '${ipServidor}'
    AND C.tipo = 'Rede'
    AND CONVERT(DATE, L.dataLeitura) = CAST(GETDATE() - 1 AS DATE)

UNION ALL

SELECT
    DATEADD(DAY, -2, CAST(GETDATE() AS DATE)) AS [DataAnterior1],
    COALESCE(ROUND(AVG(upload), 2), 0.00) AS [MediaUpload],
    COALESCE(ROUND(AVG(download), 2), 0.00) AS [MediaDownload]
FROM
    Leitura L
    INNER JOIN Componente C ON L.fkComponente = C.idComponente
    INNER JOIN Servidor S ON L.fkServidor = S.ipServidor
WHERE
    S.ipServidor = '${ipServidor}'
    AND C.tipo = 'Rede'
    AND CONVERT(DATE, L.dataLeitura) = CAST(GETDATE() - 2 AS DATE)

UNION ALL

SELECT
    DATEADD(DAY, -3, CAST(GETDATE() AS DATE)) AS [DataAnterior1],
    COALESCE(ROUND(AVG(upload), 2), 0.00) AS [MediaUpload],
    COALESCE(ROUND(AVG(download), 2), 0.00) AS [MediaDownload]
FROM
    Leitura L
    INNER JOIN Componente C ON L.fkComponente = C.idComponente
    INNER JOIN Servidor S ON L.fkServidor = S.ipServidor
WHERE
    S.ipServidor = '${ipServidor}'
    AND C.tipo = 'Rede'
    AND CONVERT(DATE, L.dataLeitura) = CAST(GETDATE() - 3 AS DATE)

UNION ALL

SELECT
    DATEADD(DAY, -4, CAST(GETDATE() AS DATE)) AS [DataAnterior1],
    COALESCE(ROUND(AVG(upload), 2), 0.00) AS [MediaUpload],
    COALESCE(ROUND(AVG(download), 2), 0.00) AS [MediaDownload]
FROM
    Leitura L
    INNER JOIN Componente C ON L.fkComponente = C.idComponente
    INNER JOIN Servidor S ON L.fkServidor = S.ipServidor
WHERE
    S.ipServidor = '${ipServidor}'
    AND C.tipo = 'Rede'
    AND CONVERT(DATE, L.dataLeitura) = CAST(GETDATE() - 4 AS DATE)

UNION ALL

SELECT
    DATEADD(DAY, -5, CAST(GETDATE() AS DATE)) AS [DataAnterior1],
    COALESCE(ROUND(AVG(upload), 2), 0.00) AS [MediaUpload],
    COALESCE(ROUND(AVG(download), 2), 0.00) AS [MediaDownload]
FROM
    Leitura L
    INNER JOIN Componente C ON L.fkComponente = C.idComponente
    INNER JOIN Servidor S ON L.fkServidor = S.ipServidor
WHERE
    S.ipServidor = '${ipServidor}'
    AND C.tipo = 'Rede'
    AND CONVERT(DATE, L.dataLeitura) = CAST(GETDATE() - 5 AS DATE)

ORDER BY [DataAtual];    
            `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT
        DATE_SUB(CURDATE(), INTERVAL 0 DAY) AS DataAtual,
        COALESCE(ROUND(AVG(upload), 2), 0.00) AS MediaUpload,
        COALESCE(ROUND(AVG(download), 2), 0.00) AS MediaDownload
    FROM
        Leitura L
        INNER JOIN Componente C ON L.fkComponente = C.idComponente
        INNER JOIN Servidor S ON L.fkServidor = S.ipServidor
    WHERE
        S.ipServidor = '${ipServidor}'
        AND C.tipo = 'Rede'
        AND DATE(L.dataLeitura) = CURDATE()
    
    UNION ALL
    
    SELECT
        DATE_SUB(CURDATE(), INTERVAL 1 DAY) AS DataAnterior1,
        COALESCE(ROUND(AVG(upload), 2), 0.00) AS MediaUpload,
        COALESCE(ROUND(AVG(download), 2), 0.00) AS MediaDownload
    FROM
        Leitura L
        INNER JOIN Componente C ON L.fkComponente = C.idComponente
        INNER JOIN Servidor S ON L.fkServidor = S.ipServidor
    WHERE
        S.ipServidor = '${ipServidor}'
        AND C.tipo = 'Rede'
        AND DATE(L.dataLeitura) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
    
    UNION ALL
    
    SELECT
        DATE_SUB(CURDATE(), INTERVAL 2 DAY) AS DataAnterior2,
        COALESCE(ROUND(AVG(upload), 2), 0.00) AS MediaUpload,
        COALESCE(ROUND(AVG(download), 2), 0.00) AS MediaDownload
    FROM
        Leitura L
        INNER JOIN Componente C ON L.fkComponente = C.idComponente
        INNER JOIN Servidor S ON L.fkServidor = S.ipServidor
    WHERE
        S.ipServidor = '${ipServidor}'
        AND C.tipo = 'Rede'
        AND DATE(L.dataLeitura) = DATE_SUB(CURDATE(), INTERVAL 2 DAY)
    
    UNION ALL
    
    SELECT
        DATE_SUB(CURDATE(), INTERVAL 3 DAY) AS DataAnterior3,
        COALESCE(ROUND(AVG(upload), 2), 0.00) AS MediaUpload,
        COALESCE(ROUND(AVG(download), 2), 0.00) AS MediaDownload
    FROM
        Leitura L
        INNER JOIN Componente C ON L.fkComponente = C.idComponente
        INNER JOIN Servidor S ON L.fkServidor = S.ipServidor
    WHERE
        S.ipServidor = '${ipServidor}'
        AND C.tipo = 'Rede'
        AND DATE(L.dataLeitura) = DATE_SUB(CURDATE(), INTERVAL 3 DAY)
    
    UNION ALL
    
    SELECT
        DATE_SUB(CURDATE(), INTERVAL 4 DAY) AS DataAnterior4,
        COALESCE(ROUND(AVG(upload), 2), 0.00) AS MediaUpload,
        COALESCE(ROUND(AVG(download), 2), 0.00) AS MediaDownload
    FROM
        Leitura L
        INNER JOIN Componente C ON L.fkComponente = C.idComponente
        INNER JOIN Servidor S ON L.fkServidor = S.ipServidor
    WHERE
        S.ipServidor = '${ipServidor}'
        AND C.tipo = 'Rede'
        AND DATE(L.dataLeitura) = DATE_SUB(CURDATE(), INTERVAL 4 DAY)
    
    UNION ALL
    
    SELECT
        DATE_SUB(CURDATE(), INTERVAL 5 DAY) AS DataAnterior5,
        COALESCE(ROUND(AVG(upload), 2), 0.00) AS MediaUpload,
        COALESCE(ROUND(AVG(download), 2), 0.00) AS MediaDownload
    FROM
        Leitura L
        INNER JOIN Componente C ON L.fkComponente = C.idComponente
        INNER JOIN Servidor S ON L.fkServidor = S.ipServidor
    WHERE
        S.ipServidor = '${ipServidor}'
        AND C.tipo = 'Rede'
        AND DATE(L.dataLeitura) = DATE_SUB(CURDATE(), INTERVAL 5 DAY)
    
    ORDER BY DataAtual;
    
            `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo,
    deletarLeitura,

    ultimasLeiturasCpu,
    leituraMaisRecenteCpu,

    ultimasLeiturasGpu,
    leituraMaisRecenteGpu,

    ultimasLeiturasRam,
    leituraMaisRecenteRam,
    leituraUsoRamPerHora,

    ultimasLeiturasDisco,
    leituraMaisRecenteDisco,

    ultimasLeiturasRede,
    leituraMaisRecenteRede,
    leituraComparacaoUpDownPerDia
};